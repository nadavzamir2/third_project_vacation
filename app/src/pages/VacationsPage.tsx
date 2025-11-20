import { queryVacations } from "@/services/queryVacations";
import { Vacation } from "@/types";
import { useEffect, useState } from "react";
import { VacationCard } from "./VacationCard";
import Box from "@mui/joy/Box";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import { FilterDate, Filters } from "@/types";
import { Switch, Typography } from "@mui/joy";

export const VacationsPage = () => {
    const [vacations, setVacations] = useState<Array<Vacation>>([]);
    const [filter, setFilter] = useState<FilterDate>(FilterDate.All);
    const [onlyFollowed, setOnlyFollowed] = useState(true);
    const [invalidationCounter, setInvalidationCounter] = useState(0);

    const invalidateData = () => {
        setInvalidationCounter(prev => prev + 1);
    }

    useEffect(() => {
        queryVacations({ onlyFollowed ,filterDate: filter }).then(response => {
            setVacations(response.list);
        });
    }, [filter, onlyFollowed, invalidationCounter]);

    return <div>
        <h1>Vacations!!!</h1>

        <Box sx={{ mb: 3 }}>

            <Typography component="label" endDecorator={
                <Switch checked={onlyFollowed} onChange={(e) => setOnlyFollowed(e.target.checked)}  sx={{ ml: 1 }} />
                }>
                Is followed By user
            </Typography>
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
                <VacationCard key={vacation.id} vacation={vacation} managedMode={false} invalidateData={invalidateData}/>
            ))}
        </ul>
    </div>;
}