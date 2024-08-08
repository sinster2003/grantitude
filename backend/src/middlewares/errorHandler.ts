import { Request, Response } from "express";

const errorHandler = (error: Error, req: Request, res: Response) => {
    console.log(error.name);

    if(error.name === "CastError") {
        res.status(400).json({ message: "Malformatted Id" });
    }
    else if(error.name === "JsonWebTokenError") {
        console.log(error);
        res.status(400).json({ message: "Invalid token" });
    }
    else {
        res.status(500).json({
            message: "Something went wrong"
        });
    }
}

export default errorHandler;