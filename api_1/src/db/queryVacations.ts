import { string } from "zod";
import { getConnection } from "./";
import { FilterDate } from "../types";


export const queryVacations = async (limit: number, pageNumber: number, onlyFollowed: boolean, filterDate: FilterDate, email: string) => {
    const connection = await getConnection();
    const offset = String(limit * pageNumber);
    const params = onlyFollowed ? [email, String(limit)] : [String(limit)];
    const [result]: any = await connection?.execute(getQuerySql(filterDate, onlyFollowed, offset), params);
    return result;
}

const getFilterDateCondition = (filterDate: FilterDate) => {
    if (filterDate == FilterDate.Past) {
        return 'v.end_date < CURDATE()';
    } else if (filterDate == FilterDate.Upcoming) {
        return 'v.start_date > CURDATE()';
    } else if (filterDate == FilterDate.Active) {
        return 'v.end_date >= CURDATE() AND v.start_date <= CURDATE()';
    } else {
        return 'true';
    }
}

const getFollowedCondition = (onlyFollowed: boolean) => {
    if (onlyFollowed) {
        return `JOIN northwind.followers as f1 ON v.id = f1.vacation_id AND f1.user_email = ?`;
    } else {
        return '';
    }
}

const getQuerySql = (filterDate: FilterDate, onlyFollowed: boolean, offset: string) => {
    return `SELECT 
    v.id, v.destination, v.description, v.start_date, v.end_date, v.price, v.image, c.count, COUNT(*) OVER() as total 
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
}