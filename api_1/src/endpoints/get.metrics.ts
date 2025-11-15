import { Request, Response, NextFunction } from "express";
import { queryMetrics } from "../db/metrics";

export const getMetricsEndpoint = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const metrics = await queryMetrics();
        if (!metrics) {
            return res.status(404).send("No metrics data found");
        }
        res.status(200).send({ metrics });
    } catch (error) {
        console.error("Error fetching metrics:", error);
        res.status(500).send("Internal server error");
    }
}