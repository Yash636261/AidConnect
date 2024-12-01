import express from 'express';
import { generateStats} from '../controllers/stats.controller';
import { getDisasterData ,  transformData} from '../controllers/disaster.controller';
import { classifyPostsHandler ,generateInsights} from '../controllers/classify.controller';
const router = express.Router();

router.get('/', getDisasterData);
router.get('/stats', generateStats);
router.post('/transform',transformData);
router.post('/classify',classifyPostsHandler);
router.post('/llm-insights',generateInsights)

// Route to fetch tweets

export default router;
