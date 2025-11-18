import { getMetrics } from "@/services/getMetrics";
import { useEffect, useState } from "react";
import { Bar, BarChart, XAxis, YAxis } from 'recharts';

export const MetricsPage = () => {
    const [data, setData] = useState<{name: string; followers: number}[]>([]);

    const margin = {
        top: 80,
        right: 30,
        left: 0,
        bottom: 25,
    };

    useEffect(() => {
        getMetrics().then((result => {
            const mappedResult = result.map((item) => {
                return { name: item.destination, followers: item.followersCount};
            });
            setData(mappedResult);
            console.log(mappedResult);
        }));
    }, []);
    

    const formatAxisTick = (value: any): string => {
        return `${value}`;
    };

    const renderCustomBarLabel = ({ x, y, width, value }: any) => {
        return <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>{value}</text>;
    };

    return (
        <div>
        <h1>Metrics Page</h1>
        <div style={{padding: '20px', marginLeft: '40px', paddingBottom: '140px'}}>
            <BarChart width="100%" height={600} data={data} style={{ maxWidth: '900px' }}>
                <XAxis
                    dataKey="name"
                    tickFormatter={formatAxisTick}
                />
                <YAxis label={{ position: 'left', value: 'Followers', angle: -90, dy: 0, dx: 20 }} />
                <Bar dataKey="followers" fill="#8884d8" label={renderCustomBarLabel} />
            </BarChart>
        </div>
        </div>
    );
}