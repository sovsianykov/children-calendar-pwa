"use client";

import { useState, useEffect, useCallback } from "react";
import type { CalendarEvent } from "@/types/calendar";
import { eventsApi } from "@/lib/api/events";

interface UseEventsReturn {
  events: CalendarEvent[];
  loading: boolean;
  error: string | null;
  addEvent: (event: Omit<CalendarEvent, "id">) => Promise<CalendarEvent>;
  updateEvent: (event: CalendarEvent) => Promise<CalendarEvent>;
  deleteEvent: (id: string) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useEvents(): UseEventsReturn {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await eventsApi.getAll();
      setEvents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load events");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const addEvent = useCallback(
    async (event: Omit<CalendarEvent, "id">): Promise<CalendarEvent> => {
      const created = await eventsApi.create(event);
      setEvents((prev) => [...prev, created]);
      return created;
    },
    []
  );

  const updateEvent = useCallback(
    async (event: CalendarEvent): Promise<CalendarEvent> => {
      const updated = await eventsApi.update(event);
      setEvents((prev) =>
        prev.map((e) => (e.id === updated.id ? updated : e))
      );
      return updated;
    },
    []
  );

  const deleteEvent = useCallback(async (id: string): Promise<void> => {
    await eventsApi.delete(id);
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }, []);

  return {
    events,
    loading,
    error,
    addEvent,
    updateEvent,
    deleteEvent,
    refetch: fetchEvents,
  };
}
