import express from "express";
import actions from "./routes/action.route";                                                                
import source from "./routes/source.route";
import { connectDB } from "./db/connectDB";

const app = express();
const port = 8000;
app.use(express.json());                                                                                                                                      

app.get("/test", (req: express.Request, res: express.Response) => {                                                                                                                                                       
  res.send("Hello! the server is up and running");
});                             


app.use("/api/source", source);
app.use("/api/actions", actions);                                                                                                                                                                         


app.listen(port, async () => {                                                                                                                                            
  await connectDB();
  console.log(`Server is running at http://localhost:${port}`);
});

