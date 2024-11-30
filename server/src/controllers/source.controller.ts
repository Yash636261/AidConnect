import { Request, Response } from "express";
import Tweet from "../models/Tweet.model"; // Replace with actual Tweet model path
import FacebookPost from "../models/FacebookPost.model"; // Replace with actual FacebookPost model path
import InstagramStory from "../models/InstagramStory.model"; // Replace with actual InstagramStory model path

export const getAllSources = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const tweets = await Tweet.find();
    const posts = await FacebookPost.find();
    const stories = await InstagramStory.find();

    return res.status(200).json({
      tweets,
      facebookPosts: posts,
      instagramStories: stories,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: "Failed to fetch data from all sources",
      details: error.message,
    });
  }
};

export const getTweets = async (req: Request, res: Response): Promise<void> => {
  try {
      const tweets = await Tweet.find({});
      res.status(200).json({ success: true, data: tweets });
  } catch (error: any) {
      res.status(500).json({ success: false, message: 'Failed to fetch tweets', error: error.message });
  }
};

// Controller to fetch posts
export const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
      const posts = await FacebookPost.find({});
      res.status(200).json({ success: true, data: posts });
  } catch (error: any) {
      res.status(500).json({ success: false, message: 'Failed to fetch posts', error: error.message });
  }
};

// Controller to fetch stories
export const getStories = async (req: Request, res: Response): Promise<void> => {
  try {
      const stories = await InstagramStory.find({});
      res.status(200).json({ success: true, data: stories });
  } catch (error: any) {
      res.status(500).json({ success: false, message: 'Failed to fetch stories', error: error.message });
  }
};
