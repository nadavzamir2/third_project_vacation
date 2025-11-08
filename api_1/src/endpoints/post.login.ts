import { Request, Response } from "express";
import { logInUser } from "../db/logInUser";

export const postLoginEndpoint = async (req: Request, res: Response) => {
    const body = req.body;
    const email = body.email;
    const password = body.password;

    if (typeof email !== "string" || email.trim().length === 0) {
        return res.status(400).send("Invalid email");
    }
    if (typeof password !== "string" || password.trim().length === 0) {
        return res.status(400).send("Invalid password");
    }

    const user = await logInUser(email, password);
    if (!user) {
        return res.status(401).send("Invalid email or password");
    }

    res.status(200).send({ message: "Login successful", user });
}

