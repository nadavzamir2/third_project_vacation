import { useEffect, useState } from "react";
import { hasOnlyEnglishLetters, noForeignLetters } from "@/utils/latinLetters";

export const useFirstNameField = (initialValue: string) => {
    const [firstName, setFirstName] = useState(initialValue);
    const [firstNameError, setFirstNameError] = useState<string | null>(null);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        if (!isDirty) { 
            setFirstNameError(null); 
            return;
        }
        if (!hasOnlyEnglishLetters(firstName)) {
            setFirstNameError("First name cannot contain foreign letters");
        }
        if (firstName.length > 20) {
            setFirstNameError("First name length cannot exceed 20 characters");
        } else if (firstName.length === 0) {
            setFirstNameError("First name is required");
        } else {
            setFirstNameError(null);
        }
    }, [firstName]);

    const onFirstNameChange = (value: string) => {
        setIsDirty(true);
        setFirstName(value);
    }

    return { firstName, onFirstNameChange, firstNameError };
}