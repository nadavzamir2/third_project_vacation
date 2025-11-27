import { User } from "../types";
import { getConnection } from ".";

export const logInUser = async (email: string, password: string): Promise<User | null> => {
    const connection = await getConnection();
    const [rows]: any = await connection!.execute(logInUserQuery(), [email, password]);
    if (rows.length === 0) {
        return null;
    }
    const user: User = {
        firstName: rows[0].first_name,
        lastName: rows[0].last_name,
        email: rows[0].email,
        role: rows[0].role,
    };
    return user;
}

const logInUserQuery = () => {
    const query = `SELECT first_name, last_name, email, role FROM northwind.users
                   WHERE email = ? AND password = ?`;
    return query;
}