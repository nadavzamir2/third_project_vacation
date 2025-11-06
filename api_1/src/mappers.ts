import { Vacation } from "./types";

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

export const fromVacationDTO = (dto: any) => {
    return {
        id: dto.id,
        destination: dto.destination,
        description: dto.description,
        startDate: dto.start_date,
        endDate: dto.end_date,
        price: dto.price,
        image: dto.image
    };
}