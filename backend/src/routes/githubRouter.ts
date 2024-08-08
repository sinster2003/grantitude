import express, { Request, Response } from "express";
import { fetchPrs, fetchRepos, githubAuth } from "../controllers";
import authMiddleware from "../middlewares/authMiddleware";

const githubRouter =  express.Router();

githubRouter.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Healthy github router"
    })
});

githubRouter.post("/auth/callback", githubAuth);

githubRouter.get("/repos", authMiddleware, fetchRepos);

githubRouter.get("/repos/:owner/:name", authMiddleware, fetchPrs);

export default githubRouter;