import getConnection from "."

export const removeFollower = async (email: string, vacationId: number) => {
    const connection = await getConnection();
    await connection?.execute("DELETE from northwind.followers WHERE user_email = ? AND vacation_id = ?", [email, vacationId]);
    return true;
}