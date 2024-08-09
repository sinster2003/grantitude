import axios from "axios";
import { Response } from "express";
import { AccessRequest } from "../types";

const fetchRepos = async (req: AccessRequest, res: Response) => {
    const access_token = req.access_token;

    try {
        const reposResult = await axios.get("https://api.github.com/user/repos?visibility=all&&sort=created", {
            headers: {
                Authorization: `Bearer ${access_token}`,
                Accept: "application/json",
            },
        });

        console.log(reposResult);

        const repos = await reposResult.data;
        console.log(repos);
        res.status(200).json(repos);
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong",
            error
        });
    }
};

export default fetchRepos;