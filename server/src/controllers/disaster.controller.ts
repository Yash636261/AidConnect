import { Request, Response } from 'express';
import DisasterCase from '../models/DisasterCase.model';

export const getDisasterData = async (req: Request, res: Response): Promise<void> => {
    try {
        const DisasterCases = await DisasterCase.find({});
        res.status(200).json({ success: true, data: DisasterCases });
    } catch (error: any) {
        res.status(500).json({ success: false, message: 'Failed to fetch disaster data', error: error.message });
    }
}
// Helper function to determine urgency level
function determineUrgencyLevel(text: string): 'Low' | 'Moderate' | 'High' {
  const lowKeywords = ['update', 'information', 'advisory'];
  const highKeywords = ['emergency', 'urgent', 'immediate', 'critical'];

  const lowMatch = lowKeywords.some(keyword => text.toLowerCase().includes(keyword));
  const highMatch = highKeywords.some(keyword => text.toLowerCase().includes(keyword));

  if (highMatch) return 'High';
  if (lowMatch) return 'Low';
  return 'Moderate';
}

// Helper function to extract needs from text
function extractNeeds(text: string): string[] {
  const needKeywords = ['food', 'water', 'shelter', 'medical', 'rescue', 'evacuation'];
  return needKeywords.filter(need => text.toLowerCase().includes(need));
}
function generateUniquePostId(source: string, originalId: string): string {
    const timestamp = Date.now();
    return `${source}-${originalId}-${timestamp}`;
  }
interface IDisasterCase  {
    source: 'twitter' | 'facebook' | 'instagram';
    postId: string;
    userId: number;
    username: string;
    text: string;
    location: string;
    coordinates: [number, number];
    timestamp: Date;
    urgencyLevel: 'Low' | 'Moderate' | 'High';
    needs: string[];
    sentiment: string;
    hashtags: string[];
    verified: boolean;
    type: 'need' | 'availability';
    llm_insight: string;
  }
// Transform Twitter data
async function transformTwitterData(tweet: any): Promise<Partial<IDisasterCase>> {
    console.log("tweet Processing",tweet);
  // Helper function to parse coordinates
  const parseCoordinates = (geolocation: string): [number, number] => {
    if (!geolocation) return [0, 0];
    const coords = geolocation.split(',').map(Number);
    return coords.length === 2 && !coords.some(isNaN) ? coords as [number, number] : [0, 0];
  };

  // Helper function to generate a numeric userId
  const generateUserId = (handle: string): number => {
    const generatedId = handle.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return typeof generatedId === 'number' && !isNaN(generatedId) ? generatedId : Math.floor(Math.random() * 1000000);
  };

  // Map urgency levels to match the schema
  const mapUrgencyLevel = (level: string): 'Low' | 'Moderate' | 'High' => {
    const lowLevels = ['low', 'minor', 'minimal'];
    const highLevels = ['high', 'critical', 'severe', 'extreme'];
    const lowerLevel = level.toLowerCase();
    if (lowLevels.includes(lowerLevel)) return 'Low';
    if (highLevels.includes(lowerLevel)) return 'High';
    return 'Moderate';
  };

  return {
    source: 'twitter',
    postId: tweet.tweetId.toString(),
    userId: generateUserId(tweet.authorNameHandle),
    username: tweet.authorNameHandle,
    text: tweet.text,
    location: tweet.location || tweet.geolocation || 'Unknown',
    coordinates: parseCoordinates(tweet.geolocation),
    timestamp: new Date(tweet.dateTime),
    urgencyLevel: mapUrgencyLevel(tweet.urgencyLevel || determineUrgencyLevel(tweet.text)),
    needs: tweet.needs || extractNeeds(tweet.text),
    sentiment: tweet.sentiment || 'Unknown',
    hashtags: tweet.hashtags || [],
    verified: false,
    type: 'need',
    llm_insight: 'Insight to be generated'
  };
}

// Transform Facebook data
async function transformFacebookData(post: any): Promise<Partial<IDisasterCase>> {
    console.log("fb Processing",post);
 
  return {
    source: 'facebook',
    postId: generateUniquePostId('instagram',post.postId.toString()),
    userId: post.userId,
    username: post.username,
    text: post.text,
    location: post.location || post.placeName,
    coordinates: post.coordinates || [0, 0],
    timestamp: post.timestamp,
    urgencyLevel: post.urgency ? 'High' : determineUrgencyLevel(post.text),
    needs: extractNeeds(post.text),
    sentiment: post.sentiment || 'Unknown',
    hashtags: post.hashtags,
    verified: false,
    type: 'need',
    llm_insight: 'Insight to be generated'
  };
}

// Transform Instagram data
async function transformInstagramData(story: any): Promise<Partial<IDisasterCase>> {
    console.log("Insta Processing",story);
    const generateUserId = (handle: string): number => {
        const generatedId = handle.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return typeof generatedId === 'number' && !isNaN(generatedId) ? generatedId : Math.floor(Math.random() * 1000000);
      };
    
  return {
    source: 'instagram',
    postId:  generateUniquePostId('instagram', story.storyId),
    userId: generateUserId (story.userId),
    username: story.username,
    text: story.text,
    location: story.location || story.placeName,
    coordinates: [story.coordinates.latitude, story.coordinates.longitude],
    timestamp: story.timestamp,
    urgencyLevel: story.urgency ? 'High' : determineUrgencyLevel(story.text),
    needs: extractNeeds(story.text),
    sentiment: story.sentiment,
    hashtags: story.hashtags,
    verified: false,
    type: 'need',
    llm_insight: 'Insight to be generated'
  };
}

export const transformData = async (req: Request, res: Response): Promise<void> => {
  try {
    const { twitter, instagram, facebook } = req.body;
console.log("body",req.body);
console.log("twitter",twitter);
    if (!twitter  || !instagram || !facebook) {
      res.status(400).json({ error: 'Data from all sources is required' });
      return;
    }

    const transformedData = [
      ...await Promise.all(twitter.map(transformTwitterData)),
      ...await Promise.all(instagram.map(transformInstagramData)),
      ...await Promise.all(facebook.map(transformFacebookData))
    ];

    const savedCases = await DisasterCase.insertMany(transformedData);

    res.status(201).json({
      message: 'Data transformed and saved successfully',
      count: transformedData.length,
      savedCases
    });
  } catch (error) {
    console.error('Error transforming data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


