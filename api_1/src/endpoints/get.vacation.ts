import { Request, Response, NextFunction } from "express";
import { getVacation } from "../db/getVacation";

export const getVacationEndpoint = async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const id = query.id;
    if (!id) {
        return res.status(400).send("id is required");
    }
    if (isNaN(Number(id))) {
        return res.status(400).send("Invalid id");
    }
    const vacation = await getVacation(Number(id));
    if (!vacation) {
        return res.status(404).send("Vacation not found");
    }
    res.status(200).send({ vacation });
        
}