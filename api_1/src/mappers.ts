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