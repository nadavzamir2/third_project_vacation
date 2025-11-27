import { Request, Response } from "express";

export const postUploadImageEndpoint = async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).send("No Image Provided");
    }
    const imageUrl = "/images/" + req.file.filename;
    return res.status(200).send({ fileName: imageUrl });
}
