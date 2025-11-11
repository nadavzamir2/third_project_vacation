"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("./logger"));
const post_vacation_1 = require("./endpoints/post.vacation");
const get_vacation_1 = require("./endpoints/get.vacation");
const delete_vacation_1 = require("./endpoints/delete.vacation");
const put_vacation_1 = require("./endpoints/put.vacation");
const post_follow_1 = require("./endpoints/post.follow");
const post_unfollow_1 = require("./endpoints/post.unfollow");
const post_vacations_1 = require("./endpoints/post.vacations");
const register_1 = require("./endpoints/register");
const post_login_1 = require("./endpoints/post.login");
const get_metrics_1 = require("./endpoints/get.metrics");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
const onlyAdmin = (req, res, next) => {
    const role = req.user.role;
    if (role === "ADMIN" /* Role.Admin */) {
        return next();
    }
    else {
        return res.status(403).send("Permission Denied");
    }
};
const onlyUser = (req, res, next) => {
    const role = req.user.role;
    if (role === "USER" /* Role.User */) {
        return next();
    }
    else {
        return res.status(403).send("Permission Denied");
    }
};
const verifyToken = (req, res, next) => {
    const secret = process.env.SECRET;
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).send("No token provided");
    }
    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).send("Invalid token format");
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(403).send("Permission Denied");
    }
};
app.get("/hello", (req, res, next) => {
    res.send("Hello World!");
});
app.get("/vacation", verifyToken, get_vacation_1.getVacationEndpoint);
app.post("/vacation", verifyToken, onlyAdmin, post_vacation_1.postVacationEndpoint);
app.delete("/vacation", verifyToken, onlyAdmin, delete_vacation_1.deleteVacationEndpoint);
app.put("/vacation", verifyToken, onlyAdmin, put_vacation_1.putVacationEndpoint);
app.post("/vacation/follow", verifyToken, onlyUser, post_follow_1.postFollowEndpoint);
app.post("/vacation/unfollow", verifyToken, onlyUser, post_unfollow_1.unFollowEndpoint);
app.post("/vacations", verifyToken, onlyAdmin, post_vacations_1.postQueryVacationsEndpoint);
app.post("/register", register_1.registerEndpoint);
app.post("/login", post_login_1.postLoginEndpoint);
app.get("/metrics", verifyToken, onlyAdmin, get_metrics_1.getMetricsEndpoint);
app.listen(PORT, (err) => {
    if (err) {
        console.log(`\x1b[31m${err.message}\x1b[0m`);
        logger_1.default.error(`Api is running on port ${PORT}!!!`);
    }
    else {
        logger_1.default.info(`Api is running on port ${PORT}!!!`);
        console.log(`Api is running on port ${PORT}`);
    }
});
