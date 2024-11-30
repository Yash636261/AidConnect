import express from 'express';
import { getInstagramPosts } from '../controllers/scraping';

const router = express.Router();

router.post('/instagram', getInstagramPosts);


export default router;