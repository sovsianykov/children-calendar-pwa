"use client";

import { useReducer, useCallback } from "react";
import type { CalendarEvent } from "@/types/calendar";
import { useEvents } from "@/hooks/useEvents";

interface CalendarUIState {
  currentDate: Date;
  selectedDate: string | null;
  editingEvent: CalendarEvent | null;
  isFormOpen: boolean;
}

type Action =
  | { type: "PREV_MONTH" }
  | { type: "NEXT_MONTH" }
  | { type: "GO_TO_TODAY" }
  | { type: "SELECT_DATE"; date: string }
  | { type: "CLOSE_DAY" }
  | { type: "OPEN_FORM" }
  | { type: "CLOSE_FORM" }
  | { type: "SET_EDITING_EVENT"; event: CalendarEvent | null };

function reducer(state: CalendarUIState, action: Action): CalendarUIState {
  switch (action.type) {
    case "PREV_MONTH": {
      const d = new Date(state.currentDate);
      d.setMonth(d.getMonth() - 1);
      return { ...state, currentDate: d };
    }
    case "NEXT_MONTH": {
      const d = new Date(state.currentDate);
      d.setMonth(d.getMonth() + 1);
      return { ...state, currentDate: d };
    }
    case "GO_TO_TODAY":
      return { ...state, currentDate: new Date() };
    case "SELECT_DATE":
      return { ...state, selectedDate: action.date };
    case "CLOSE_DAY":
      return { ...state, selectedDate: null, isFormOpen: false, editingEvent: null };
    case "OPEN_FORM":
      return { ...state, isFormOpen: true };
    case "CLOSE_FORM":
      return { ...state, isFormOpen: false, editingEvent: null };
    case "SET_EDITING_EVENT":
      return { ...state, editingEvent: action.event, isFormOpen: action.event !== null };
    default:
      return state;
  }
}

const initialState: CalendarUIState = {
  currentDate: new Date(),
  selectedDate: null,
  editingEvent: null,
  isFormOpen: false,
};

export function useCalendar() {
  const [uiState, dispatch] = useReducer(reducer, initialState);
  const {
    events,
    loading,
    error,
    addEvent: apiAddEvent,
    updateEvent: apiUpdateEvent,
    deleteEvent: apiDeleteEvent,
  } = useEvents();

  const prevMonth = useCallback(() => dispatch({ type: "PREV_MONTH" }), []);
  const nextMonth = useCallback(() => dispatch({ type: "NEXT_MONTH" }), []);
  const goToToday = useCallback(() => dispatch({ type: "GO_TO_TODAY" }), []);
  const selectDate = useCallback(
    (date: string) => dispatch({ type: "SELECT_DATE", date }),
    []
  );
  const closeDay = useCallback(() => dispatch({ type: "CLOSE_DAY" }), []);
  const openForm = useCallback(() => dispatch({ type: "OPEN_FORM" }), []);
  const closeForm = useCallback(() => dispatch({ type: "CLOSE_FORM" }), []);
  const setEditingEvent = useCallback(
    (event: CalendarEvent | null) =>
      dispatch({ type: "SET_EDITING_EVENT", event }),
    []
  );

  const addEvent = useCallback(
    async (event: Omit<CalendarEvent, "id">) => {
      await apiAddEvent(event);
      dispatch({ type: "CLOSE_FORM" });
    },
    [apiAddEvent]
  );

  const updateEvent = useCallback(
    async (event: CalendarEvent) => {
      await apiUpdateEvent(event);
      dispatch({ type: "CLOSE_FORM" });
    },
    [apiUpdateEvent]
  );

  const deleteEvent = useCallback(
    async (id: string) => {
      await apiDeleteEvent(id);
    },
    [apiDeleteEvent]
  );

  // Preserve the same `state` shape so components don't need changes
  const state = {
    currentDate: uiState.currentDate,
    selectedDate: uiState.selectedDate,
    events,
    editingEvent: uiState.editingEvent,
    isFormOpen: uiState.isFormOpen,
  };

  return {
    state,
    loading,
    error,
    prevMonth,
    nextMonth,
    goToToday,
    selectDate,
    closeDay,
    openForm,
    closeForm,
    addEvent,
    updateEvent,
    deleteEvent,
    setEditingEvent,
  };
}
