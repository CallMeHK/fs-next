import { NextApiRequest } from "next";

export interface SuccessWrapper<T, S = string> {
    success: boolean
    data?: T
    error?: S
}

export interface NextApiWithBody<T> extends NextApiRequest {
    body: T
}
