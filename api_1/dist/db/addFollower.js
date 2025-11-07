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
exports.addFollower = void 0;
const _1 = require(".");
const addFollower = (userEmail, vacationId) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, _1.getConnection)();
    const [result] = yield connection.execute(insertFollowerQuery(), [
        userEmail,
        vacationId
    ]);
    return result.affectedRows > 0;
});
exports.addFollower = addFollower;
const insertFollowerQuery = () => {
    const query = `INSERT INTO northwind.followers (user_email, vacation_id) 
                   VALUES (?, ?)`;
    return query;
};
