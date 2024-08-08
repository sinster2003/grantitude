import axios from "axios";
import { Request, Response } from "express";
import { CLIENT_ID, CLIENT_SECRET } from "../utils/config";
import generateJwtToken from "../utils/generateJwtToken";

const githubAuth = async (req: Request, res: Response) => {
    const { code } = req.body;

    try {
        // convert the code recieved into access_token in order to access public apis of github
        const response = await axios.post("https://github.com/login/oauth/access_token", 
            {
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                code
            }, 
            {
                headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json"
                }
            }
        )

        const codeToAccessToken = await response.data;
        const access_token = codeToAccessToken.access_token;

        // generate jwt session with access_token as payload
        if(access_token) {
            const token = generateJwtToken(access_token, res);
            return res.status(200).json({ message: "Authentication Successful", token });
        }
        else {
            return res.status(403).json({ message: "Authentication Failure" });
        }
    }
    catch(error) {
        res.status(500).json({
            message: "Something went wrong"
        });
    }
}

export default githubAuth;