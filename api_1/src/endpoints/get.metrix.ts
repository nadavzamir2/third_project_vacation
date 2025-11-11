import { Request, Response, NextFunction } from "express";
import { getVacation } from "../db/getVacation";
import { metrix } from "../db/metrix";

export const getMetrixEndpoint = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const metrixData = await metrix();
        if (!metrixData) {
            return res.status(404).send("No metrix data found");
        }
        res.status(200).send({ metrixData });
    } catch (error) {
        console.error("Error fetching metrics:", error);
        res.status(500).send("Internal server error");
    }
}