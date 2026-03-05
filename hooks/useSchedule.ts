"use client";

import { useReducer, useCallback } from "react";
import type { Lesson } from "@/types/schedule";
import { useLessons } from "@/hooks/useLessons";

interface ScheduleUIState {
  editingLesson: Lesson | null;
  isFormOpen: boolean;
  formDay: number | null;
  formPeriod: number | null;
}

type Action =
  | { type: "OPEN_FORM"; day: number; period: number }
  | { type: "EDIT_LESSON"; lesson: Lesson }
  | { type: "CLOSE_FORM" };

function reducer(state: ScheduleUIState, action: Action): ScheduleUIState {
  switch (action.type) {
    case "OPEN_FORM":
      return {
        ...state,
        isFormOpen: true,
        editingLesson: null,
        formDay: action.day,
        formPeriod: action.period,
      };
    case "EDIT_LESSON":
      return {
        ...state,
        isFormOpen: true,
        editingLesson: action.lesson,
        formDay: action.lesson.day,
        formPeriod: action.lesson.period,
      };
    case "CLOSE_FORM":
      return {
        ...state,
        isFormOpen: false,
        editingLesson: null,
        formDay: null,
        formPeriod: null,
      };
    default:
      return state;
  }
}

const initialState: ScheduleUIState = {
  editingLesson: null,
  isFormOpen: false,
  formDay: null,
  formPeriod: null,
};

export function useSchedule() {
  const [uiState, dispatch] = useReducer(reducer, initialState);
  const {
    lessons,
    loading,
    error,
    addLesson: apiAddLesson,
    updateLesson: apiUpdateLesson,
    deleteLesson: apiDeleteLesson,
  } = useLessons();

  const openForm = useCallback(
    (day: number, period: number) => dispatch({ type: "OPEN_FORM", day, period }),
    []
  );
  const editLesson = useCallback(
    (lesson: Lesson) => dispatch({ type: "EDIT_LESSON", lesson }),
    []
  );
  const closeForm = useCallback(() => dispatch({ type: "CLOSE_FORM" }), []);

  const addLesson = useCallback(
    async (lesson: Omit<Lesson, "id">) => {
      await apiAddLesson(lesson);
      dispatch({ type: "CLOSE_FORM" });
    },
    [apiAddLesson]
  );

  const updateLesson = useCallback(
    async (lesson: Lesson) => {
      await apiUpdateLesson(lesson);
      dispatch({ type: "CLOSE_FORM" });
    },
    [apiUpdateLesson]
  );

  const deleteLesson = useCallback(
    async (id: string) => {
      await apiDeleteLesson(id);
      dispatch({ type: "CLOSE_FORM" });
    },
    [apiDeleteLesson]
  );

  const state = {
    lessons,
    editingLesson: uiState.editingLesson,
    isFormOpen: uiState.isFormOpen,
    formDay: uiState.formDay,
    formPeriod: uiState.formPeriod,
  };

  return {
    state,
    loading,
    error,
    addLesson,
    updateLesson,
    deleteLesson,
    openForm,
    editLesson,
    closeForm,
  };
}
