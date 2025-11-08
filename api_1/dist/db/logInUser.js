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
exports.logInUser = void 0;
const _1 = require(".");
const logInUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, _1.getConnection)();
    const [rows] = yield connection.execute(logInUserQuery(), [email, password]);
    if (rows.length === 0) {
        return null;
    }
    const user = {
        firstName: rows[0].first_name,
        lastName: rows[0].last_name,
        email: rows[0].email,
        password: rows[0].password,
    };
    return user;
});
exports.logInUser = logInUser;
const logInUserQuery = () => {
    const query = `SELECT first_name, last_name, email, password FROM northwind.users
                   WHERE email = ? AND password = ?`;
    return query;
};
