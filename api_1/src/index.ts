import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import logger from "./logger";
import { postVacationEndpoint } from "./endpoints/post.vacation";
import { getVacationEndpoint } from "./endpoints/get.vacation";
import { deleteVacationEndpoint } from "./endpoints/delete.vacation";
import { putVacationEndpoint } from "./endpoints/put.vacation";
import { postFollowEndpoint } from "./endpoints/post.follow";
import { unFollowEndpoint } from "./endpoints/post.unfollow";
import { postQueryVacationsEndpoint } from "./endpoints/post.vacations";
import { registerEndpoint } from "./endpoints/register";
import { postLoginEndpoint } from "./endpoints/post.login";
import { getMetricsEndpoint as getMetricsEndpoint } from "./endpoints/get.metrics";
import { Role } from "./types";
import jwt from "jsonwebtoken";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const onlyAdmin = (req: Request, res: Response, next: NextFunction) => {
    const role = (req as any).user.role;
    if (role === Role.Admin) {
        return next();
    } else {
        return res.status(403).send("Permission Denied");
    }
}
const onlyUser = (req: Request, res: Response, next: NextFunction) => {
    const role = (req as any).user.role;
    if (role === Role.User) {
        return next();
    } else {
        return res.status(403).send("Permission Denied");
    }
}


const verifyToken = (req: Request, res: Response, next: NextFunction) => {
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



app.get("/hello", (req, res, next) => {
    res.send("Hello World!");
});
app.get("/vacation", verifyToken, getVacationEndpoint);
app.post("/vacation", verifyToken, onlyAdmin, postVacationEndpoint);
app.delete("/vacation", verifyToken, onlyAdmin, deleteVacationEndpoint);
app.put("/vacation", verifyToken, onlyAdmin, putVacationEndpoint);
app.post("/vacation/follow", verifyToken, onlyUser, postFollowEndpoint);
app.post("/vacation/unfollow", verifyToken, onlyUser, unFollowEndpoint);
app.post("/vacations", verifyToken, onlyAdmin, postQueryVacationsEndpoint);
app.post("/register", registerEndpoint);
app.post("/login", postLoginEndpoint);
app.get("/metrics", verifyToken, onlyAdmin, getMetricsEndpoint);

app.listen(PORT, (err) => {
    if (err) {
        console.log(`\x1b[31m${err.message}\x1b[0m`);
        logger.error(`Api is running on port ${PORT}!!!`);
    } else {
        logger.info(`Api is running on port ${PORT}!!!`);
        console.log(`Api is running on port ${PORT}`);
    }
});
