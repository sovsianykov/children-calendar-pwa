import { getMonthName } from "@/lib/calendar-utils";
import Button from "@/components/Button";

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

export default function CalendarHeader({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onToday,
}: CalendarHeaderProps) {
  const month = getMonthName(currentDate.getMonth());
  const year = currentDate.getFullYear();

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={onPrevMonth}
          className="w-11 h-11 rounded-full text-lg border-kid-border"
          aria-label="Previous month"
        >
          ←
        </Button>
        <Button
          variant="outline"
          onClick={onNextMonth}
          className="w-11 h-11 rounded-full text-lg border-kid-border"
          aria-label="Next month"
        >
          →
        </Button>
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-kid-blue text-center">
        {month} {year}
      </h2>

      <Button
        variant="outline"
        onClick={onToday}
        className="h-11 rounded-full text-sm font-semibold border-kid-border px-4"
      >
        Today
      </Button>
    </div>
  );
}
