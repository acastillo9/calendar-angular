export const positiveMod = (n: number, m: number) => ((n % m) + m) % m;

export const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();

export const getFirstDayInMonth = (year: number, month: number) => new Date(year, month, 1).getDay();