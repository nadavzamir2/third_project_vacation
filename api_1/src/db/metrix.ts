import { getConnection } from "./";
import { Vacation } from "../types";
import { fromVacationDTO } from "../mappers";
import { getVacation } from "./";
import { Connection } from "mysql2/typings/mysql/lib/Connection";
import { on } from "events";

export const metrix = async () => {
    const connection = await getConnection();
    if (!connection) {
        throw new Error("Database connection failed");
    }
    const [result] = await connection.execute(getMetrixQuery());
    return result;
}

export const getMetrixQuery = () => {
    const query = `SELECT v.id as vacation_id, v.destination, COUNT(f.user_email) as followersCount
                    FROM northwind.vacations as v
                    LEFT JOIN northwind.followers as f ON f.vacation_id = v.id
                    GROUP BY v.id`;
    return query;
}
