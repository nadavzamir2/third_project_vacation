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
exports.queryVacations = void 0;
const _1 = require("./");
const queryVacations = (limit, pageNumber, onlyFollowed, filterDate, email) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield (0, _1.getConnection)();
    const offset = String(limit * pageNumber);
    const params = onlyFollowed ? [email, String(limit)] : [String(limit)];
    const [result] = yield (connection === null || connection === void 0 ? void 0 : connection.execute(getQuerySql(filterDate, onlyFollowed, offset), params));
    return result;
});
exports.queryVacations = queryVacations;
const getFilterDateCondition = (filterDate) => {
    if (filterDate == "PAST" /* FilterDate.Past */) {
        return 'v.end_date < CURDATE()';
    }
    else if (filterDate == "UPCOMING" /* FilterDate.Upcoming */) {
        return 'v.start_date > CURDATE()';
    }
    else if (filterDate == "ACTIVE" /* FilterDate.Active */) {
        return 'v.end_date >= CURDATE() AND v.start_date <= CURDATE()';
    }
    else {
        return 'true';
    }
};
const getFollowedCondition = (onlyFollowed) => {
    if (onlyFollowed) {
        return `JOIN northwind.followers as f1 ON v.id = f1.vacation_id AND f1.user_email = ?`;
    }
    else {
        return '';
    }
};
const getQuerySql = (filterDate, onlyFollowed, offset) => {
    return `SELECT 
    v.id, v.destination, v.description, v.start_date, v.end_date, v.image, c.count, COUNT(*) OVER() as total 
    FROM northwind.vacations as v
    ${getFollowedCondition(onlyFollowed)}
    LEFT JOIN 
    (
        SELECT f2.vacation_id, COUNT(f2.user_email) as count FROM northwind.followers as f2 GROUP BY f2.vacation_id
    )
    as c ON c.vacation_id = v.id
    WHERE ${getFilterDateCondition(filterDate)}
    ORDER BY v.start_date ASC
    LIMIT ?
    OFFSET ${offset}`;
};
