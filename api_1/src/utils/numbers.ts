export const isFloat = (num: any): boolean => {
    return !isNaN(num) && Number(num) === parseFloat(num);
}

export const getNumOfDecimals = (num: number): number => {
    const numStr = num.toString();
    if (numStr.includes('.')) {
        return numStr.split('.')[1].length;
    }
    return 0;
}