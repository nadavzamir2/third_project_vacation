export function noForeignLetters(input: string): boolean {
  // Allow anything except non-Latin letters
  return !/[^\P{L}A-Za-z]/u.test(input);
}
export function hasOnlyEnglishLetters(input: string): boolean {
  return /^[A-Za-z]+$/.test(input);
}