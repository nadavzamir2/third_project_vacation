import { Request, Response, NextFunction } from "express";
import { getVacation } from "../db/getVacation";
import { updateVacation } from "../db/updateVacation";
import { isDateDDMMYYYY, convertDDMMYYYYtoYYYYMMDD } from "../utils/dates";
import { isFloat, getNumOfDecimals } from "../utils/numbers";

export const putVacationEndpoint = async (req: Request, res: Response, next: NextFunction) => {
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
    const body = req.body;

    const destination = body.destination || vacation.destination;
    if (typeof destination !== "string" || destination.trim().length === 0) {
        return res.status(400).send("Invalid destination");
    }
    if (destination.length > 20) {
        return res.status(400).send("Destination must be less than 20 characters");
    }

    const description = body.description !== undefined ? body.description : vacation.description;
    if (description && typeof description !== "string") {
        return res.status(400).send("Invalid description");
    }
    if (description && description.length > 250) {
        return res.status(400).send("Description must be less than 250 characters");
    }

    let startDateMySQL: string;
    if (body.startDate) {
        if (!isDateDDMMYYYY(body.startDate)) {
            return res.status(400).send("Invalid startDate. Expected format: dd-mm-yyyy");
        }
        startDateMySQL = convertDDMMYYYYtoYYYYMMDD(body.startDate);
    } else {
        startDateMySQL = vacation.startDate instanceof Date
            ? vacation.startDate.toISOString().split('T')[0]
            : vacation.startDate;
    }

    let endDateMySQL: string;
    if (body.endDate) {
        if (!isDateDDMMYYYY(body.endDate)) {
            return res.status(400).send("Invalid endDate. Expected format: dd-mm-yyyy");
        }
        endDateMySQL = convertDDMMYYYYtoYYYYMMDD(body.endDate);
    } else {
        endDateMySQL = vacation.endDate instanceof Date
            ? vacation.endDate.toISOString().split('T')[0]
            : vacation.endDate;
    }

    if (new Date(endDateMySQL) <= new Date(startDateMySQL)) {
        return res.status(400).send("endDate must be after startDate");
    }

    const price = body.price !== undefined ? body.price : vacation.price;
    if (!isFloat(price)) {
        return res.status(400).send("Invalid price");
    }
    if (price <= 0) {
        return res.status(400).send("Price must be greater than zero");
    }
    if (price >= 10000) {
        return res.status(400).send("Price must be less than 10000");
    }
    if (getNumOfDecimals(price) > 2) {
        return res.status(400).send("Price can have maximum two decimal places");
    }

    const image = body.image || vacation.image;
    if (typeof image !== "string" || image.trim().length === 0) {
        return res.status(400).send("Invalid image");
    }
    if (image.length > 100) {
        return res.status(400).send("Image must be less than 100 characters");
    }

    const updated = await updateVacation({
        id: Number(id),
        destination,
        description: description || "",
        startDate: new Date(startDateMySQL),
        endDate: new Date(endDateMySQL),
        price,
        image: image.replace("images/", ""),
    });

    if (!updated) {
        return res.status(500).send("Failed to update vacation");
    }

    const updatedVacation = await getVacation(Number(id));
    res.status(200).send({ vacation: updatedVacation });
}