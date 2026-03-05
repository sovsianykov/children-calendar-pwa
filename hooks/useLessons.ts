"use client";

import { useState, useEffect, useCallback } from "react";
import type { Lesson } from "@/types/schedule";
import { lessonsApi } from "@/lib/api/lessons";

interface UseLessonsReturn {
  lessons: Lesson[];
  loading: boolean;
  error: string | null;
  addLesson: (lesson: Omit<Lesson, "id">) => Promise<Lesson>;
  updateLesson: (lesson: Lesson) => Promise<Lesson>;
  deleteLesson: (id: string) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useLessons(): UseLessonsReturn {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLessons = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await lessonsApi.getAll();
      setLessons(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load lessons");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  const addLesson = useCallback(
    async (lesson: Omit<Lesson, "id">): Promise<Lesson> => {
      const created = await lessonsApi.create(lesson);
      setLessons((prev) => [...prev, created]);
      return created;
    },
    []
  );

  const updateLesson = useCallback(
    async (lesson: Lesson): Promise<Lesson> => {
      const updated = await lessonsApi.update(lesson);
      setLessons((prev) =>
        prev.map((l) => (l.id === updated.id ? updated : l))
      );
      return updated;
    },
    []
  );

  const deleteLesson = useCallback(async (id: string): Promise<void> => {
    await lessonsApi.delete(id);
    setLessons((prev) => prev.filter((l) => l.id !== id));
  }, []);

  return {
    lessons,
    loading,
    error,
    addLesson,
    updateLesson,
    deleteLesson,
    refetch: fetchLessons,
  };
}
