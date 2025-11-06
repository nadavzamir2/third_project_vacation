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
exports.postVacationEndpoint = void 0;
const numbers_1 = require("./../utils/numbers");
const dates_1 = require("../utils/dates");
const createVacation_1 = require("../db/createVacation");
const postVacationEndpoint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    console.log(body);
    const startDate = body.startDate;
    if (!startDate) {
        return res.status(400).send("startDate is required");
    }
    const endDate = body.endDate;
    if (!endDate) {
        return res.status(400).send("endDate is required");
    }
    if (!(0, dates_1.isDate)(endDate)) {
        return res.status(400).send("Invalid endDate");
    }
    const price = body.price;
    if (!price) {
        return res.status(400).send("price is required");
    }
    if (!(0, numbers_1.isFloat)(price)) {
        return res.status(400).send("Invalid price");
    }
    if (price <= 0) {
        return res.status(400).send("Price must be greater than zero");
    }
    if (new Date(endDate) <= new Date(startDate)) {
        return res.status(400).send("endDate must be after startDate");
    }
    if (price >= 10000) {
        return res.status(400).send("Price must be less than 10000");
    }
    if ((0, numbers_1.getNumOfDecimals)(price) > 2) {
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
    const newVacation = yield (0, createVacation_1.createVacation)({
        destination: destination,
        description: description || "",
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        price: price,
        image: image
    });
    res.send({ vacation: newVacation });
});
exports.postVacationEndpoint = postVacationEndpoint;
