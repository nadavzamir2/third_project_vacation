import { useEffect, useState } from "react";

export const useImageField = (initialValue: string) => {
    const [image, setImage] = useState<string | null>(initialValue);
    const [imageError, setImageError] = useState<string | null>(null);
    const [isDirty, setIsDirty] = useState(false);
    useEffect(() => {
        if (!isDirty) {
            setImageError(null);
            return;
        }
        if (image === null || image.length === 0 || typeof image !== 'string') {
            setImageError("Image is required");
        } else if (!/\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(image)) {
            setImageError("Image URL must be a valid URL ending with an image extension");
        } else {
            setImageError(null);
        }
    }, [image, isDirty]);

    const onImageChange = (value: string | null) => {
        console.log("onImageChange called with:", value);
        setIsDirty(true);
        setImage(value);
    }

    return { image, onImageChange, imageError, setImageError };
}