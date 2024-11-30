import { Request, Response } from 'express';
import Tweet from '../models/Tweet.model'; // Replace with actual Tweet model path
import FacebookPost from '../models/FacebookPost.model'; // Replace with actual FacebookPost model path
import InstagramStory from '../models/InstagramStory.model'; // Replace with actual InstagramStory model path

// Fetch all tweets
export const getTweets = async (req: Request, res: Response): Promise<void> => {
  try {
    const tweets = await Tweet.find();
    res.status(200).json(tweets);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch tweets', details: error.message });
  }
};

// Fetch all Facebook posts
export const getFacebookPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await FacebookPost.find();
    res.status(200).json(posts);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch Facebook posts', details: error.message });
  }
};

// Fetch all Instagram stories
export const getInstagramStories = async (req: Request, res: Response): Promise<void> => {
  try {
    const stories = await InstagramStory.find();
    res.status(200).json(stories);
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch Instagram stories', details: error.message });
  }
};

// Fetch all sources combined (tweets, posts, stories)
export const getAllSources = async (req: Request, res: Response): Promise<void> => {
  try {
    const tweets = await Tweet.find();
    const posts = await FacebookPost.find();
    const stories = await InstagramStory.find();

    res.status(200).json({
      tweets,
      facebookPosts: posts,
      instagramStories: stories,
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch data from all sources', details: error.message });
  }
};
