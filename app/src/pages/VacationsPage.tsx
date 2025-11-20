import { queryVacations } from "@/services/queryVacations";
import { Vacation } from "@/types";
import { useEffect, useState } from "react";
import { VacationCard } from "./VacationCard";
import Box from "@mui/joy/Box";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import { FilterDate, Filters } from "@/types";



export const VacationsPage = () => {
    const [vacations, setVacations] = useState<Array<Vacation>>([]);
    const [filter, setFilter] = useState<FilterDate>(FilterDate.All);
    useEffect(() => {
        queryVacations({date: filter}).then(response => {
            setVacations(response.list);
        });
    }, [filter]);

    return <div>
        <h1>Vacations!!!</h1>

        <Box sx={{ mb: 3 }}>
            <RadioGroup
                value={filter}
                onChange={(e) => setFilter(e.target.value as FilterDate)}
            >
                <Radio value={FilterDate.All} label="All vacations" />
                <Radio value={FilterDate.Past} label="Only past vacations" />
                <Radio value={FilterDate.Upcoming} label="Only upcoming vacations" />
                <Radio value={FilterDate.Active} label="Only active vacations" />
            </RadioGroup>
        </Box>

        <ul>
            {vacations.map(vacation => (
                <VacationCard key={vacation.id} vacation={vacation} managedMode={false} />
            ))}
        </ul>
    </div>;
}