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
// import { deleteFollowerEndpoint } from "./endpoints/delete.follower";
// import { getFollowedVacationsEndpoint } from "./endpoints/get.followed.vacations";
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.get("/hello", (req, res, next) => {
    res.send("Hello World!");
});
app.get("/vacation", get_vacation_1.getVacationEndpoint);
app.post("/vacation", post_vacation_1.postVacationEndpoint);
app.delete("/vacation", delete_vacation_1.deleteVacationEndpoint);
app.put("/vacation", put_vacation_1.putVacationEndpoint);
app.post("/vacation/follow", post_follow_1.postFollowEndpoint);
app.post("/vacation/unfollow", post_unfollow_1.unFollowEndpoint);
app.post("/vacations", post_vacations_1.postQueryVacationsEndpoint);
app.post("/register", register_1.registerEndpoint);
app.post("/user/login", post_login_1.postLoginEndpoint);
// app.get("/vacation/followed", getFollowedVacationsEndpoint);
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
