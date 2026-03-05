const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const WEEKDAY_FULL = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/** Returns 0=Mon, 1=Tue, ..., 6=Sun */
export function getFirstDayOfWeek(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay();
  // Convert from Sun=0 to Mon=0
  return day === 0 ? 6 : day - 1;
}

export function formatDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function parseDateKey(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function getMonthName(month: number): string {
  return MONTH_NAMES[month];
}

export function getWeekDayNames(): string[] {
  return WEEKDAY_NAMES;
}

export function getFullDayName(dateKey: string): string {
  const date = parseDateKey(dateKey);
  return WEEKDAY_FULL[date.getDay()];
}

export function formatDisplayDate(dateKey: string): string {
  const date = parseDateKey(dateKey);
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  return `${month} ${day}`;
}

export function isToday(dateKey: string): boolean {
  return dateKey === formatDateKey(new Date());
}
