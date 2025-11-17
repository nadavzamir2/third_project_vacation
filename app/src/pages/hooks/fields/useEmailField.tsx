import { useEffect, useState } from "react";

export const useEmailField = (initialValue: string) => {
    const [email, setEmail] = useState(initialValue);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        if (!isDirty) { 
            setEmailError(null); 
            return;
        }
        if (email.length > 30) {
            setEmailError("Email length cannot exceed 30 characters");
        } else if (email.length === 0) {
            setEmailError("Email is required");
        } else if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
            setEmailError("Invalid email format");
        } else {
            setEmailError(null);
        }
    }, [email]);

    const onEmailChange = (value: string) => {
        setIsDirty(true);
        setEmail(value);
    }

    return { email, onEmailChange, emailError };
}