import { apiClient } from "@/lib/api-client";
import type { CalendarEvent } from "@/types/calendar";

const PATH = "/events";

export const eventsApi = {
  getAll() {
    return apiClient.get<CalendarEvent[]>(PATH);
  },

  getById(id: string) {
    return apiClient.get<CalendarEvent>(`${PATH}/${id}`);
  },

  create(event: Omit<CalendarEvent, "id">) {
    return apiClient.post<CalendarEvent>(PATH, event);
  },

  update(event: CalendarEvent) {
    return apiClient.put<CalendarEvent>(`${PATH}/${event.id}`, event);
  },

  delete(id: string) {
    return apiClient.delete<void>(`${PATH}/${id}`);
  },
};
