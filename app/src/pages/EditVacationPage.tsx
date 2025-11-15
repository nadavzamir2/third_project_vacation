import { getVacationById } from "@/services/getVacationById";
import { Vacation } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

export const EditVacationPage = () => {
    const { id } = useParams<{ id: string }>();
    const [vacation, setVacation] = useState<Vacation | null>(null);
    useEffect(() => {
            if (id) {
        getVacationById(id).then((response: Vacation) => {
            setVacation(response);
                    });
            }
    }, [id]);
    return <div>
        <h1>Edit Vacation</h1>
        {vacation ? (
            <div>
                <h2>{vacation.destination}</h2>
                <p>{vacation.description}</p>
                <p>From: {new Date(vacation.startDate).toLocaleDateString()}</p>
                <p>To: {new Date(vacation.endDate).toLocaleDateString()}</p>
                <p>Price: ${vacation.price}</p>
                <img src={vacation.image} alt={vacation.destination} width="300" />

            </div>
        ) : (
            <p>Loading...</p>
        )}
    </div>;
}