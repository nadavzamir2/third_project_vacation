import { Request, Response, NextFunction } from "express";
import { getVacation, addFollower } from "../db";
import { isFollow } from "../db/isFollow";

export const postFollowEndpoint = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const userEmail = (req as any).user.email;

    const vacationId = body.vacationId;
    if (!vacationId) {
        return res.status(400).send("vacationId is required");
    }
    if (isNaN(Number(vacationId))) {
        return res.status(400).send("Invalid vacationId");
    }

    const vacation = await getVacation(Number(vacationId));
    if (!vacation) {
        return res.status(404).send("Vacation not found");
    }

    const alreadyFollowing = await isFollow(userEmail, Number(vacationId));
    if (alreadyFollowing) {
        return res.status(200).json({
            message: "Already following this vacation"
        });
    }

    try {
        const success = await addFollower(userEmail, Number(vacationId));
        if (success) {
            return res.status(200).json({message: "Successfully followed vacation"});
        } else {
            return res.status(500).send("Failed to follow vacation");
        }
    } catch (error: any) {
        console.error("Error adding follower:", error);
        return res.status(500).send("Internal server error");
    }
};

