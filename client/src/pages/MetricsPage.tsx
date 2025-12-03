import { ExportCsvButton } from "@/components/ExportCsvButton";
import { getMetrics } from "@/services/getMetrics";
import { useEffect, useState } from "react";
import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import { Box, Button, Typography } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export const MetricsPage = () => {
    const [data, setData] = useState<{ name: string; followers: number }[]>([]);
    const [maxFollowers, setMaxFollowers] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        getMetrics().then((result => {
            const mappedResult = result.map((item) => {
                return { name: item.destination, followers: item.followersCount };
            });
            setData(mappedResult);
            const max = Math.max(...mappedResult.map(item => item.followers), 0);
            setMaxFollowers(max);
            console.log(mappedResult);
        }));
    }, []);


    const sortedData = [...data].sort((a, b) => b.followers - a.followers);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = sortedData.slice(startIndex, endIndex);
    const numberOfPages = Math.ceil(data.length / itemsPerPage);

    const formatAxisTick = (value: any): string => {
        return `${value}`;
    };

    const renderCustomBarLabel = ({ x, y, width, value }: any) => {
        return <text x={x + width / 2} y={y} fill="#211b1bff" textAnchor="middle" dy={-6}>{value}</text>;
    };

    return (
        <div>
            <h1>Metrics Page</h1>
            <div>
                <ExportCsvButton />
            </div>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, marginTop: 4 }}>
                <Button
                    variant="outlined"
                    disabled={currentPage === 0}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    startIcon={<NavigateBeforeIcon />}
                >
                    Previous
                </Button>
                <Typography sx={{ minWidth: '120px', textAlign: 'center' }}>
                    Page {currentPage + 1} of {numberOfPages}
                </Typography>
                <Button
                    variant="outlined"
                    disabled={currentPage === numberOfPages - 1}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    endIcon={<NavigateNextIcon />}
                >
                    Next
                </Button>
            </Box>
            <div style={{ padding: '10px', marginLeft: '20px', paddingBottom: '70px' }}>
                <BarChart width="100%" height={800} data={paginatedData} style={{ maxWidth: '1000px' }}>
                    <XAxis
                        dataKey="name"
                        tickFormatter={formatAxisTick}
                        label={{ value: 'Destinations', position: 'insideBottom', offset: -30 }}
                    />
                    <YAxis
                        label={{ position: 'left', value: 'Followers', angle: -90, dy: 0, dx: 20 }}
                        domain={[0, maxFollowers]}
                    />
                    <Bar dataKey="followers" fill="#8884d8" label={renderCustomBarLabel} />
                </BarChart>
            </div>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, marginBottom: 4 }}>
                <Button
                    variant="outlined"
                    disabled={currentPage === 0}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    startIcon={<NavigateBeforeIcon />}
                >
                    Previous
                </Button>
                <Typography sx={{ minWidth: '120px', textAlign: 'center' }}>
                    Page {currentPage + 1} of {numberOfPages}
                </Typography>
                <Button
                    variant="outlined"
                    disabled={currentPage === numberOfPages - 1}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    endIcon={<NavigateNextIcon />}
                >
                    Next
                </Button>
            </Box>
        </div>
    );
}