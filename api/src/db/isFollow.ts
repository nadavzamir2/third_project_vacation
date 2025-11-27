import getConnection from ".";

export const isFollow = async (email: string, vacationId: number): Promise<boolean> => {
    const connection = await getConnection();
    const [rows]: any = await connection!.execute("SELECT * FROM northwind.followers WHERE user_email = ? AND vacation_id = ?", [email, vacationId]);
    return rows.length > 0;
}