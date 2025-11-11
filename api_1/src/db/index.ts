import mysql2 from "mysql2/promise";
let retriesConnections = 5;
let numberOfRetry = 0;
export async function getConnection(): Promise<mysql2.Pool | undefined> {
    try {
        const connections = await mysql2.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            port: Number(process.env.DB_PORT) || 3306,
            connectionLimit: 10,
        });
        const g = await connections.getConnection();
        await g.ping();
        console.log('✅ MySQL pool connected successfully.');
        return connections;
    } catch (error) {
        await new Promise(resolve => setTimeout(resolve, 10_000));
        if (numberOfRetry !== retriesConnections) {
            numberOfRetry++;
            console.log(`🔄 Retrying MySQL connection... (${numberOfRetry}/${retriesConnections})`);
            getConnection()
        } else {
            process.exit(1)
        }
        console.log(error)
    }
}

export { addFollower } from "./addFollower";
export { createVacation } from "./createVacation";
export { deleteVacation } from "./deleteVacation";
export { getVacation } from "./getVacation";
export { updateVacation } from "./updateVacation";
export { queryVacations } from "./queryVacations";
export { removeFollower } from "./removeFollower";
export { queryMetrics as metrix } from "./metrics";
export { registerUser } from "./registerUser";

export default getConnection;
