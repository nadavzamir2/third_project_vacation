import { Vacation } from "../types";
import { getConnection } from ".";

export const updateVacation = async (vacation: Vacation): Promise<boolean> => {
    const connection = await getConnection();
    const [result]: any = await connection!.execute(updateVacationQuery(), [
        vacation.destination,
        vacation.description,
        vacation.startDate,
        vacation.endDate,
        vacation.price,
        vacation.image,
        vacation.id
    ]);
    return result.affectedRows > 0;
}

const updateVacationQuery = () => {
    const query = `UPDATE northwind.vacations 
                   SET destination = ?, description = ?, start_date = ?, end_date = ?, price = ?, image = ? 
                   WHERE id = ?`;
    return query;
}
