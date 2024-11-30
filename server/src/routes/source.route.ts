import express from 'express';
import { getTweets, getPosts, getStories,getAllSources } from '../controllers/source.controller';

const router = express.Router();
// Route to fetch all sources
router.get('/', getAllSources);
// Route to fetch tweets
router.get('/tweets', getTweets);

// Route to fetch posts
router.get('/posts', getPosts);

// Route to fetch stories
router.get('/stories', getStories);

export default router;
