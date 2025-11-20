import { count } from "console";
import { Vacation } from "./types";
import { isFollow } from "./db/isFollow";

export const toVacationDTO = (vacation: Vacation) => {
    return {
        id: vacation.id,
        destination: vacation.destination,
        description: vacation.description,
        start_date: vacation.startDate,
        end_date: vacation.endDate,
        price: vacation.price,
        image: vacation.image
    };
}

export const fromVacationDTO = (tableRow: any) => {
    return {
        id: tableRow.id,
        destination: tableRow.destination,
        description: tableRow.description,
        startDate: tableRow.start_date,
        endDate: tableRow.end_date,
        price: tableRow.price,
        image: tableRow.image,
        count: tableRow?.count,
        isFollowedByUser: tableRow.user_email !== null ? true : false
    };
}