import express from 'express';
import { getTweets, getFacebookPosts, getInstagramStories, getAllSources } from '../controllers/source.controller';

const router = express.Router();

// Routes for fetching data from each source
router.get('/tweets', getTweets);
router.get('/posts', getFacebookPosts);
router.get('/stories', getInstagramStories);
router.get('/sources', getAllSources);

export default router;
