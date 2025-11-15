import api from "./api";

type Metrics = Array<{
    id: number;
    destination: string;
    followersCount: number;
}>;

export const getMetrics = async () => {
    const result = await api.get("/metrics");
    return result.data.metrics as Metrics;
}