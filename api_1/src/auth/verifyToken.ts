import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Role } from "../types";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const secret = process.env.SECRET as string;
    const authHeader = req.headers["authorization"] as string;
    if (!authHeader) {
        return res.status(401).send("No token provided");
    }
    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).send("Invalid token format");
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
        (req as any).user = decoded as { role: Role; name: string; email: string };
        next();
    } catch (error) {
        return res.status(403).send("Permission Denied");
    }
}