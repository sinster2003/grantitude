import { Response } from "express";
import { AccessRequest } from "../types";
import axios from "axios";

const getUserMetamaskAddress = async (req: AccessRequest, res: Response) => {
    const access_token = req.access_token;
    const { username } = req.params;

    try {
        const response = await axios.get(`https://api.github.com/users/${username}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                Accept: "application/json"
            }
        });

        const result = await response.data;
        const bio: string = result.bio;
        console.log(bio);

        const address = bio.match(/0x[a-fA-F0-9]{40}/g);

        console.log(address)

        if(!address) {
            return res.status(400).json({ message: `${username} has not added metamask address in his bio` });
        }
        else {
            return res.status(200).json(address?.[0]);
        }
    }
    catch(error) {
        res.status(500).json({ message: "Failed extraction of user metamask address" });
    }
}

export default getUserMetamaskAddress;