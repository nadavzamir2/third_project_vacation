import { queryVacations } from "@/services/queryVacations";
import { Vacation } from "@/types";
import { useEffect, useState } from "react";
import { VacationCard } from "../components/VacationCard";

export const ManageVacationsPage = () => {
    const [vacations, setVacations] = useState<Array<Vacation>>([]);
    const [invalidationCounter, setInvalidationCounter] = useState(0);
    useEffect(() => {
        queryVacations(undefined, 1000, 0).then(response => {
            setVacations(response.list);
        });
    }, [invalidationCounter]);

    const invalidateData = () => {
        setInvalidationCounter(prev => prev + 1);
    }

    return <div>
        <h1>Manage Vacations</h1>
        <ul>
            {vacations.map(vacation => (
                <VacationCard key={vacation.id} vacation={vacation} managedMode={true} invalidateData={invalidateData} />
            ))}
        </ul>
    </div>;
}