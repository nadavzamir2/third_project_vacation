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
const postQueryVacationsEndpoint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const limit = body.limit;
    let pageNumber = body.pageNumber;
    let filterDate = body.filterDate;
    let onlyFollowed = body.onlyFollowed;
    if (limit === undefined || isNaN(Number(limit)) || Number(limit) <= 0) {
        return res.status(400).send("Invalid limit");
    }
    if (pageNumber) {
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
        if (filterDate !== "ALL" && filterDate !== "PAST" && filterDate !== "ACTIVE" && filterDate !== "FUTURE") {
            return res.status(400).send("filter date must be one of the following values: ALL, PAST, ACTIVE, FUTURE");
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
    // here we will perfirm the SQL request
    return res.status(200);
});
exports.postQueryVacationsEndpoint = postQueryVacationsEndpoint;
