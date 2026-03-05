import type { Lesson } from "@/types/schedule";

const STORAGE_KEY = "kids-schedule-lessons";

export function loadLessons(): Lesson[] {
  if (typeof window === "undefined") return [];
  try {
    const data = window.localStorage.getItem(STORAGE_KEY);
    return data ? (JSON.parse(data) as Lesson[]) : [];
  } catch {
    return [];
  }
}

export function saveLessons(lessons: Lesson[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lessons));
  } catch {
    // storage full or unavailable
  }
}

export function generateId(): string {
  return crypto.randomUUID();
}
