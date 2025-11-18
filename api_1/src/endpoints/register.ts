import { Request, Response } from "express";
import { hasOnlyEnglishLetters, noForeignLetters } from "../utils/latinLetters";
import { registerUser } from "../db/registerUser";
import { getConnection } from "../db";
import { email } from "zod";

export const registerEndpoint = async (req: Request, res: Response) => {
    const body = req.body;
    const firstName = body.firstName;
    const lastName = body.lastName;
    const email = body.email;
    const password = body.password;

    if (typeof firstName !== "string" || firstName.trim().length === 0) {
        return res.status(400).send("Invalid firstName");
    }
    if (firstName.length > 20) {
        return res.status(400).send("firstName must be at most 20 characters");
    }
    if (!hasOnlyEnglishLetters(firstName)) {
        return res.status(400).send("firstName must contain only English letters");
    }

    if (typeof lastName !== "string" || lastName.trim().length === 0) {
        return res.status(400).send("Invalid lastName");
    }
    if (lastName.length > 20) {
        return res.status(400).send("lastName must be at most 20 characters");
    }
    if (!hasOnlyEnglishLetters(lastName)) {
        return res.status(400).send("lastName must contain only English letters");
    }
    if (typeof email !== "string" || email.trim().length === 0) {
        return res.status(400).send("Invalid email");
    }
    if (!noForeignLetters(email)) {
        return res.status(400).send("Forign letters are not allowed in email");
    }
    if (email.length > 30) {
        return res.status(400).send("email must be at most 30 characters");
    }
    if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
        return res.status(400).send("Invalid email format");
    }
    if (await !uniqueEmail(email)) {
        return res.status(400).send("Email already exists");
    }
    if (password.length < 5) {
        return res.status(400).send("Password too short(minimum 5 letters)");
    }
    if (password.length > 20) {
        return res.status(400).send("Password too long (maximum 20 letters)");
    }
    if (!noForeignLetters(password)) {
        return res.status(400).send("Forign letters are not allowed in password");
    }
    else {
        const result = await registerUser({
            firstName,
            lastName,
            email,
            password
        });
        if (result) {
            return res.status(200).json({
                user: {
                    email,
                    firstName,
                    lastName,
                    role: 'USER'
                }
            });
        } else {
            return res.status(500).send("Internal Server Error");
        }
    }
}
export const uniqueEmail = async (email: string) => {
    const connection = await getConnection();
    const [result]: any = await connection!.execute(checkEmailQuery(), [email]);
    return result.length === 0;
}

const checkEmailQuery = () => {
    const query = `SELECT * FROM northwind.users WHERE email = ?`;
    return query;
}

