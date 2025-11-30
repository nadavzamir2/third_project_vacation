import express from "express";
import dotenv from "dotenv";
import logger from "./logger";
import cors from "cors";
import path from "path";
import multer from "multer";
import { postVacationEndpoint } from "./endpoints/postVacationEndpoint";
import { getVacationEndpoint } from "./endpoints/getVacationEndpoint";
import { deleteVacationEndpoint } from "./endpoints/deleteVacationEndpoint";
import { putVacationEndpoint } from "./endpoints/putVacationEndpoint";
import { postFollowEndpoint } from "./endpoints/postFollowEndpoint";
import { postUnFollowEndpoint } from "./endpoints/postUnFollowEndpoint";
import { postQueryVacationsEndpoint } from "./endpoints/postQueryVacationsEndpoint";
import { postRegisterEndpoint } from "./endpoints/postRegisterEndpoint";
import { postLoginEndpoint } from "./endpoints/postLoginEndpoint";
import { getMetricsEndpoint as getMetricsEndpoint } from "./endpoints/getMetricsEndpoint";
import { postUploadImageEndpoint } from "./endpoints/postUploadImageEndpoint";
import { getExportCsvEndpoint } from "./endpoints/getExportCsvEndpoint";
import { verifyToken } from "./auth/verifyToken";
import { onlyAdmin, onlyUser } from "./auth/verifyRoles";
import { createFileUploader } from "./utils/storage";

dotenv.config();
const app = express();
const imagesPath = path.join(__dirname, "uploads", "images");
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/images", express.static(imagesPath));
const fileUploader = createFileUploader(imagesPath);
app.get("/hello", (req, res, next) => {
    res.send("Hello World!");
});
app.get("/vacation", verifyToken, getVacationEndpoint);
app.post("/vacation", verifyToken, onlyAdmin, postVacationEndpoint);
app.delete("/vacation", verifyToken, onlyAdmin, deleteVacationEndpoint);
app.put("/vacation", verifyToken, onlyAdmin, putVacationEndpoint);
app.post("/vacation/follow", verifyToken, onlyUser, postFollowEndpoint);
app.post("/vacation/unfollow", verifyToken, onlyUser, postUnFollowEndpoint);
app.post("/vacations", verifyToken, postQueryVacationsEndpoint);
app.post("/register", postRegisterEndpoint);
app.post("/login", postLoginEndpoint);
app.get("/metrics", verifyToken, onlyAdmin, getMetricsEndpoint);
app.get("/vacations/export", verifyToken, onlyAdmin, getExportCsvEndpoint);
app.post("/upload-image", verifyToken, onlyAdmin, fileUploader.single('image'), postUploadImageEndpoint);

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
