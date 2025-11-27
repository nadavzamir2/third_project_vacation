import multer from "multer";
import path from "path";

export const createFileUploader = (imagesPath: string) => {
    const storage = multer.diskStorage(
        {
            destination: imagesPath,
            filename: (req, file, cb) => { cb(null, Date.now() + "-" + file.originalname); }
        });
    const fileUploader = multer({ storage });
    return fileUploader;
}
