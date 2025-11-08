import { string } from "zod";
import {getConnection} from "./";
import { FilterDate } from "../types";


export const queryVacations = async (limit: number, pageNumber: number, onlyFollowed: boolean, filterDate: FilterDate) => {
    const connection =  await getConnection();
    const offest = String(limit * pageNumber);
    const [result]: any = await connection?.execute(getQuerySql(filterDate, offest), [String(limit)]);
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

const getQuerySql = (filterDate: FilterDate, offest: string) => {
    return `SELECT v.id, v.destination, v.description, v.start_date, v.end_date, v.image FROM northwind.vacations as v
    WHERE ${getFilterDateCondition(filterDate)}
    LIMIT ?
    OFFSET ${offest}`;
}