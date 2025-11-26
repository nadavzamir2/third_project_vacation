import { queryVacations } from "@/services/queryVacations";
import { Vacation } from "@/types";
import React, { useEffect, useState } from "react";
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

    const resetPagination = () => {
        setCurrentPage(0);
    }

    const onFilterChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setFilter(e.target.value as FilterDate);
        resetPagination();
    }

    const onOnlyFollowedChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setOnlyFollowed(e.target.checked);
        resetPagination();
    }



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
        <div style={{ marginTop: '50px' }}>
            <Stack
                direction="row"
                spacing={4}
                sx={{
                    justifyContent: "center",
                    alignItems: "top",
                    display: "flex",
                }}
            >
                <Box sx={{ height: "80%", justifyContent: "top", flex: 1, mb: 1, border: '1px solid', borderColor: 'divider', p: 3, borderRadius: '8px', width: 'fit-content' }}>
                    <Typography component="label" endDecorator={
                        <Switch checked={onlyFollowed} onChange={onOnlyFollowedChange} sx={{ ml: 1, mb: 1 }} />
                    }>
                        Is followed By user
                    </Typography>
                    <Typography component="label" endDecorator={
                        <RadioGroup
                            value={filter}
                            onChange={onFilterChange}
                        >
                            <Radio value={FilterDate.All} label="All" />
                            <Radio value={FilterDate.Past} label="Past vacations" />
                            <Radio value={FilterDate.Upcoming} label="Upcoming vacations" />
                            <Radio value={FilterDate.Active} label="Active vacations" />
                        </RadioGroup>
                    }>
                        Filter by date
                    </Typography>

                </Box>
                <Box
                    sx={{ flex: 4, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 1, mb: 1 }}
                >
                    {vacations.map(vacation => (
                        <VacationCard key={vacation.id} vacation={vacation} managedMode={false} invalidateData={invalidateData} />
                    ))}

                </Box>
            </Stack>
            

            <Stack justifyContent={"center"} alignItems="center" marginTop={9} spacing={2}>
                <Pagination color="primary" count={numberOfpages} page={currentPage + 1} onChange={(e, page) => {
                    setCurrentPage(page - 1);
                }} />
            </Stack>
            
        </div>

    </div>;
}