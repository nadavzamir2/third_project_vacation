import { deleteVacation } from "@/services/deleteVacation";
import { Vacation } from "@/types";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const VacationCard = ({ vacation, managedMode, onDelete }: { vacation: Vacation; managedMode: boolean; onDelete?: (id: number) => void }) => {
    const [counter, setCount] = useState(vacation.count);
    const navigate = useNavigate();
    useEffect(() => {
        if (counter > 10) {
            navigate("/edit/" + vacation.id, { replace: true });
        }
    }, [counter]);
    return (
        <div>
            <h2>Vacation Card</h2>
            <p>Destination: {vacation.destination}</p>
            <p>Price: {vacation.price}</p>
            <p>Start Date: {vacation.startDate}</p>
            <p>End Date: {vacation.endDate}</p>
            <p>Followers: {counter}</p>
            {managedMode ? (<>
            <Link to={`/edit/${vacation.id}`}>Edit</Link>
            <button onClick={() => onDelete?.(vacation.id)}>Delete</button>
            </>)
                : (<button onClick={() => setCount(counter + 1)}>({counter}) Followers</button>)}

        </div>
    );
}