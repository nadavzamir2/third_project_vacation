import { getConnection } from ".";

export const exportVacations = async () => {
    const connection = await getConnection();
    const [result]: any = await connection?.execute(`
        SELECT 
            v.id, 
            v.destination, 
            v.description, 
            v.start_date, 
            v.end_date, 
            v.price, 
            v.image,
            COALESCE(c.count, 0) as followers_count
        FROM northwind.vacations as v
        LEFT JOIN 
        (
            SELECT f.vacation_id, COUNT(f.user_email) as count 
            FROM northwind.followers as f 
            GROUP BY f.vacation_id
        ) as c ON c.vacation_id = v.id
        ORDER BY v.start_date ASC
    `);
    return result;
}
