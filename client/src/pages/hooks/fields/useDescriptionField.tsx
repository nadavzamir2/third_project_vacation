import { useEffect, useState } from "react";

export const useDescriptionField = (initialValue: string) => {
    const [description, setDescription] = useState(initialValue);
    const [descriptionError, setDescriptionError] = useState<string | null>(null);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        if (!isDirty) { 
            setDescriptionError(null); 
            return;
        }
        if (description.length > 250) {
            setDescriptionError("Description length cannot exceed 250 characters");
        } else if (description.length === 0) {
            setDescriptionError("Description is required");
        } else {
            setDescriptionError(null);
        }
    }, [description]);

    const onDescriptionChange = (value: string) => {
        setIsDirty(true);
        setDescription(value);
    }

    return { description, onDescriptionChange, descriptionError };
}