import { getConnection } from ".";
import { Vacation } from "../types";
import { fromVacationDTO } from "../mappers";
import { getVacation } from ".";
import { Connection } from "mysql2/typings/mysql/lib/Connection";


export const queryMetrics = async () => {
    const connection = await getConnection();
    if (!connection) {
        throw new Error("Database connection failed");
    }
    const [result] = await connection.execute(getMetricsQuery());
    return result;
}

export const getMetricsQuery = () => {
    const query = `SELECT v.id as id, v.destination, COUNT(f.user_email) as followersCount
                    FROM northwind.vacations as v
                    LEFT JOIN northwind.followers as f ON f.vacation_id = v.id
                    GROUP BY v.id`;
    return query;
}
