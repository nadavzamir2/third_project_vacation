"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertDDMMYYYYtoYYYYMMDD = exports.isDateDDMMYYYY = exports.isDate = void 0;
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
exports.isDate = isDate;
const isDateDDMMYYYY = (date) => {
    if (typeof date !== 'string')
        return false;
    const regex = /^(\d{2})-(\d{2})-(\d{4})$/;
    const match = date.match(regex);
    if (!match)
        return false;
    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);
    if (month < 1 || month > 12)
        return false;
    if (day < 1 || day > 31)
        return false;
    const testDate = new Date(year, month - 1, day);
    return testDate.getFullYear() === year &&
        testDate.getMonth() === month - 1 &&
        testDate.getDate() === day;
};
exports.isDateDDMMYYYY = isDateDDMMYYYY;
const convertDDMMYYYYtoYYYYMMDD = (date) => {
    const regex = /^(\d{2})-(\d{2})-(\d{4})$/;
    const match = date.match(regex);
    if (!match)
        throw new Error('Invalid date format');
    const day = match[1];
    const month = match[2];
    const year = match[3];
    return `${year}-${month}-${day}`;
};
exports.convertDDMMYYYYtoYYYYMMDD = convertDDMMYYYYtoYYYYMMDD;
