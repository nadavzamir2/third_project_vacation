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
exports.postLoginEndpoint = void 0;
const logInUser_1 = require("../db/logInUser");
const postLoginEndpoint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const email = body.email;
    const password = body.password;
    if (typeof email !== "string" || email.trim().length === 0) {
        return res.status(400).send("Invalid email");
    }
    if (typeof password !== "string" || password.trim().length === 0) {
        return res.status(400).send("Invalid password");
    }
    const user = yield (0, logInUser_1.logInUser)(email, password);
    if (!user) {
        return res.status(401).send("Invalid email or password");
    }
    res.status(200).send({ message: "Login successful", user });
});
exports.postLoginEndpoint = postLoginEndpoint;
