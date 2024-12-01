import { Request, Response } from "express";
import Tweet from "../models/Tweet.model"; // Replace with actual Tweet model path
import FacebookPost from "../models/FacebookPost.model"; // Replace with actual FacebookPost model path
import InstagramStory from "../models/InstagramStory.model"; // Replace with actual InstagramStory model path
import {data} from '../data/data';
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
export const getDisasterData = async (req: Request, res: Response): Promise<void> => {
    try {
   
        res.status(200).json({ success: true, data: data });
    } catch (error: any) {
        res.status(500).json({ success: false, message: 'Failed to fetch disaster data', error: error.message });
    }
    }

;
