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
exports.uniqueEmail = exports.registerEndpoint = void 0;
const latinLetters_1 = require("../utils/latinLetters");
const registerUser_1 = require("../db/registerUser");
const db_1 = require("../db");
const registerEndpoint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const firstName = body.firstName;
    const lastName = body.lastName;
    const email = body.email;
    const password = body.password;
    if (typeof firstName !== "string" || firstName.trim().length === 0) {
        return res.status(400).send("Invalid firstName");
    }
    if (firstName.length > 20) {
        return res.status(400).send("firstName must be at most 20 characters");
    }
    if (!(0, latinLetters_1.hasOnlyEnglishLetters)(firstName)) {
        return res.status(400).send("firstName must contain only English letters");
    }
    if (typeof lastName !== "string" || lastName.trim().length === 0) {
        return res.status(400).send("Invalid lastName");
    }
    if (lastName.length > 20) {
        return res.status(400).send("lastName must be at most 20 characters");
    }
    if (!(0, latinLetters_1.hasOnlyEnglishLetters)(lastName)) {
        return res.status(400).send("lastName must contain only English letters");
    }
    if (typeof email !== "string" || email.trim().length === 0) {
        return res.status(400).send("Invalid email");
    }
    if (!(0, latinLetters_1.isOnlyEnglishLetters)(email)) {
        return res.status(400).send("Forign letters are not allowed in email");
    }
    if (email.length > 30) {
        return res.status(400).send("email must be at most 30 characters");
    }
    if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
        return res.status(400).send("Invalid email format");
    }
    if (yield !(0, exports.uniqueEmail)(email)) {
        return res.status(400).send("Email already exists");
    }
    if (password.length < 5) {
        return res.status(400).send("Password too short(minimum 5 letters)");
    }
    if (password.length > 20) {
        return res.status(400).send("Password too long (maximum 20 letters)");
    }
    if (!(0, latinLetters_1.isOnlyEnglishLetters)(password)) {
        return res.status(400).send("Forign letters are not allowed in password");
    }
    else {
        const result = yield (0, registerUser_1.registerUser)({
            firstName,
            lastName,
            email,
            password
        });
        if (result) {
            return res.status(200).send("Successful Registration");
        }
        else {
            return res.status(500).send("Internal Server Error");
        }
    }
});
exports.registerEndpoint = registerEndpoint;
const uniqueEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, db_1.getConnection)();
    const [result] = yield connection.execute(checkEmailQuery(), [email]);
    return result.length === 0;
});
exports.uniqueEmail = uniqueEmail;
const checkEmailQuery = () => {
    const query = `SELECT * FROM northwind.users WHERE email = ?`;
    return query;
};
