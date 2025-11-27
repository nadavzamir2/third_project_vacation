import { Request, Response } from "express";
import { logInUser } from "../db/logInUser";
import jwt from "jsonwebtoken";
import { User } from "../types";

const createToken = (user: User) => {
    const secret = process.env.SECRET as string;
    const payload = {
        name: user.firstName,
        email: user.email,
        role: user.role
    };
    const token = jwt.sign(payload, secret, { expiresIn: '5h' });
    return token;
}

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

    const token = createToken(user);

    res.status(200).send({ token, user });
}

