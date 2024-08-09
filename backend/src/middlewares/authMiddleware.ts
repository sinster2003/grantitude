import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../utils/config";
import { AccessRequest } from "../types";

const authMiddleware = (req: AccessRequest, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"];
    console.log(token);
    console.log(JWT_SECRET);
    console.log(req);

    if(!token) {
        return res.status(400).json({
            message: "Authorization token unavailable. Please Login"
        })
    }
    
    const { access_token } = jwt.verify(token, JWT_SECRET as jwt.Secret) as JwtPayload;

    if(access_token) {
        req.access_token = access_token;
        next();
    }
    else {
        res.status(400).json({ message: "Access token unavailable. Please re-login!"});
    }
}

export default authMiddleware;