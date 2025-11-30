import { ExportCsvButton } from "@/components/ExportCsvButton";
import { getMetrics } from "@/services/getMetrics";
import { useEffect, useState } from "react";
import { Bar, BarChart, XAxis, YAxis } from 'recharts';

export const MetricsPage = () => {
    const [data, setData] = useState<{ name: string; followers: number }[]>([]);
    const [maxFollowers, setMaxFollowers] = useState<number>(0);

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
            <div style={{ padding: '10px', marginLeft: '20px', paddingBottom: '70px' }}>
                <BarChart width="100%" height={800} data={data} style={{ maxWidth: '1000px' }}>
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
        </div>
    );
}