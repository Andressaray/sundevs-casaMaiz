export const toIsoDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const parseIsoDate = (value?: string): Date | undefined => {
  if (!value) {
    return undefined;
  }
  const parsed = new Date(`${value}T00:00:00`);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
};

export const startOfDay = (date: Date): Date => {
  const clone = new Date(date);
  clone.setHours(0, 0, 0, 0);
  return clone;
};

export const buildCalendarDays = (monthCursor: Date): (Date | null)[] => {
  const year = monthCursor.getFullYear();
  const month = monthCursor.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingBlanks = firstDay.getDay();

  const days: (Date | null)[] = Array.from(
    { length: leadingBlanks },
    () => null,
  );
  for (let day = 1; day <= daysInMonth; day += 1) {
    days.push(new Date(year, month, day));
  }
  return days;
};
