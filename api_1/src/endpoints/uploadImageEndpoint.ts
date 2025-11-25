import { Request, Response } from "express";

export const uploadImageEndpoint = async (req: Request, res: Response) => {
    return res.status(200).send({ fileName: 'images/something.jpg' });
}