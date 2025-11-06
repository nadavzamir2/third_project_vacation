import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import path from "path";
import logger from "./logger";
import en from "zod/v4/locales/en.cjs";
import { postVacationEndpoint } from "./endpoints/post.vacation";
import { getVacationEndpoint } from "./endpoints/get.vacation";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

app.get("/hello", (req, res, next) => {
    res.send("Hello World!");
});
app.get("/vacation", getVacationEndpoint);
app.post("/vacation", postVacationEndpoint);
app.listen(PORT, (err) => {
    if (err) {
        console.log(`\x1b[31m${err.message}\x1b[0m`);
        logger.error(`Api is running on port ${PORT}!!!`);
    } else {
        logger.info(`Api is running on port ${PORT}!!!`);
        console.log(`Api is running on port ${PORT}`);
    }
});
