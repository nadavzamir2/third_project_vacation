import { queryVacations } from "@/services/queryVacations";
import { Vacation } from "@/types";
import { useEffect, useState } from "react";
import { VacationCard } from "../components/VacationCard";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';


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
        <Container maxWidth="xl" sx={{ py: 1 }}>
            <h1 id="manage-vacations">Manage Vacations</h1>
            <Typography variant="subtitle1" color="text.secondary" sx={{ textAlign: 'center', mb: 5 }}>
                <Chip label={`Total: ${vacations.length}`} color="info" variant="outlined" />
            </Typography>
            <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: '800px', margin: '0 auto' }}>
                {vacations.map(vacation => (
                    <Grid item xs={12} sm={6} md={6} lg={6} key={vacation.id}>
                        <VacationCard vacation={vacation} managedMode={true} invalidateData={invalidateData} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}