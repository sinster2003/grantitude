import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../utils/config";
import { AccessRequest } from "../types";

const authMiddleware = (req: AccessRequest, res: Response, next: NextFunction) => {
    const { token } = req.cookies;
    
    const { access_token } = jwt.verify(token, JWT_SECRET as string) as JwtPayload;

    if(access_token) {
        req.access_token = access_token;
        next();
    }
    else {
        res.status(400).json({ message: "Access token unavailable. Please re-login!"});
    }
}

export default authMiddleware;