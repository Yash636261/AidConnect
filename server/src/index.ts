import express from "express";
import tweets from "./routes/tweet.route";
import instagram from "./routes/instagramStory.route";
import posts from "./routes/facebookPost.route";
import allSource from "./routes/source.route";
import { connectDB } from "./db/connectDB";
import socialDataRoutes from './routes/scraping.route';
const app = express();
const port = 8000;
app.use(express.json());

app.get("/test", (req: express.Request, res: express.Response) => {
  res.send("Hello! the server is up and running");
});

app.get("/", allSource);

app.use("/tweets", tweets);
app.use("/instagram", instagram);
app.use("/facebook", posts);

// Routes
app.use('/api', socialDataRoutes);

app.listen(port, async () => {
  await connectDB();
  console.log(`Server is running at http://localhost:${port}`);
});

