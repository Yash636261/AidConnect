import express from "express";
import actions from "./routes/action.route";
import source from "./routes/source.route";
import Disastercase from "./routes/Disastercase.route";
import { connectDB } from "./db/connectDB";
import scraping from "./routes/scraping.route";


const app = express();
const port = 8000;
app.use(express.json());

app.get("/test", (req: express.Request, res: express.Response) => {
  res.send("Hello! the server is up and running");
});

app.use("/api/data", Disastercase);
                             

// app.get("/data", (req: express.Request, res: express.Response) => {
//   res.send({data  });
// });
app.use("/api/source", source);
app.use("/api/actions", actions);
app.use("/api/scraping", scraping);


app.listen(port, async () => {
  await connectDB();
  console.log(`Server is running at http://localhost:${port}`);
});

