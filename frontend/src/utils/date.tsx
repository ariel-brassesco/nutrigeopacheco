import dayjs from "dayjs";

export const deltaYears = (year: number) => dayjs().year() - year;
