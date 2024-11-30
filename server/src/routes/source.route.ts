import express from "express";
import { getAllSources } from "../controllers/source.controller";

const router = express.Router();

// Routes for fetching data from each source

router.get("/", getAllSources);

export default router;
