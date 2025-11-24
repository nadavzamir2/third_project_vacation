import { Vacation } from "./types";

export const toVacationDTO = (vacation: Vacation) => {
    return {
        id: vacation.id,
        destination: vacation.destination,
        description: vacation.description,
        start_date: vacation.startDate,
        end_date: vacation.endDate,
        price: vacation.price,
        image: vacation.image.replace('/images/', ''),
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
        image: `/images/${tableRow.image}`,
        count: tableRow?.count,
        isFollowedByUser: tableRow.user_email !== null ? true : false
    };
}