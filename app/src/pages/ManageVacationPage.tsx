import { queryVacations } from "@/services/queryVacations";
import { Vacation } from "@/types";
import { useEffect, useState } from "react";
import { VacationCard } from "../components/VacationCard";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';


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

    return (
        <Container maxWidth="xl" sx={{ py: 0 }}>
            <h1 id="manage-vacations">Manage Vacations</h1>
            <Grid container spacing={3}>
                {vacations.map(vacation => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={vacation.id}>
                        <VacationCard vacation={vacation} managedMode={true} invalidateData={invalidateData} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}