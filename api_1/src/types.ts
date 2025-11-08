export type Vacation = {
    id: number;
    destination: string;
    description: string;
    startDate: Date;
    endDate: Date;
    price: number;
    image: string;
}

export const enum FilterDate {
    All = "ALL",
    Past = "PAST",
    Upcoming = "UPCOMING",
    Active = "ACTIVE"
}