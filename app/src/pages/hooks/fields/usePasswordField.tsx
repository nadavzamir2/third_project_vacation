import { useEffect, useState } from "react";
import { noForeignLetters } from "@/utils/latinLetters";

export const usePasswordField = (initialValue: string) => {
    const [password, setPassword] = useState(initialValue);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        if (!isDirty) { 
            setPasswordError(null); 
            return;
        }
        if (!noForeignLetters(password)) {
            setPasswordError("Password must contain only Latin letters");
        } else if (password.length < 5) {
            setPasswordError("Password length must be at least 5 characters");
        
        } else if (password.length > 20) {
            setPasswordError("Password length cannot exceed 20 characters");
            
        } else if (password.length === 0) {
            setPasswordError("Password is required");
        } else if (!noForeignLetters(password)) {
            setPasswordError("Password must contain only Latin letters");
        } else if (!/[0-9]/.test(password) || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            setPasswordError("Password must contain at least one digit, one uppercase letter, one lowercase letter, and one special character");
        } else {
            setPasswordError(null);
        }
    }, [password]);

    const onPasswordChange = (value: string) => {
        setIsDirty(true);
        setPassword(value);
    }

    return { password, onPasswordChange, passwordError };
}