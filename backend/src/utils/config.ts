import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const CLIENT_ID = process.env.CLIENT_ID;
export const CLIENT_SECRET = process.env.CLIENT_SECRET;
export const JWT_SECRET = process.env.JWT_SECRET;