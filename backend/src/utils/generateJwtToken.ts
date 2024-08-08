import { Response } from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config";

const generateJwtToken = (access_token: string, res: Response) => {
    const token = jwt.sign({ access_token }, JWT_SECRET as string);
    return token;
}

export default generateJwtToken;