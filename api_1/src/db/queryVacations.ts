import { string } from "zod";
import {getConnection} from "./";
import { FilterDate } from "../types";


export const queryVacations = async (limit: number, pageNumber: number, onlyFollowed: boolean, filterDate: FilterDate, email: string) => {
    const connection =  await getConnection();
    const offset = String(limit * pageNumber);
    const [result]: any = await connection?.execute(getQuerySql(filterDate, onlyFollowed, offset), [String(limit), email]);
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
        return `JOIN northwind.followers as f ON v.id = f.vacation_id AND f.user_email = ?`;
    } else {
        return '';
    }
}

const getQuerySql = (filterDate: FilterDate, onlyFollowed: boolean, offset: string) => {
    return `SELECT v.id, v.destination, v.description, v.start_date, v.end_date, v.image FROM northwind.vacations as v
    WHERE ${getFilterDateCondition(filterDate)} ${getFollowedCondition(onlyFollowed)}
    LIMIT ?
    OFFSET ${offset}`;
}