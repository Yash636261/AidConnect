

import Tweet from "../models/Tweet.model"; // Replace with actual Tweet model path
import FacebookPost from "../models/FacebookPost.model"; // Replace with actual FacebookPost model path
import InstagramStory from "../models/InstagramStory.model"; // Replace with actual InstagramStory model path
import DisasterCase from "../models/DisasterCase.model";
import { Request, Response } from "express";

// bulk create instagram stories
export const createBulkInstagramStories = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const data = req?.body;
  
    if (!data || !Array.isArray(data)) {
      return res
        .status(400)
        .json({ error: "Invalid payload. Data array is required." });
    }
  
    try {
      const result = await InstagramStory.insertMany(data);
      return res.status(201).json({
        message: "Instagram Stories created successfully",
        data: result,
        count: result.length,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };

  // bulk create facebook posts
export const createBulkFacebookPosts = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const data = req?.body;
  
    if (!data || !Array.isArray(data)) {
      return res
        .status(400)
        .json({ error: "Invalid payload. Data array is required." });
    }
  
    try {
      const result = await FacebookPost.insertMany(data);
      return res.status(201).json({
        message: "Facebook Posts created successfully",
        data: result,
        count: result.length,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };

  // Create bulk tweets
export const createBulkTweets = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const data = req?.body;
  
    if (!data || !Array.isArray(data)) {
      console.log(data, "isArray", !Array.isArray(data));
      return res
        .status(400)
        .json({ error: "Invalid payload. Data array is required." });
    }
  
    try {
      const result = await Tweet.insertMany(data);
      return res.status(201).json({
        message: "Tweets created successfully",
        data: result,
        count: result.length,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };


  export const createBulkDisasterCases = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const data = req.body;
  console.log(data);
    if (!data || !Array.isArray(data)) {
      res.status(400).json({ error: "Invalid payload. Data array is required." });
      return;
    }
  
    try {
      const result = await DisasterCase.insertMany(data);
      res.status(201).json({
        message: "Disaster cases created successfully",
        data: result,
        count: result.length,
      });
    } catch (error: any) {
      res.status(500).json({ 
        error: "Failed to create disaster cases",
        details: error.message 
      });
    }
  };
  
  // You can add more disaster case related routes here
  
