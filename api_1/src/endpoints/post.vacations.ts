import { Request, Response } from "express";
import { queryVacations } from "../db/queryVacations";
import { FilterDate } from "../types";
import { fromVacationDTO } from "../mappers";

export const postQueryVacationsEndpoint = async (req: Request, res: Response) => {
    const body = req.body;
    const limit = body.limit;
    let pageNumber = body.pageNumber;
    let filterDate = body.filterDate;
    let onlyFollowed = body.onlyFollowed;
    const email = body.email;
    if (!email) {
        return res.status(400).send("email is required");
    }
    if (typeof email !== "string" || email.trim().length === 0) {
        return res.status(400).send("Invalid email");
    }

    if (limit === undefined || isNaN(Number(limit)) || Number(limit) <= 0) {
        return res.status(400).send("Invalid limit");
    }
    if (pageNumber !== undefined) {
        if (isNaN(Number(pageNumber)) || Number(pageNumber) < 0) {
            return res.status(400).send("Invalid pageNumber");
        }
        pageNumber = Number(pageNumber);
    } else {
        pageNumber = 0;
    }
    if (filterDate) {
        if (typeof filterDate !== "string") {
            return res.status(400).send("Invalid filterDate");
        }
        if (filterDate !== FilterDate.All && filterDate !== FilterDate.Past && filterDate !== FilterDate.Active && filterDate !== FilterDate.Upcoming) {
            return res.status(400).send(`filter date must be one of the following values: ${FilterDate.All}, ${FilterDate.Past}, ${FilterDate.Active}, ${FilterDate.Upcoming}`);
        }
    } else {
        filterDate = "ALL";
    }
    if (onlyFollowed === undefined) {
        onlyFollowed = false;
    }
    else if (typeof onlyFollowed !== "boolean") {
        return res.status(400).send("Invalid onlyFollowed");
    }

    const result = await queryVacations(limit, pageNumber, onlyFollowed, filterDate, email)

    return res.status(200).json({ 
        list: result.map(fromVacationDTO),
        currentPage: pageNumber,
        total: result.length > 0 ? result[0].total : 0 });
}
