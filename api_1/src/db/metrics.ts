import { getConnection } from ".";

type VacationMetric = {
    id: number;
    destination: string;
    followersCount: number;
}


export const queryMetrics = async () => {
    const connection = await getConnection();
    if (!connection) {
        throw new Error("Database connection failed");
    }
    const [result] = await connection.execute(getMetricsQuery());
    return result as VacationMetric[];
}

export const getMetricsQuery = () => {
    const query = `SELECT v.id as id, v.destination, COUNT(f.user_email) as followersCount
                    FROM northwind.vacations as v
                    LEFT JOIN northwind.followers as f ON f.vacation_id = v.id
                    GROUP BY v.id`;
    return query;
}
