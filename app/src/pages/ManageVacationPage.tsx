import { queryVacations } from "@/services/queryVacations";
import { Vacation } from "@/types";
import { useEffect, useState } from "react";
import { VacationCard } from "./VacationCard";
import { deleteVacation } from "@/services/deleteVacation";

export const ManageVacationsPage = () => {
    const [vacations, setVacations] = useState<Array<Vacation>>([]);
    const [invalidationCounter, setInvalidationCounter] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVacationId, setSelectedVacationId] = useState<number | null>(null);
    useEffect(() => {
        queryVacations().then(response => {
            setVacations(response.list);
        });
    }, [invalidationCounter]);

    const onDelete = async (id: number) => {
        setIsModalOpen(true);
        setSelectedVacationId(id);
    }

    return <div>
        <h1>Manage Vacations</h1>
        <ul>
            {vacations.map(vacation => (
                <VacationCard key={vacation.id} vacation={vacation} managedMode={true} onDelete={onDelete} />
            ))}
        </ul>
        {isModalOpen && (
            <div>
                <span>Are you sure you want to delete {vacations.find((vacation) => vacation.id === selectedVacationId)?.destination}</span>
                <button onClick={async () => {
                    setIsModalOpen(false)
                    await deleteVacation(selectedVacationId!);
                    console.log("Deleted vacation with id:", selectedVacationId);
                    setInvalidationCounter(invalidationCounter + 1);
                }}>Confim</button>
                <button onClick={() => {
                    setIsModalOpen(false)
                }}>Close</button>
            </div>)}
    </div>;
}