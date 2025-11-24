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
import { verifyToken } from "./auth/verifyToken";
import { onlyAdmin, onlyUser } from "./auth/verifyRoles";
import cors from "cors";
import path from "path";


dotenv.config();
const app = express();
const imagesPath = path.join(__dirname, "uploads", "images");

const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/images", express.static(imagesPath));


app.get("/hello", (req, res, next) => {
    res.send("Hello World!");
});
app.get("/vacation", verifyToken, getVacationEndpoint);
app.post("/vacation", verifyToken, onlyAdmin, postVacationEndpoint);
app.delete("/vacation", verifyToken, onlyAdmin, deleteVacationEndpoint);
app.put("/vacation", verifyToken, onlyAdmin, putVacationEndpoint);
app.post("/vacation/follow", verifyToken, onlyUser, postFollowEndpoint);
app.post("/vacation/unfollow", verifyToken, onlyUser, unFollowEndpoint);
app.post("/vacations", verifyToken, postQueryVacationsEndpoint);
app.post("/register", registerEndpoint);
app.post("/login", postLoginEndpoint);
app.get("/metrics", verifyToken, onlyAdmin, getMetricsEndpoint);

app.listen(PORT, (err) => {
    if (err) {
        console.log(`\x1b[31m${err.message}\x1b[0m`);
        logger.error(`Api is running on port ${PORT}!!!`);
    } else {
        console.log("Serving images from:", imagesPath);
        logger.info(`Api is running on port ${PORT}!!!`);
        console.log(`Api is running on port ${PORT}`);
    }
});
