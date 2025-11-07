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
exports.updateVacation = void 0;
const _1 = require("./");
const updateVacation = (vacation) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, _1.getConnection)();
    const [result] = yield connection.execute(updateVacationQuery(), [
        vacation.destination,
        vacation.description,
        vacation.startDate,
        vacation.endDate,
        vacation.price,
        vacation.image,
        vacation.id
    ]);
    return result.affectedRows > 0;
});
exports.updateVacation = updateVacation;
const updateVacationQuery = () => {
    const query = `UPDATE northwind.vacations 
                   SET destination = ?, description = ?, start_date = ?, end_date = ?, price = ?, image = ? 
                   WHERE id = ?`;
    return query;
};
