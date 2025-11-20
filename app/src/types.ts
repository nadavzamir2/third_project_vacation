export type Vacation = {
  destination: string;
  description: string;
  id: number;
  startDate: string;
  endDate: string;
  image: string;
  price: number;
  count: number;
  isFollowedByUser: boolean;
}

export const enum FilterDate {
  All = "ALL",
  Past = "PAST",
  Upcoming = "UPCOMING",
  Active = "ACTIVE"
}


export type Filters = {
  onlyFollowed?: boolean;
  filterDate?: FilterDate;
};


export const enum Role {
  Admin = "ADMIN",
  User = "USER"
}

