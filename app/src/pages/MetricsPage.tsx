import { Vacation } from "@/types";
import { useEffect, useState } from "react";

export const MetricsPage = () => {
    const [vacations, setVacations] = useState<Vacation[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
    }, []);

    return (
        <div>
            <h1>Metrics Page</h1>
            {error && <div className="error">{error}</div>}
        </div>
    );
}