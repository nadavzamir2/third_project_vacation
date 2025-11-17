import { Vacation } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const VacationCard = ({vacation}: {vacation: Vacation}) => {
    const [count, setCount] = useState(vacation.count);
    const navigate = useNavigate(); 
    useEffect(() => {
        if (count > 10) {
            navigate("/edit/" + vacation.id, { replace: true });
        }
    }, [count]);
    
    return (
        <div>
            <h2>Vacation Card</h2>
            <p>Destination: {vacation.destination}</p>
            <p>Price: {vacation.price}</p>
            <p>Start Date: {vacation.startDate}</p>
            <p>End Date: {vacation.endDate}</p>
            <p>Followers: {count}</p>
            <button onClick={() => setCount(count + 1)}>({vacation.count}) Follow</button>
        </div>
    );
}