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
exports.registerUser = void 0;
const _1 = require("./");
const registerUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, _1.getConnection)();
    const result = connection === null || connection === void 0 ? void 0 : connection.execute(registerUserQuery(), [
        user.firstName,
        user.lastName,
        user.email,
        user.password,
    ]);
    return result;
});
exports.registerUser = registerUser;
const registerUserQuery = () => {
    const query = `INSERT INTO northwind.users (first_name, last_name, email, password)
                   VALUES (?, ?, ?, ?)`;
    return query;
};
