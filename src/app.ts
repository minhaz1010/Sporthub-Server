



import express, { Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import morgan from "morgan"
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"))

app.get("/", (req: Request, res: Response) => {
  res.send("Hello dear");
});


app.use(globalErrorHandler);

app.use(notFound)
export default app;



