import Tweet from "../models/Tweet.model";
import { Request, Response } from "express";

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

// Fetch all tweets
export const getTweets = async (req: Request, res: Response): Promise<any> => {
  try {
    const tweets = await Tweet.find();
    return res.status(200).json(tweets);
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: "Failed to fetch tweets", details: error.message });
  }
};
