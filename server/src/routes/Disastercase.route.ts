import express from 'express';
import { generateStats} from '../controllers/stats.controller';
import { getDisasterData ,  } from '../controllers/disaster.controller';
const router = express.Router();

router.get('/', getDisasterData);
router.get('/stats', generateStats);
// Route to fetch tweets

export default router;
