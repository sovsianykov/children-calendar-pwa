"use client";

import { useState } from "react";
import type { CalendarEvent, EventCategory } from "@/types/calendar";
import { CATEGORY_EMOJI, CATEGORY_LABELS } from "@/types/calendar";
import Button from "@/components/Button";

interface EventFormProps {
  date: string;
  editingEvent: CalendarEvent | null;
  onSave: (event: Omit<CalendarEvent, "id">) => void;
  onUpdate: (event: CalendarEvent) => void;
  onClose: () => void;
}

const CATEGORIES: EventCategory[] = [
  "school",
  "sports",
  "birthday",
  "doctor",
  "play",
  "music",
  "other",
];

export default function EventForm({
  date,
  editingEvent,
  onSave,
  onUpdate,
  onClose,
}: EventFormProps) {
  const [title, setTitle] = useState(editingEvent?.title ?? "");
  const [time, setTime] = useState(editingEvent?.time ?? "");
  const [category, setCategory] = useState<EventCategory>(editingEvent?.category ?? "other");
  const [description, setDescription] = useState(editingEvent?.description ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    const eventData = {
      title: title.trim(),
      date,
      time: time || undefined,
      category,
      description: description.trim() || undefined,
    };

    if (editingEvent) {
      onUpdate({ ...eventData, id: editingEvent.id });
    } else {
      onSave(eventData);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-kid-overlay" />

      {/* Form panel */}
      <div
        className="relative w-full md:max-w-md bg-kid-card rounded-t-3xl md:rounded-3xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-kid-blue">
            {editingEvent ? "Edit Event" : "New Event"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-kid-muted transition-colors text-lg"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-1" htmlFor="event-title">
              What&apos;s happening?
            </label>
            <input
              id="event-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Soccer practice"
              required
              className="w-full h-12 px-4 rounded-xl border-2 border-kid-border bg-kid-bg text-foreground placeholder:text-foreground/40 focus:border-kid-blue focus:outline-none text-base"
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-semibold mb-1" htmlFor="event-time">
              Time (optional)
            </label>
            <input
              id="event-time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border-2 border-kid-border bg-kid-bg text-foreground focus:border-kid-blue focus:outline-none text-base"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold mb-2">Category</label>
            <div className="grid grid-cols-4 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`
                    flex flex-col items-center gap-1 p-2 rounded-xl transition-all
                    ${category === cat
                      ? "bg-kid-blue/15 ring-2 ring-kid-blue scale-105"
                      : "bg-kid-muted hover:bg-kid-muted/80"
                    }
                  `}
                >
                  <span className="text-2xl">{CATEGORY_EMOJI[cat]}</span>
                  <span className="text-[10px] font-medium text-foreground/70">
                    {CATEGORY_LABELS[cat]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-1" htmlFor="event-desc">
              Notes (optional)
            </label>
            <textarea
              id="event-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Any extra details..."
              rows={2}
              className="w-full px-4 py-3 rounded-xl border-2 border-kid-border bg-kid-bg text-foreground placeholder:text-foreground/40 focus:border-kid-blue focus:outline-none text-base resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 h-12 rounded-xl text-base border-kid-border"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1 h-12 rounded-xl text-base bg-kid-blue hover:bg-kid-blue/90 text-white"
            >
              {editingEvent ? "Save" : "Add"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
