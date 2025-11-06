export const isDate = (date: any): boolean => {
    return Boolean(Date.parse(date));
}