"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNumOfDecimals = exports.isFloat = void 0;
const isFloat = (num) => {
    return !isNaN(num) && Number(num) === parseFloat(num);
};
exports.isFloat = isFloat;
const getNumOfDecimals = (num) => {
    const numStr = num.toString();
    if (numStr.includes('.')) {
        return numStr.split('.')[1].length;
    }
    return 0;
};
exports.getNumOfDecimals = getNumOfDecimals;
