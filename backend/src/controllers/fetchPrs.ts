import axios from "axios";
import { Response } from "express";
import { AccessRequest } from "../types";

const fetchPrs = async (req: AccessRequest, res: Response) => {
    const { owner, name } = req.params;
    const access_token = req.access_token;

    try {
        const response = await axios.get(`https://api.github.com/repos/${owner}/${name}/pulls?state=all`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                Accept: "application/json",
            },
        });
        const result = await response.data;
        res.status(200).json({prs: result});
    }
    catch(error) {
        res.status(500).json({
            message: "Something went wrong"
        });
    }
}

export default fetchPrs;