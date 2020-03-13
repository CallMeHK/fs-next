import { NextApiRequest } from "next";

export interface SuccessWrapper<T> {
    success: boolean
    data?: T
    error?: Error
}

export interface NextApiWithBody<T> extends NextApiRequest {
    body: T
}
