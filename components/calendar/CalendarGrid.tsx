import type { CalendarEvent } from "@/types/calendar";
import {
  getDaysInMonth,
  getFirstDayOfWeek,
  getWeekDayNames,
  formatDateKey,
} from "@/lib/calendar-utils";
import DayCell from "./DayCell";

interface CalendarGridProps {
  currentDate: Date;
  selectedDate: string | null;
  events: CalendarEvent[];
  onSelectDate: (dateKey: string) => void;
}

export default function CalendarGrid({
  currentDate,
  selectedDate,
  events,
  onSelectDate,
}: CalendarGridProps) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);
  const weekDays = getWeekDayNames();

  // Previous month padding
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

  const cells: {
    dateKey: string;
    day: number;
    isCurrentMonth: boolean;
  }[] = [];

  // Days from previous month
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const date = new Date(prevYear, prevMonth, day);
    cells.push({
      dateKey: formatDateKey(date),
      day,
      isCurrentMonth: false,
    });
  }

  // Days of current month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    cells.push({
      dateKey: formatDateKey(date),
      day,
      isCurrentMonth: true,
    });
  }

  // Days from next month to fill the grid
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  const remaining = 7 - (cells.length % 7);
  if (remaining < 7) {
    for (let day = 1; day <= remaining; day++) {
      const date = new Date(nextYear, nextMonth, day);
      cells.push({
        dateKey: formatDateKey(date),
        day,
        isCurrentMonth: false,
      });
    }
  }

  // Build event map for quick lookup
  const eventsByDate = new Map<string, CalendarEvent[]>();
  for (const event of events) {
    const existing = eventsByDate.get(event.date);
    if (existing) {
      existing.push(event);
    } else {
      eventsByDate.set(event.date, [event]);
    }
  }

  return (
    <div>
      {/* Weekday header */}
      <div className="grid grid-cols-7 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-xs md:text-sm font-semibold text-foreground/50 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Day cells grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell) => (
          <DayCell
            key={cell.dateKey}
            dateKey={cell.dateKey}
            day={cell.day}
            isCurrentMonth={cell.isCurrentMonth}
            isSelected={selectedDate === cell.dateKey}
            events={eventsByDate.get(cell.dateKey) ?? []}
            onSelect={onSelectDate}
          />
        ))}
      </div>
    </div>
  );
}
