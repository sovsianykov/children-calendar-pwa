"use client";

import Calendar from "@/components/calendar/Calendar";
import TodayEvents from "@/components/calendar/TodayEvents";
import { useEvents } from "@/hooks/useEvents";
import { formatDateKey } from "@/lib/calendar-utils";

export default function Home() {
  const { events, loading, deleteEvent } = useEvents();
  const todayKey = formatDateKey(new Date());
  const todayEvents = events
    .filter((e) => e.date === todayKey)
    .sort((a, b) => (a.time ?? "").localeCompare(b.time ?? ""));

  return (
    <div className="bg-kid-bg">
      <Calendar />
      <TodayEvents events={todayEvents} loading={loading} onDelete={deleteEvent} />
    </div>
  );
}
