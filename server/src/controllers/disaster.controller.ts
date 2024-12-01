import { Request, Response } from "express";
import Tweet from "../models/Tweet.model"; // Replace with actual Tweet model path
import FacebookPost from "../models/FacebookPost.model"; // Replace with actual FacebookPost model path
import InstagramStory from "../models/InstagramStory.model"; // Replace with actual InstagramStory model path
import DisasterCase from "../models/DisasterCase.model";




export const getDisasterData = async (req: Request, res: Response): Promise<void> => {
    try {
        const DisasterCases = await DisasterCase.find({});
        res.status(200).json({ success: true, data: DisasterCases });
    } catch (error: any) {
        res.status(500).json({ success: false, message: 'Failed to fetch disaster data', error: error.message });
    }
    }

;
