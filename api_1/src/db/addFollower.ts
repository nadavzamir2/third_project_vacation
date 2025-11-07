import { getConnection } from ".";

export const addFollower = async (userEmail: string, vacationId: number): Promise<boolean> => {
    const connection = await getConnection();
    const [result]: any = await connection!.execute(insertFollowerQuery(), [
        userEmail,
        vacationId
    ]);
    return result.affectedRows > 0;
}

const insertFollowerQuery = () => {
    const query = `INSERT INTO northwind.followers (user_email, vacation_id) 
                   VALUES (?, ?)`;
    return query;
}
