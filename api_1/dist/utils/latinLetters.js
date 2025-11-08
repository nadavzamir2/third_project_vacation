"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOnlyEnglishLetters = isOnlyEnglishLetters;
exports.hasOnlyEnglishLetters = hasOnlyEnglishLetters;
function isOnlyEnglishLetters(input) {
    // Allow anything except non-Latin letters
    return !/[^\P{L}A-Za-z]/u.test(input);
}
function hasOnlyEnglishLetters(input) {
    return /^[A-Za-z]+$/.test(input);
}
