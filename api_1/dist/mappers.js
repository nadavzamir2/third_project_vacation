"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromVacationDTO = exports.toVacationDTO = void 0;
const toVacationDTO = (vacation) => {
    return {
        id: vacation.id,
        destination: vacation.destination,
        description: vacation.description,
        start_date: vacation.startDate,
        end_date: vacation.endDate,
        price: vacation.price,
        image: vacation.image
    };
};
exports.toVacationDTO = toVacationDTO;
const fromVacationDTO = (dto) => {
    return {
        id: dto.id,
        destination: dto.destination,
        description: dto.description,
        startDate: dto.start_date,
        endDate: dto.end_date,
        price: dto.price,
        image: dto.image,
        count: dto === null || dto === void 0 ? void 0 : dto.count,
    };
};
exports.fromVacationDTO = fromVacationDTO;
