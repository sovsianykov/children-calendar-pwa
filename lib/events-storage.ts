import type { CalendarEvent } from "@/types/calendar";

const STORAGE_KEY = "kids-calendar-events";

export function loadEvents(): CalendarEvent[] {
  if (typeof window === "undefined") return [];
  try {
    const data = window.localStorage.getItem(STORAGE_KEY);
    return data ? (JSON.parse(data) as CalendarEvent[]) : [];
  } catch {
    return [];
  }
}

export function saveEvents(events: CalendarEvent[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch {
    // storage full or unavailable — silently ignore
  }
}

export function generateId(): string {
  return crypto.randomUUID();
}
