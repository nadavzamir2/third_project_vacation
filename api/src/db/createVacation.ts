import { Vacation } from "../types";
import { getConnection } from ".";

export const createVacation = async (vacation: Omit<Vacation, "id">): Promise<Vacation> => {
    const connection = await getConnection();
    const [result]: any = await connection!.execute(createVacationQuery(vacation), [
        vacation.destination,
        vacation.description,
        vacation.startDate,
        vacation.endDate,
        vacation.price,
        vacation.image
    ]);

    return {
        ...vacation,
        id: result.insertId
    };
}
const createVacationQuery = (vacation: Omit<Vacation, "id">) => {
    const query = `INSERT INTO northwind.vacations (destination, description, start_date, end_date, price, image)
                   VALUES (?, ?, ?, ?, ?, ?)`;
    return query;
}