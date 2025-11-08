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
exports.postQueryVacationsEndpoint = void 0;
const queryVacations_1 = require("../db/queryVacations");
const postQueryVacationsEndpoint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const limit = body.limit;
    let pageNumber = body.pageNumber;
    let filterDate = body.filterDate;
    let onlyFollowed = body.onlyFollowed;
    if (limit === undefined || isNaN(Number(limit)) || Number(limit) <= 0) {
        return res.status(400).send("Invalid limit");
    }
    if (pageNumber !== undefined) {
        if (isNaN(Number(pageNumber)) || Number(pageNumber) < 0) {
            return res.status(400).send("Invalid pageNumber");
        }
        pageNumber = Number(pageNumber);
    }
    else {
        pageNumber = 0;
    }
    if (filterDate) {
        if (typeof filterDate !== "string") {
            return res.status(400).send("Invalid filterDate");
        }
        if (filterDate !== "ALL" /* FilterDate.All */ && filterDate !== "PAST" /* FilterDate.Past */ && filterDate !== "ACTIVE" /* FilterDate.Active */ && filterDate !== "UPCOMING" /* FilterDate.Upcoming */) {
            return res.status(400).send(`filter date must be one of the following values: ${"ALL" /* FilterDate.All */}, ${"PAST" /* FilterDate.Past */}, ${"ACTIVE" /* FilterDate.Active */}, ${"UPCOMING" /* FilterDate.Upcoming */}`);
        }
    }
    else {
        filterDate = "ALL";
    }
    if (onlyFollowed === undefined) {
        onlyFollowed = false;
    }
    else if (typeof onlyFollowed !== "boolean") {
        return res.status(400).send("Invalid onlyFollowed");
    }
    const result = yield (0, queryVacations_1.queryVacations)(limit, pageNumber, onlyFollowed, filterDate);
    return res.status(200).json(result);
});
exports.postQueryVacationsEndpoint = postQueryVacationsEndpoint;
