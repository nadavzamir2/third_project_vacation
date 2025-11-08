import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import path from "path";
import logger from "./logger";
import en from "zod/v4/locales/en.cjs";
import { postVacationEndpoint } from "./endpoints/post.vacation";
import { getVacationEndpoint } from "./endpoints/get.vacation";
import { deleteVacationEndpoint } from "./endpoints/delete.vacation";
import { putVacationEndpoint } from "./endpoints/put.vacation";
import { postFollowEndpoint } from "./endpoints/post.follow";
import { unFollowEndpoint } from "./endpoints/post.unfollow";
import { postQueryVacationsEndpoint } from "./endpoints/post.vacations";
// import { deleteFollowerEndpoint } from "./endpoints/delete.follower";
// import { getFollowedVacationsEndpoint } from "./endpoints/get.followed.vacations";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

app.get("/hello", (req, res, next) => {
    res.send("Hello World!");
});
app.get("/vacation", getVacationEndpoint);
app.post("/vacation", postVacationEndpoint);
app.delete("/vacation", deleteVacationEndpoint);
app.put("/vacation", putVacationEndpoint);
app.post("/vacation/follow", postFollowEndpoint);
app.post("/vacation/unfollow", unFollowEndpoint);
app.post("/vacations", postQueryVacationsEndpoint);
// app.get("/vacation/followed", getFollowedVacationsEndpoint);
app.listen(PORT, (err) => {
    if (err) {
        console.log(`\x1b[31m${err.message}\x1b[0m`);
        logger.error(`Api is running on port ${PORT}!!!`);
    } else {
        logger.info(`Api is running on port ${PORT}!!!`);
        console.log(`Api is running on port ${PORT}`);
    }
});
