import { apiClient } from "@/lib/api-client";
import type { Lesson } from "@/types/schedule";

const PATH = "/lessons";

export const lessonsApi = {
  getAll(day?: number) {
    const query = day != null ? `?day=${day}` : "";
    return apiClient.get<Lesson[]>(`${PATH}${query}`);
  },

  getById(id: string) {
    return apiClient.get<Lesson>(`${PATH}/${id}`);
  },

  create(lesson: Omit<Lesson, "id">) {
    return apiClient.post<Lesson>(PATH, lesson);
  },

  update(lesson: Lesson) {
    return apiClient.put<Lesson>(`${PATH}/${lesson.id}`, lesson);
  },

  delete(id: string) {
    return apiClient.delete<void>(`${PATH}/${id}`);
  },
};
