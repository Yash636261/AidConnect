import express from "express";
import { createBulkTweets, getTweets } from "../controllers/tweet.controller";

const router = express.Router();

router.post("/create-bulk", createBulkTweets);
router.get("/", getTweets);

export default router;
