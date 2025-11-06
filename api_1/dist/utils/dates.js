"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDate = void 0;
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
exports.isDate = isDate;
