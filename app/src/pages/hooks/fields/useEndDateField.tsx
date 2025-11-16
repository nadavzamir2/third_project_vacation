import { useEffect, useState } from "react";

export const useEndDateField = (initialValue: string) => {
    const [endDate, setEndDate] = useState(initialValue);
    const [endDateError, setEndDateError] = useState<string | null>(null);
    const [isDirty, setIsDirty] = useState(false);  

    useEffect(() => {
        if (!isDirty) { 
            setEndDateError(null); 
            return;
        }
        const date = new Date(endDate);
        const now = new Date();
        if (isNaN(date.getTime())) {
            setEndDateError("End date is invalid");
        } else if (date < now) {
            setEndDateError("End date cannot be in the past");
        } else {
            setEndDateError(null);
        }
    }, [endDate]);

    const onEndDateChange = (newValue: string) => {
        setIsDirty(true);
        setEndDate(newValue);
    }

    return { endDate, onEndDateChange, endDateError };
}   