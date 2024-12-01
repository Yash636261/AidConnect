import express from 'express';

import { getDisasterData } from '../controllers/disaster.controller';
const router = express.Router();

router.get('/', getDisasterData);
// Route to fetch tweets

export default router;
