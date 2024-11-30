import InstagramStory from "../models/InstagramStory.model";
import { Request, Response } from "express";

// Create bulk Instagram stories
export const createBulkInstagramStories = async (
  req: Request,
  res: Response
): Promise<any> => {
  
  const { data } = req?.body;

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

// Fetch all Instagram stories
export const getInstagramStories = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const stories = await InstagramStory.find();
    return res.status(200).json(stories);
  } catch (error: any) {
    return res.status(500).json({
      error: "Failed to fetch Instagram stories",
      details: error.message,
    });
  }
};
