import { Request, Response } from "express";
import { isFloat, getNumOfDecimals } from "./../utils/numbers";
import { isDateDDMMYYYY, convertDDMMYYYYtoYYYYMMDD } from "../utils/dates";
import { createVacation } from "../db/createVacation";

export const postVacationEndpoint = async (req: Request, res: Response) => {
    const body = req.body;
    console.log(body);
    const startDate = body.startDate;
    if (!startDate) {
        return res.status(400).send("startDate is required");
    }
    if (!isDateDDMMYYYY(startDate)) {
        return res.status(400).send("Invalid startDate. Expected format: dd-mm-yyyy");
    }

    const endDate = body.endDate;
    if (!endDate) {
        return res.status(400).send("endDate is required");
    }
    if (!isDateDDMMYYYY(endDate)) {
        return res.status(400).send("Invalid endDate. Expected format: dd-mm-yyyy");
    }
    const price = body.price;
    if (!price) {
        return res.status(400).send("price is required");
    }
    if (!isFloat(price)) {
        return res.status(400).send("Invalid price");
    }
    if (price <= 0) {
        return res.status(400).send("Price must be greater than zero");
    }

    // Convert dates for comparison
    const startDateMySQL = convertDDMMYYYYtoYYYYMMDD(startDate);
    const endDateMySQL = convertDDMMYYYYtoYYYYMMDD(endDate);

    if (new Date(endDateMySQL) <= new Date(startDateMySQL)) {
        return res.status(400).send("endDate must be after startDate");
    }
    if (price >= 10000) {
        return res.status(400).send("Price must be less than 10000");
    }
    if (getNumOfDecimals(price) > 2) {
        return res.status(400).send("Price can have maximum two decimal places");
    }
    const destination = body.destination;
    if (!destination) {
        return res.status(400).send("destination is required");
    }
    if (typeof destination !== "string" || destination.trim().length === 0) {
        return res.status(400).send("Invalid destination");
    }
    if (destination.length > 20) {
        return res.status(400).send("Destination must be less than 20 characters");
    }
    const description = body.description;
    if (description) {
        if (typeof description !== "string") {
            return res.status(400).send("Invalid description");
        }
        if (description.length > 250) {
            return res.status(400).send("Description must be less than 250 characters");
        }
    }
    const image = body.image;
    if (!image) {
        return res.status(400).send("image is required");
    }
    if (typeof image !== "string" || image.trim().length === 0) {
        return res.status(400).send("Invalid image");
    }
    if (image.length > 100) {
        return res.status(400).send("Image must be less than 100 characters");
    }

    const newVacation = await createVacation({
        destination: destination,
        description: description || "",
        startDate: new Date(startDateMySQL),
        endDate: new Date(endDateMySQL),
        price: price,
        image: image
    });

    res.send({ vacation: newVacation });
};