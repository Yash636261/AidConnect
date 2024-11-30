import express from 'express';
import { getInstagramPosts, getTwitterPosts } from '../controllers/scraping';

const router = express.Router();

router.post('/instagram', getInstagramPosts);
router.post('/Tweet', getTwitterPosts);


export default router;