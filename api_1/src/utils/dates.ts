export const isDate = (date: any): boolean => {
    return Boolean(Date.parse(date));
}

export const isDateDDMMYYYY = (date: string): boolean => {
    if (typeof date !== 'string') return false;
    const regex = /^(\d{2})-(\d{2})-(\d{4})$/;
    const match = date.match(regex);
    if (!match) return false;

    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);

    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;

    const testDate = new Date(year, month - 1, day);
    return testDate.getFullYear() === year &&
        testDate.getMonth() === month - 1 &&
        testDate.getDate() === day;
}

export const convertDDMMYYYYtoYYYYMMDD = (date: string): string => {
    const regex = /^(\d{2})-(\d{2})-(\d{4})$/;
    const match = date.match(regex);
    if (!match) throw new Error('Invalid date format');

    const day = match[1];
    const month = match[2];
    const year = match[3];

    return `${year}-${month}-${day}`;
}