import { useEffect, useState } from "react";

export const useImageField = (initialValue: string) => {
    const [image, setImage] = useState(initialValue);
    const [imageError, setImageError] = useState<string | null>(null);
    const [isDirty, setIsDirty] = useState(false);
    useEffect(() => {
        if (!isDirty) { 
            setImageError(null); 
            return;
        }
        if (image.length === 0) {
            setImageError("Image URL is required");
        } else if ( typeof image !== 'string') {
            setImageError("Image URL must be a string");
        } else if (image.length > 100) {
            setImageError("Image URL length cannot exceed 100 characters");    
        // } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(image)) {
        //     setImageError("Image URL must be a valid URL ending with an image extension");
        } else {
            setImageError(null);
        }
    }, [image, isDirty]);
    
    const onImageChange = (value: string) => {
        setIsDirty(true);
        setImage(value);
    }

    return { image, onImageChange, imageError };
}