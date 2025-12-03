import mysql2 from "mysql2/promise";
let retriesConnections = 5;
let numberOfRetry = 0;
let pool: mysql2.Pool | undefined;

export async function getConnection(): Promise<mysql2.Pool | undefined> {
    // Return existing pool if already created
    if (pool) {
        return pool;
    }

    try {
        pool = mysql2.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            port: Number(process.env.DB_PORT) || 3306,
            connectionLimit: 10,
        });
        const conn = await pool.getConnection();
        await conn.ping();
        conn.release(); // Important: release connection back to pool
        console.log('✅ MySQL pool connected successfully.');
        return pool;
    } catch (error) {
        await new Promise(resolve => setTimeout(resolve, 10_000));
        if (numberOfRetry !== retriesConnections) {
            numberOfRetry++;
            console.log(`🔄 Retrying MySQL connection... (${numberOfRetry}/${retriesConnections})`);
            return getConnection();
        } else {
            console.error('❌ Failed to connect to MySQL after retries:', error);
            process.exit(1);
        }
    }
}
