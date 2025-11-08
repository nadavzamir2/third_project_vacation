import {getConnection} from "./";
import { User } from "../types";


export const registerUser = async (user: User) => {
    const connection = await getConnection();
    const result = connection?.execute(registerUserQuery(), [
        user.firstName,
        user.lastName,
        user.email,
        user.password,
    ]);
     return result;
}

const registerUserQuery = () => {
    const query = `INSERT INTO northwind.users (first_name, last_name, email, password)
                   VALUES (?, ?, ?, ?)`;
    return query;
}   
