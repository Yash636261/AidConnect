import { Request, Response } from "express";
import DisasterCase from "../models/DisasterCase.model";

export const generateStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const [
      totalPosts,
      urgencyLevels,
      sentiments,
      verifiedPosts,
      needs,
      posts,
      locations,
      sourceCounts
    ] = await Promise.all([
      getTotalPosts(),
      getUrgencyLevels(),
      getSentiments(),
      getVerifiedPosts(),
      getNeeds(),
      getPosts(),
      getLocations(),
      getSourceCounts()
    ]);

    res.status(200).json({
      totalPosts,
      urgencyLevels,
      sentiments,
      verifiedPosts,
      needs,
      posts,
      locations,
      sourceCounts
    });
  } catch (error: any) {
    res.status(500).json({ 
      error: "Failed to generate statistics",
      details: error.message 
    });
  }
};

async function getTotalPosts() {
  const result = await DisasterCase.countDocuments();
  return result;
}

async function getUrgencyLevels() {
  const result = await DisasterCase.aggregate([
    {
      $group: {
        _id: "$urgencyLevel",
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        urgencyLevel: "$_id",
        count: 1
      }
    }
  ]);

  return result.reduce((acc, { urgencyLevel, count }) => {
    acc[urgencyLevel.toLowerCase()] = count;
    return acc;
  }, {});
}

async function getSentiments() {
  const result = await DisasterCase.aggregate([
    {
      $group: {
        _id: "$sentiment",
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        sentiment: "$_id",
        count: 1
      }
    }
  ]);

  return result.reduce((acc, { sentiment, count }) => {
    acc[sentiment.toLowerCase()] = count;
    return acc;
  }, {});
}

async function getVerifiedPosts() {
  const result = await DisasterCase.countDocuments({ verified: true });
  return result;
}

async function getNeeds() {
  const result = await DisasterCase.aggregate([
    { $unwind: "$needs" },
    {
      $group: {
        _id: "$needs",
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        need: "$_id",
        count: 1
      }
    }
  ]);

  return result.reduce((acc, { need, count }) => {
    acc[need.toLowerCase()] = count;
    return acc;
  }, {});
}

async function getPosts(limit: number = 10) {
  return DisasterCase.aggregate([
    {
      $project: {
        _id: 0,
        id: "$_id",
        username: 1,
        location: 1,
        urgencyLevel: 1,
        sentiment: 1,
        needs: 1,
        timestamp: 1
      }
    },
    { $limit: limit }
  ]);
}

async function getLocations() {
  return DisasterCase.aggregate([
    {
      $project: {
        _id: 0,
        id: "$_id",
        lat: { $arrayElemAt: ["$coordinates", 0] },
        lng: { $arrayElemAt: ["$coordinates", 1] },
        urgencyLevel: 1,
        needs: 1
      }
    }
  ]);
}

async function getSourceCounts() {
  const result = await DisasterCase.aggregate([
    {
      $group: {
        _id: "$source",
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        source: "$_id",
        count: 1
      }
    }
  ]);

  return result.reduce((acc, { source, count }) => {
    acc[source.toLowerCase()] = count;
    return acc;
  }, {});
}