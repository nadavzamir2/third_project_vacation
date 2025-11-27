import { useEffect, useState } from "react";

export const useEndDateField = (initialValue: string, startDateStr: string) => {
    const [endDateStr, setEndDate] = useState(initialValue);
    const [endDateError, setEndDateError] = useState<string | null>(null);
    const [isDirty, setIsDirty] = useState(false);  

    useEffect(() => {
        if (!isDirty) { 
            setEndDateError(null); 
            return;
        }
        const endDate = new Date(endDateStr);
        const startDate = new Date(startDateStr);
        const now = new Date();
        if (isNaN(endDate.getTime())) {
            setEndDateError("End date is invalid");
        } else if (endDate < now) {
            setEndDateError("End date cannot be in the past");
        } else if (endDate <= startDate) {
            setEndDateError("End date must be after start date");
        } else {
            setEndDateError(null);
        }
    }, [endDateStr, startDateStr]);

    const onEndDateChange = (newValue: string) => {
        setIsDirty(true);
        setEndDate(newValue);
    }

    return { endDate: endDateStr, onEndDateChange, endDateError };
}   