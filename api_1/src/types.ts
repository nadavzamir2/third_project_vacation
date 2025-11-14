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

export type User = {
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
}

export const enum Role {
    Admin = "ADMIN",
    User = "USER"
}

export enum ERRORS {
    UNAUTH = "UNAUTH",
    BAD_REQUEST = "BAD_REQUEST"
}