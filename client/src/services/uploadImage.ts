import api from "./api";

export const uploadImage = async (image: File) => { 
    const formData = new FormData();
    formData.append("image", image);
    const result = await api.post("/upload-image", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return result.data.fileName;
}