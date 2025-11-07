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
exports.postFollowEndpoint = void 0;
const db_1 = require("../db");
const isFollow_1 = require("../db/isFollow");
const postFollowEndpoint = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const userEmail = body.email;
    if (!userEmail) {
        return res.status(400).send("email is required");
    }
    if (typeof userEmail !== "string" || userEmail.trim().length === 0) {
        return res.status(400).send("Invalid email");
    }
    const vacationId = body.vacationId;
    if (!vacationId) {
        return res.status(400).send("vacationId is required");
    }
    if (isNaN(Number(vacationId))) {
        return res.status(400).send("Invalid vacationId");
    }
    const vacation = yield (0, db_1.getVacation)(Number(vacationId));
    if (!vacation) {
        return res.status(404).send("Vacation not found");
    }
    const alreadyFollowing = yield (0, isFollow_1.isFollow)(userEmail, Number(vacationId));
    if (alreadyFollowing) {
        return res.status(200).json({});
    }
    try {
        const success = yield (0, db_1.addFollower)(userEmail, Number(vacationId));
        if (success) {
            return res.status(200).json({});
        }
        else {
            return res.status(500).send("Failed to follow vacation");
        }
    }
    catch (error) {
        console.error("Error adding follower:", error);
        return res.status(500).send("Internal server error");
    }
});
exports.postFollowEndpoint = postFollowEndpoint;
