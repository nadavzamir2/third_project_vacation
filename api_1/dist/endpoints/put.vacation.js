"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putVacationEndpoint = void 0;
const getVacation_1 = require("../db/getVacation");
const updateVacation_1 = require("../db/updateVacation");
const dates_1 = require("../utils/dates");
const numbers_1 = require("../utils/numbers");
const putVacationEndpoint = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const id = query.id;
    if (!id) {
        return res.status(400).send("id is required");
    }
    if (isNaN(Number(id))) {
        return res.status(400).send("Invalid id");
    }
    const vacation = yield (0, getVacation_1.getVacation)(Number(id));
    if (!vacation) {
        return res.status(404).send("Vacation not found");
    }
    const body = req.body;
    // Validate and update fields
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
    let startDateMySQL;
    if (body.startDate) {
        if (!(0, dates_1.isDateDDMMYYYY)(body.startDate)) {
            return res.status(400).send("Invalid startDate. Expected format: dd-mm-yyyy");
        }
        startDateMySQL = (0, dates_1.convertDDMMYYYYtoYYYYMMDD)(body.startDate);
    }
    else {
        startDateMySQL = vacation.startDate instanceof Date
            ? vacation.startDate.toISOString().split('T')[0]
            : vacation.startDate;
    }
    let endDateMySQL;
    if (body.endDate) {
        if (!(0, dates_1.isDateDDMMYYYY)(body.endDate)) {
            return res.status(400).send("Invalid endDate. Expected format: dd-mm-yyyy");
        }
        endDateMySQL = (0, dates_1.convertDDMMYYYYtoYYYYMMDD)(body.endDate);
    }
    else {
        endDateMySQL = vacation.endDate instanceof Date
            ? vacation.endDate.toISOString().split('T')[0]
            : vacation.endDate;
    }
    if (new Date(endDateMySQL) <= new Date(startDateMySQL)) {
        return res.status(400).send("endDate must be after startDate");
    }
    const price = body.price !== undefined ? body.price : vacation.price;
    if (!(0, numbers_1.isFloat)(price)) {
        return res.status(400).send("Invalid price");
    }
    if (price <= 0) {
        return res.status(400).send("Price must be greater than zero");
    }
    if (price >= 10000) {
        return res.status(400).send("Price must be less than 10000");
    }
    if ((0, numbers_1.getNumOfDecimals)(price) > 2) {
        return res.status(400).send("Price can have maximum two decimal places");
    }
    const image = body.image || vacation.image;
    if (typeof image !== "string" || image.trim().length === 0) {
        return res.status(400).send("Invalid image");
    }
    if (image.length > 100) {
        return res.status(400).send("Image must be less than 100 characters");
    }
    const updated = yield (0, updateVacation_1.updateVacation)({
        id: Number(id),
        destination,
        description: description || "",
        startDate: new Date(startDateMySQL),
        endDate: new Date(endDateMySQL),
        price,
        image
    });
    if (!updated) {
        return res.status(500).send("Failed to update vacation");
    }
    const updatedVacation = yield (0, getVacation_1.getVacation)(Number(id));
    res.status(200).send({ vacation: updatedVacation });
});
exports.putVacationEndpoint = putVacationEndpoint;
