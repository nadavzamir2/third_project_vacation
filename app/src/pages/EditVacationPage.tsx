import { useEffect, useState } from "react";
import { useDestinationField } from "./hooks/fields/useDestinationField";
import { updateVacation } from "@/services/updateVacation";
import { useNavigate, useParams } from "react-router-dom";
import { useDescriptionField } from "./hooks/fields/useDescriptionField";
import { useStartDateField } from "./hooks/fields/useStartDateField";
import { useEndDateField } from "./hooks/fields/useEndDateField";
import { usePriceField } from "./hooks/fields/usePriceField";
import { useImageField } from "./hooks/fields/useImageField";
import { getVacationById } from "@/services/getVacationById";
import { Vacation } from "@/types";

export const EditVacationPage = () => {
    const [vacation, setVacation] = useState<Vacation | null>(null);
    const { id } = useParams<{ id: string }>();
    const { destination, onDestinationChange, destinationError } = useDestinationField("")
    const { description, onDescriptionChange, descriptionError } = useDescriptionField("");
    const { startDate, onStartDateChange, startDateError } = useStartDateField("");
    const { endDate, onEndDateChange, endDateError } = useEndDateField("");
    const { price, onPriceChange, priceError } = usePriceField(0);
    const { image, onImageChange, imageError } = useImageField("");

    const navigate = useNavigate();
    const correctFormatDate = (date: string) => {
        const [year, month, day] = date.split("-");
        return `${day}-${month}-${year}`;
    }

    
      const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (destinationError || descriptionError || startDateError || endDateError || priceError || imageError) {
          return;
        }
        try {
          const result = await updateVacation(id, {
            destination,
            description,
            startDate: correctFormatDate(startDate),
            endDate: correctFormatDate(endDate),
            price,
            image,
          });
          navigate({ pathname: "/manage" });
        } catch (err) {
          console.error("Failed to update vacation", err);
        }
      };

    useEffect(() => {
        if (id) {
            getVacationById(id).then((response: Vacation) => {
                setVacation(response);
            });
        }
    }, [id]);
    return (<div className="edit-vacation-page">
        <h1>Edit Vacation {destination} {id}</h1>
        <form onSubmit={onSubmit}>
            <label>Deatination
                <input type="text" value={destination} onChange={(e) => { onDestinationChange(e.target.value) }}></input>
            </label>
            {destinationError && (<div>{destinationError}</div>)}
            <label>Description
                <input type="text" value={description} onChange={(e) => { onDescriptionChange(e.target.value) }}></input>
            </label>
            {descriptionError && (<div>{descriptionError}</div>)}
            <label>Start Date
                <input type="date" value={startDate} onChange={(e) => { onStartDateChange(e.target.value) }}></input>
            </label>
            {startDateError && (<div>{startDateError}</div>)}
            <label>End Date
                <input type="date" value={endDate} onChange={(e) => { onEndDateChange(e.target.value) }}></input>
            </label>
            {endDateError && (<div>{endDateError}</div>)}
            <label>Price
                <input type="number" value={price} onChange={(e) => { onPriceChange(Number(e.target.value)) }}></input>
            </label>
            {priceError && (<div>{priceError}</div>)}
            <label>Image URL
                <input type="text" value={image} onChange={(e) => { onImageChange(e.target.value) }}></input>
            </label>
            {imageError && (<div>{imageError}</div>)}

            <button type="submit">Edit Vacation</button>
        </form>
    </div>
    )
}
