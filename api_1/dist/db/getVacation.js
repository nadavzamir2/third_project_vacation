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
exports.getVacation = getVacation;
const _1 = require("./");
const mappers_1 = require("../mappers");
function getVacation(vacationId) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield (0, _1.getConnection)();
        const queryResult = yield connection.execute(getVacationQuery(), [vacationId]);
        //@ts-ignore
        const vacation = queryResult[0][0];
        if (vacation) {
            return (0, mappers_1.fromVacationDTO)(vacation);
        }
        else {
            return null;
        }
    });
}
const getVacationQuery = () => {
    const query = `SELECT 
            v.id, v.destination, v.description, v.start_date, v.end_date, v.price, v.image
        FROM
            northwind.vacations as v
        WHERE
        v.id = ?`;
    return query;
};
