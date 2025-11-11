import { Request, Response } from "express";
import { isFollow } from "../db/isFollow";
import { removeFollower } from "../db/removeFollower";

export const unFollowEndpoint = async (req: Request, res: Response) => {
    try {
        const body = req.body;
       const email = (req as any).user.email;
        const vacationId = body.vacationId;
        if (!vacationId) {
            return res.status(400).send("vacationId is required");
        }
        if (typeof vacationId !== "number") {
            return res.status(400).send("invalid vacationId");
        }
        const alreadyFollowing = await isFollow(email, vacationId)
        if (!alreadyFollowing) {
            return res.status(200).json({
                message: 'Not following'
            });
        }
        await removeFollower(email, vacationId);
        return res.status(200).json({
            message: "succssefully removed",
        })
    }
    catch (error: any) {
        console.error("Error deleting follower:", error);
        return res.status(500).send("Internal server error")
    }

}


