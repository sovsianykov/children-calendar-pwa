import type { CalendarEvent } from "@/types/calendar";
import { formatDisplayDate, getFullDayName } from "@/lib/calendar-utils";
import Button from "@/components/Button";
import EventCard from "./EventCard";

interface DayDetailProps {
  dateKey: string;
  events: CalendarEvent[];
  onClose: () => void;
  onAddEvent: () => void;
  onEditEvent: (event: CalendarEvent) => void;
  onDeleteEvent: (id: string) => void;
}

export default function DayDetail({
  dateKey,
  events,
  onClose,
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
}: DayDetailProps) {
  const dayEvents = events
    .filter((e) => e.date === dateKey)
    .sort((a, b) => (a.time ?? "").localeCompare(b.time ?? ""));

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold">{formatDisplayDate(dateKey)}</h3>
          <p className="text-sm text-foreground/50">{getFullDayName(dateKey)}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-kid-muted transition-colors text-lg md:hidden"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      {/* Events list */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {dayEvents.length === 0 ? (
          <div className="text-center py-8 text-foreground/40">
            <p className="text-3xl mb-2">📅</p>
            <p className="text-sm font-medium">No events yet</p>
            <p className="text-xs">Tap the button below to add one!</p>
          </div>
        ) : (
          dayEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onEdit={onEditEvent}
              onDelete={onDeleteEvent}
            />
          ))
        )}
      </div>

      {/* Add event button */}
      <Button
        variant="secondary"
        onClick={onAddEvent}
        className="w-full h-12 rounded-xl text-base font-bold bg-kid-blue hover:bg-kid-blue/90 text-white"
      >
        + Add Event
      </Button>
    </div>
  );
}
