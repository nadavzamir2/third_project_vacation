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
exports.createVacation = void 0;
const _1 = require("./");
const createVacation = (vacation) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, _1.getConnection)();
    const [result] = yield connection.execute(createVacationQuery(vacation), [
        vacation.destination,
        vacation.description,
        vacation.startDate,
        vacation.endDate,
        vacation.price,
        vacation.image
    ]);
    return Object.assign(Object.assign({}, vacation), { id: result.insertId });
});
exports.createVacation = createVacation;
const createVacationQuery = (vacation) => {
    const query = `INSERT INTO northwind.vacations (destination, description, start_date, end_date, price, image)
                   VALUES (?, ?, ?, ?, ?, ?)`;
    return query;
};
