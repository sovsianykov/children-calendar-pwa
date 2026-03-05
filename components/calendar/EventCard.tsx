import type { CalendarEvent } from "@/types/calendar";
import { CATEGORY_EMOJI } from "@/types/calendar";

interface EventCardProps {
  event: CalendarEvent;
  onEdit: (event: CalendarEvent) => void;
  onDelete: (id: string) => void;
}

export default function EventCard({ event, onEdit, onDelete }: EventCardProps) {
  return (
    <div
      className={`
        flex items-start gap-3 p-3 rounded-xl bg-kid-card
        border-l-4 shadow-sm
      `}
      style={{
        borderLeftColor: `var(--kid-${categoryToCssVar(event.category)})`,
      }}
    >
      <span className="text-2xl flex-shrink-0 mt-0.5">
        {CATEGORY_EMOJI[event.category]}
      </span>

      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-sm md:text-base truncate">
          {event.title}
        </h4>
        {event.time && (
          <p className="text-xs text-foreground/60 mt-0.5">{event.time}</p>
        )}
        {event.description && (
          <p className="text-xs text-foreground/50 mt-1 line-clamp-2">
            {event.description}
          </p>
        )}
      </div>

      <div className="flex gap-1 flex-shrink-0">
        <button
          type="button"
          onClick={() => onEdit(event)}
          className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-kid-muted transition-colors text-base"
          aria-label="Edit event"
        >
          ✏️
        </button>
        <button
          type="button"
          onClick={() => onDelete(event.id)}
          className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-kid-red/10 transition-colors text-base"
          aria-label="Delete event"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

function categoryToCssVar(
  category: CalendarEvent["category"]
): string {
  const map: Record<string, string> = {
    school: "blue",
    sports: "green",
    birthday: "pink",
    doctor: "red",
    play: "orange",
    music: "purple",
    other: "yellow",
  };
  return map[category] ?? "blue";
}
