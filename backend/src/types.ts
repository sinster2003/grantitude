import { Request } from "express";

export interface AccessRequest extends Request{
    access_token?: string
}
