import { useEffect, useState } from "react";

export const useDestinationField = (initialValue: string) => {
    const [destination, setDestination] = useState(initialValue);
    const [destinationError, setDestinationError] = useState<string | null>(null);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        if (!isDirty) { 
            setDestinationError(null); 
            return;
        }
        if (destination.length > 20) {
            setDestinationError("Destination length cannot exceed 20 characters");
        } else if (destination.length === 0) {
            setDestinationError("Destination is required");
        } else {
            setDestinationError(null);
        }
    }, [destination]);

    const onDestinationChange = (value: string) => {
        setIsDirty(true);
        setDestination(value);
    }

    return { destination, onDestinationChange, destinationError };
}