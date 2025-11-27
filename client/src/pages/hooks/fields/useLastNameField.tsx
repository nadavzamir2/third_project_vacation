import { useEffect, useState } from "react";
import { hasOnlyEnglishLetters, noForeignLetters } from "@/utils/latinLetters";

export const useLastNameField = (initialValue: string) => {
    const [lastName, setLastName] = useState(initialValue);
    const [lastNameError, setLastNameError] = useState<string | null>(null);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        if (!isDirty) { 
            setLastNameError(null); 
            return;
        }
        if (!hasOnlyEnglishLetters(lastName)) {
            setLastNameError("Last name cannot contain foreign letters");
        } else if (lastName.length > 20) {
            setLastNameError("Last name length cannot exceed 20 characters");
        } else if (lastName.length === 0) {
            setLastNameError("Last name is required");
        } else {
            setLastNameError(null);
        }
    }, [lastName]);

    const onLastNameChange = (value: string) => {
        setIsDirty(true);
        setLastName(value);
    }

    return { lastName, onLastNameChange, lastNameError };
}