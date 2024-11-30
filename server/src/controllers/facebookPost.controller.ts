import FacebookPost from "../models/FacebookPost.model";
import { Request, Response } from "express";

// Create bulk Facebook posts
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

export const getFacebookPosts = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const posts = await FacebookPost.find();
    return res.status(200).json(posts);
  } catch (error: any) {
    return res.status(500).json({
      error: "Failed to fetch Facebook posts",
      details: error.message,
    });
  }
};
