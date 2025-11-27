import { getConnection } from ".";
import { Vacation } from "../types";
import { fromVacationDTO } from "../mappers";

export async function getVacation(vacationId: number) {
    const connection = await getConnection();
    const queryResult = await connection!.execute(getVacationQuery(), [vacationId])
    //@ts-ignore
    const vacation = queryResult[0][0];
    if (vacation) {
        return fromVacationDTO(vacation) as Vacation;
    }
    else {
        return null;
    }
}

const getVacationQuery = () => {
    const query = `SELECT 
            v.id, v.destination, v.description, v.start_date, v.end_date, v.price, v.image
        FROM
            northwind.vacations as v
        WHERE
        v.id = ?`;
    return query;
}