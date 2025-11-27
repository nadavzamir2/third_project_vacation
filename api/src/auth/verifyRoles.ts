import { Request, Response, NextFunction } from "express";
import { Role } from "../types";

export const onlyAdmin = (req: Request, res: Response, next: NextFunction) => {
    const role = (req as any).user.role;
    if (role === Role.Admin) {
        return next();
    } else {
        return res.status(403).send("Permission Denied");
    }
}

export const onlyUser = (req: Request, res: Response, next: NextFunction) => {
    const role = (req as any).user.role;
    if (role === Role.User) {
        return next();
    } else {
        return res.status(403).send("Permission Denied");
    }
}
