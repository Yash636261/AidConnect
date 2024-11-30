import express from "express";
import {
  createBulkInstagramStories,
  getInstagramStories,
} from "../controllers/instagramStory.controller";

const router = express.Router();

router.post("/create-bulk", createBulkInstagramStories);
router.get("/", getInstagramStories);
export default router;
