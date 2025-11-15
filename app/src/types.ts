export type Vacation= {
  destination: string;
description: string;
  id: string;
  startDate: string;
  endDate: string;
  image: string;
  price: number;
  count: number;
}

export const enum FilterDate {
    All = "ALL",
    Past = "PAST",
    Upcoming = "UPCOMING",
    Active = "ACTIVE"
}


export type Filters = {
  followedOnly?: boolean;
  date?: FilterDate;
};


export const enum Role {
    Admin = "ADMIN",
    User = "USER"
}

