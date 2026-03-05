"use client";

import type { CalendarEvent } from "@/types/calendar";
import { CATEGORY_EMOJI, CATEGORY_COLORS } from "@/types/calendar";

interface TodayEventsProps {
  events: CalendarEvent[];
  loading: boolean;
  onDelete: (id: string) => void;
}

export default function TodayEvents({ events, loading, onDelete }: TodayEventsProps) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 pb-10">
      <h2 className="text-lg md:text-xl font-bold mb-3">
        Today&apos;s Events
      </h2>

      {loading ? (
        <p className="text-sm text-foreground/50">Loading...</p>
      ) : events.length === 0 ? (
        <div className="bg-kid-card rounded-2xl p-6 border border-kid-border text-center text-foreground/40">
          <p className="text-2xl mb-1">🎉</p>
          <p className="text-sm font-medium">Nothing planned for today</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {events.map((event) => (
            <div
              key={event.id}
              className={`
                flex items-center gap-3 p-3 md:p-4 rounded-2xl bg-kid-card
                border-l-4 shadow-sm border border-kid-border
              `}
              style={{
                borderLeftColor: `var(--kid-${categoryToCssVar(event.category)})`,
              }}
            >
              <span
                className={`
                  flex items-center justify-center w-10 h-10 rounded-xl text-xl
                  ${CATEGORY_COLORS[event.category]} text-white shrink-0
                `}
              >
                {CATEGORY_EMOJI[event.category]}
              </span>

              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm md:text-base truncate">
                  {event.title}
                </h4>
                {event.time && (
                  <p className="text-xs text-foreground/60">{event.time}</p>
                )}
                {event.description && (
                  <p className="text-xs text-foreground/50 mt-0.5 line-clamp-1">
                    {event.description}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => onDelete(event.id)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-kid-red/10 transition-colors text-sm shrink-0"
                aria-label="Delete event"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function categoryToCssVar(category: CalendarEvent["category"]): string {
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
