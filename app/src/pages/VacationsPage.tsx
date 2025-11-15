import { queryVacations } from "@/services/queryVacations";
import { Vacation } from "@/types";
import { useEffect, useState } from "react";

export const VacationsPage = () => {
    const [vacations, setVacations] = useState<Array<Vacation>>([]);
    useEffect(() => {
        queryVacations().then(response => {
            setVacations(response.list);
        });
    }, []);
    return <div>
        <h1>Vacations</h1>
        <ul>
            {vacations.map(vacation => (
                <li key={vacation.id}>{vacation.destination}</li>
            ))}
        </ul>
        </div>;
}