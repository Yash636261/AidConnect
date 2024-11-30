import express from 'express';
import { getTweets, getPosts, getStories,getAllSources } from '../controllers/source.controller';
import { createBulkTweets,createBulkFacebookPosts, createBulkInstagramStories } from '../controllers/action.controller';

const router = express.Router();

router.get('/', getAllSources);
// Route to fetch tweets
router.post("/create-bulkTweet", createBulkTweets);

// Route to fetch posts
router.post("/create-bulkPost", createBulkFacebookPosts);

// Route to fetch stories
router.post("/create-bulkStories", createBulkInstagramStories);
export default router;
