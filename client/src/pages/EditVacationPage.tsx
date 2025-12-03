import { useEffect, useState } from "react";
import axios from "axios";
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
import { ImageInput } from "@/components/ImageInput";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export const EditVacationPage = () => {
    const [vacation, setVacation] = useState<Vacation | null>(null);
    const { id } = useParams<{ id: string }>();
    const [isLoading, setIsLoading] = useState(true);
    const { destination, onDestinationChange, destinationError } = useDestinationField("")
    const { description, onDescriptionChange, descriptionError } = useDescriptionField("");
    const { startDate, onStartDateChange, startDateError } = useStartDateField("");
    const { endDate, onEndDateChange, endDateError } = useEndDateField("", startDate);
    const { price, onPriceChange, priceError } = usePriceField(0);
    const { image, onImageChange, imageError, setImageError } = useImageField(null);
    const isDisabled = destinationError || descriptionError || startDateError || endDateError || priceError || imageError ? true : false;

    const navigate = useNavigate();
    const correctFormatDate = (date: string) => {
        const [year, month, day] = date.split("-");
        return `${day}-${month}-${year}`;
    }


    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isDisabled) {
            return;
        }
        try {
            const result = await updateVacation(Number(id), {
                destination,
                description,
                startDate: correctFormatDate(startDate),
                endDate: correctFormatDate(endDate),
                price,
                image: image!,
            });
            navigate({ pathname: "/manage" });
        } catch (err) {
            console.error("Failed to update vacation", err);
        }
    };

    useEffect(() => {
        if (id) {
            getVacationById(id).then((vacation: Vacation) => {
                setVacation(vacation);
                setIsLoading(false);
                onDestinationChange(vacation.destination);
                onDescriptionChange(vacation.description);
                onStartDateChange(new Date(vacation.startDate).toISOString().split('T')[0]);
                onEndDateChange(new Date(vacation.endDate).toISOString().split('T')[0]);
                onPriceChange(vacation.price);
                onImageChange(vacation.image);
            });
        }
    }, [id]);
    if (isLoading || !vacation) {
        return <div>Loading...</div>;
    }
    return (<div className="edit-vacation-page">
        <h1>Edit Vacation {destination} {id}</h1>
        <form onSubmit={onSubmit}>
            <label>Deatination
                <input type="text" value={destination} onChange={(e) => { onDestinationChange(e.target.value) }}></input>
            </label>
            {destinationError && (<div className="error">{destinationError}</div>)}
            <label>Description
                <input type="text" value={description} onChange={(e) => { onDescriptionChange(e.target.value) }}></input>
            </label>
            {descriptionError && (<div className="error">{descriptionError}</div>)}
            <label>Start Date
                <div style={{ position: 'relative', display: 'block', width: '100%' }}>
                    <CalendarMonthIcon
                        onClick={(e) => { const input = e.currentTarget.nextElementSibling as HTMLInputElement; input?.showPicker?.(); }}
                        style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#666', pointerEvents: 'auto', zIndex: 1, marginTop: '-5px' }}
                    />
                    <input type="date" value={startDate} onChange={(e) => { onStartDateChange(e.target.value) }} style={{ paddingLeft: '45px', width: '100%' }}></input>
                </div>
            </label>
            {startDateError && (<div className="error">{startDateError}</div>)}
            <label>End Date
                <div style={{ position: 'relative', display: 'block', width: '100%' }}>
                    <CalendarMonthIcon
                        onClick={(e) => { const input = e.currentTarget.nextElementSibling as HTMLInputElement; input?.showPicker?.(); }}
                        style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#666', pointerEvents: 'auto', zIndex: 1, marginTop: '-5px' }}
                    />
                    <input type="date" value={endDate} onChange={(e) => { onEndDateChange(e.target.value) }} style={{ paddingLeft: '45px', width: '100%' }}></input>
                </div>
            </label>
            {endDateError && (<div className="error">{endDateError}</div>)}
            <label>Price
                <input type="number" value={price} onChange={(e) => { onPriceChange(Number(e.target.value)) }}></input>
            </label>
            {priceError && (<div className="error">{priceError}</div>)}
            <ImageInput imageFileName={image} imageError={imageError} setImageError={setImageError} setImageFileName={onImageChange} />
            <button className="btn signin-btn" type="submit" disabled={isDisabled}>Edit Vacation</button>
        </form>
    </div>
    )
}
