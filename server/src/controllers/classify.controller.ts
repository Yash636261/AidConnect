import { Request, Response } from 'express';
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

interface Post {
  text: string;
  source: string; // To identify the platform
  [key: string]: any;
}

// Function to classify posts using OpenAI in batch
const classifyPostsWithOpenAI = async (posts: Post[]): Promise<string[]> => {
  try {
    const prompt = posts
      .map(
        (post, index) =>
          `Post ${index + 1}: ${post.text}\nClassify as "need" or "availability".`
      )
      .join('\n\n');

    const { text } = await generateText({
      model: openai('gpt-3.5-turbo'),
      messages: [
        {
          role: 'system',
          content:
            'You are a disaster response assistant. Your task is to classify posts as either need or availability. Need indicates requests for assistance, while availability indicates offers of resources or help. Provide classifications in the format: "Post 1: need", "Post 2: availability", etc.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.2,
    });

    const classifications = text
      .trim()
      .split('\n')
      .map((line) => {
        const match = line.match(/Post \d+: (need|availability)/i);
        return match ? match[1].toLowerCase() : 'unclassified';
      });

    return classifications;
  } catch (error) {
    console.error('Error classifying posts with OpenAI:', error);
    return posts.map(() => 'unclassified');
  }
};

// Express handler for classifying posts
export const classifyPostsHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { data } = req.body;
    console.log("classification",data);
    const {savedCases}=data;

    if (!Array.isArray(savedCases)) {
        res.status(400).json({
          error: 'Invalid input. Expected an array of posts under the "data" field.',
        });
        return;
      }

        // Validate that each item in the array has text and source
    if (!savedCases.every((post) => typeof post.text === 'string' && typeof post.source === 'string')) {
        res.status(400).json({
          error: 'Each post must have "text" (string) and "source" (string) fields.',
        });
        return;
      }
  
   

    // Classify posts in batch
    const classifications = await classifyPostsWithOpenAI(savedCases);

    const updatedPosts = savedCases.map((post: Post, index: number) => ({
        ...post,
        type: classifications[index] || 'need', // Add the `type` field
      }));
  

    // Respond with the updated posts
    res.json(updatedPosts);
  } catch (error) {
    console.error('Error classifying data:', error);
    res.status(500).json({ error: 'An error occurred while classifying the data.' });
  }
};



interface ClassifiedPost {
  id: string;
  text: string;
  location?: string;
  type: string;
  needs: string[];
  sentiment: string;
  [key: string]: any;
}

export const generateInsights = async (req: Request, res: Response): Promise<void> => {
    try {
      const classifiedData: ClassifiedPost[] = req.body.classifiedData;
  
      if (!classifiedData || !Array.isArray(classifiedData) || classifiedData.length === 0) {
        res.status(400).json({ error: 'Invalid input. Expected an array of classified data.' });
        return;
      }
  
      // Create a batch prompt with all posts in a structured format
      const prompt = `
        You are a disaster relief analyst. Analyze the following posts and provide a concise, actionable insight for each post.
  
        Posts:
        ${classifiedData
          .map(
            (post, index) => `
            ${index + 1}.
            PostId: ${post._id}
            Text: "${post.text}"
            Location: ${post.location || 'Unknown'}
            Type: ${post.type}
            Needs: ${post.needs.length > 0 ? post.needs.join(', ') : 'None'}
            Sentiment: ${post.sentiment}
          `
          )
          .join('\n')}
  
        Please return your insights in the following JSON format:
        [
          {
            "postId": "<_id>",
            "insight": "<your insight>"
          },
          ...
        ]
      `;
  
      // Call the LLM with the batch prompt
      const { text: llmResponse } = await generateText({
        model: openai('gpt-3.5-turbo'),
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      });
  
      // Parse the structured JSON response directly
      let insights;
      try {
        console.log("llmResponse",llmResponse,typeof llmResponse);
        console.log(JSON.parse(llmResponse));
        insights = JSON.parse(llmResponse);
      } catch (error) {
        console.error('Error parsing structured insights:', error);
        res.status(500).json({ error: 'Failed to parse insights response from the model.' });
        return;
      }
  
      // Validate the structured insights
      if (!Array.isArray(insights)) {
        res.status(500).json({ error: 'Invalid insights format returned from OpenAI.' });
        return;
      }
  
      // Map the insights to the classified data using _id as identifier
      const insightsData = classifiedData.map((post) => {
        const insight = insights.find((i) => i.postId === String(post._id));
        return {
          ...post,
          llm_insight: insight ? insight.insight : 'No insight generated.',
        };
      });
  
      res.status(200).json({
        message: 'LLM insights generated successfully.',
        insightsData,
      });
    } catch (error) {
      console.error('Error generating insights:', error);
      res.status(500).json({ error: 'An error occurred while generating insights.' });
    }
  };
  