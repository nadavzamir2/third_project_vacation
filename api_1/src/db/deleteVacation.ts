import { getConnection } from "./";

export const deleteVacation = async (vacationId: number): Promise<boolean> => {
    const connection = await getConnection();
    await connection!.execute(deleteVacationQuery(), [vacationId]);
    return true;
}

const deleteVacationQuery = () => {
    const query = `DELETE FROM northwind.vacations WHERE id = ?`;
    return query;
}   