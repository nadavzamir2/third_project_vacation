import api from "./api";

export const uploadImage = async (image: File) => { 
    const result = await api.post("/upload-image", {image});
    return result.data.fileName;
}