import { queryVacations } from "@/services/queryVacations";
import { Vacation } from "@/types";
import { useEffect, useState } from "react";
import { VacationCard } from "../components/VacationCard";
import Box from "@mui/joy/Box";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import { FilterDate } from "@/types";
import { Switch, Typography } from "@mui/joy";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useUser } from "@/context/user.context";

export const VacationsPage = () => {
    const [vacations, setVacations] = useState<Array<Vacation>>([]);
    const { firstName } = useUser();
    const [filter, setFilter] = useState<FilterDate>(FilterDate.All);
    const [onlyFollowed, setOnlyFollowed] = useState(false);
    const [invalidationCounter, setInvalidationCounter] = useState(0);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const limit = 2;


    const invalidateData = () => {
        setInvalidationCounter(prev => prev + 1);
    }

    useEffect(() => {
        queryVacations({ onlyFollowed, filterDate: filter }, limit, currentPage).then(result => {
            setVacations(result.list);
            setTotal(result.total);
        });
    }, [filter, onlyFollowed, invalidationCounter, currentPage]);

    const numberOfpages = Math.ceil(total / limit);
    return <div>
        <h1>{firstName}'s Vacations</h1>

        <Box sx={{ mb: 3, border: '1px solid', borderColor: 'divider', p: 2, borderRadius: '8px', width: 'fit-content' }}>
            <Typography component="label" endDecorator={
                <Switch checked={onlyFollowed} onChange={(e) => setOnlyFollowed(e.target.checked)} sx={{ ml: 1 }} />
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
            <Stack spacing={2}>
                <Pagination color="primary" count={numberOfpages} page={currentPage + 1} onChange={(e, page) => {
                    setCurrentPage(page - 1);
                }} />
            </Stack>

        </Box>

        <ul>
            {vacations.map(vacation => (
                <VacationCard key={vacation.id} vacation={vacation} managedMode={false} invalidateData={invalidateData} />
            ))}
        </ul>
        <Pagination color="primary" count={numberOfpages} page={currentPage + 1} onChange={(e, page) => {
            setCurrentPage(page - 1);
        }} />
    </div>;
}