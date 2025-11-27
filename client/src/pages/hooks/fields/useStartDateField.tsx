import { useState, useEffect } from "react";

export const useStartDateField = (initialValue: string) => {
    const [startDate, setStartDate] = useState(initialValue);
    const [startDateError, setStartDateError] = useState<string | null>(null);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        if (!isDirty) { 
            setStartDateError(null); 
            return;
        }
        const date = new Date(startDate);
        const now = new Date();
        if (isNaN(date.getTime())) {
            setStartDateError("Start date is invalid");
        } else if (date < now) {
            setStartDateError("Start date cannot be in the past");
        } else {
            setStartDateError(null);
        }
    }, [startDate]);
    const onStartDateChange = (newValue: string) => {
        setIsDirty(true);
        setStartDate(newValue);
    }

    return { startDate, onStartDateChange, startDateError };
}