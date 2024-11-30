import express from "express";
import {
  createBulkFacebookPosts,
  getFacebookPosts,
} from "../controllers/facebookPost.controller";

const router = express.Router();

router.post("/create-bulk", createBulkFacebookPosts);
router.get("/", getFacebookPosts);

export default router;
