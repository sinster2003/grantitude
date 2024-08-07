import express from "express";
import cors from "cors";
import githubRouter from "./routes/githubRouter";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/github", githubRouter);

app.use(errorHandler);

export default app;