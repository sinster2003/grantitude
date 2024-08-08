import express from "express";
import cors from "cors";
import githubRouter from "./routes/githubRouter";
import errorHandler from "./middlewares/errorHandler";

const app = express();

const corsConfig = {
    origin: "http://localhost:5173",
    credentials: true
}

app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/github", githubRouter);

app.use(errorHandler);

export default app;