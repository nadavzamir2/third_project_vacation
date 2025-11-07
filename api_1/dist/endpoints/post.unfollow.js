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
exports.unFollowEndpoint = void 0;
const isFollow_1 = require("../db/isFollow");
const removeFollower_1 = require("../db/removeFollower");
const unFollowEndpoint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const email = body.email;
        const vacationId = body.vacationId;
        if (!email) {
            return res.status(400).send("email is required");
        }
        if (typeof email !== "string" || email.length == 0) {
            return res.status(400).send("invalid email");
        }
        if (!vacationId) {
            return res.status(400).send("vacationId is required");
        }
        if (typeof vacationId !== "number") {
            return res.status(400).send("invalid vacationId");
        }
        const alreadyFollowing = yield (0, isFollow_1.isFollow)(email, vacationId);
        if (!alreadyFollowing) {
            return res.status(200).json({
                message: 'Not following'
            });
        }
        yield (0, removeFollower_1.removeFollower)(email, vacationId);
        return res.status(200).json({
            message: "succssefully removed",
        });
    }
    catch (error) {
        console.error("Error deleting follower:", error);
        return res.status(500).send("Internal server error");
    }
});
exports.unFollowEndpoint = unFollowEndpoint;
