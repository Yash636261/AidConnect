import express from 'express';
import { getFacebookPosts, getInstagramPosts, getTwitterPosts } from '../controllers/scraping';

const router = express.Router();

router.post('/instagram', getInstagramPosts);
router.post('/Tweet', getTwitterPosts);
router.post('/facebook', getFacebookPosts);


export default router;