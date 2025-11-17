import { queryVacations } from "@/services/queryVacations";
import { Vacation } from "@/types";
import { useEffect, useState } from "react";
import { VacationCard } from "./VacationCard";

export const ManageVacationsPage = () => {
    const [vacations, setVacations] = useState<Array<Vacation>>([]);
    useEffect(() => {
        queryVacations().then(response => {
            setVacations(response.list);
        });
    }, []);
    return <div>
        <h1>Manage Vacations</h1>
        <ul>
            {vacations.map(vacation => (
                <VacationCard key={vacation.id} vacation={vacation} />
            ))}
        </ul>
        </div>;
}