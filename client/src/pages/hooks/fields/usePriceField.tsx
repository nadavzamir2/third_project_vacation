import { useEffect, useState } from "react";

export const usePriceField = (initialValue: number) => {
    const [price, setPrice] = useState(initialValue);
    const [priceError, setPriceError] = useState<string | null>(null);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        if (!isDirty) { 
            setPriceError(null); 
            return;
        }
        if (price < 0) {
            setPriceError("Price cannot be negative");
         } else if (isNaN(price)) {
            setPriceError("Price must be a number");
           }  else if (price > 10000) {
            setPriceError("Price cannot exceed 10,000");
        } else {
            setPriceError(null);
        }
    }, [price, isDirty]);   
    const onPriceChange = (newValue: number) => {
        setIsDirty(true);
        setPrice(newValue);
    }

    return { price, onPriceChange, priceError };
}