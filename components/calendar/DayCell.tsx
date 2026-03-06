import type { CalendarEvent } from "@/types/calendar";
import { CATEGORY_COLORS, CATEGORY_EMOJI } from "@/types/calendar";
import { isToday } from "@/lib/calendar-utils";

interface DayCellProps {
  dateKey: string;
  day: number;
  isCurrentMonth: boolean;
  isSelected: boolean;
  events: CalendarEvent[];
  onSelect: (dateKey: string) => void;
}

export default function DayCell({
  dateKey,
  day,
  isCurrentMonth,
  isSelected,
  events,
  onSelect,
}: DayCellProps) {
  const today = isToday(dateKey);
  const visible = events.slice(0, 2);
  const remaining = events.length - visible.length;

  return (
    <button
      type="button"
      onClick={() => onSelect(dateKey)}
      className={`
        relative flex flex-col items-start p-1 md:p-1.5
        min-h-16 md:min-h-24 rounded-xl transition-all overflow-hidden
        ${isCurrentMonth ? "text-foreground" : "text-foreground/30"}
        ${today && !isSelected ? "bg-kid-orange/20 ring-2 ring-kid-orange" : ""}
        ${isSelected ? "bg-kid-blue text-white shadow-lg scale-[1.02]" : ""}
        ${!isSelected && !today && isCurrentMonth ? "hover:bg-kid-muted active:scale-95" : ""}
      `}
    >
      <span
        className={`
          text-xs md:text-sm font-bold p-2 leading-none mb-0.5
          ${today && !isSelected ? "text-kid-orange" : ""}
          ${isSelected ? "text-white" : ""}
        `}
      >
        {day}
      </span>

      {visible.length > 0 && (
        <div className="w-full flex flex-col gap-0.5 mt-auto">
          {visible.map((event) => (
            <div
              key={event.id}
              className={`
                w-full rounded px-1 py-px text-[9px] md:text-[10px] leading-tight
                font-medium truncate
                ${isSelected ? "bg-white/25 text-white" : `${CATEGORY_COLORS[event.category]} text-white`}
              `}
            >
              <span className="hidden md:inline mr-0.5">{CATEGORY_EMOJI[event.category]}</span>
              {event.title}
            </div>
          ))}
          {remaining > 0 && (
            <span className={`text-[9px] md:text-[10px] font-medium ${isSelected ? "text-white/70" : "text-foreground/50"}`}>
              +{remaining} more
            </span>
          )}
        </div>
      )}
    </button>
  );
}
