"use client";

import { useCalendar } from "@/hooks/useCalendar";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import DayDetail from "./DayDetail";
import EventForm from "./EventForm";

export default function Calendar() {
  const {
    state,
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
  } = useCalendar();

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 md:py-10">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-kid-purple">
        Seva & Leva Calendar
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Calendar section */}
        <div className="flex-1">
          <div className="bg-kid-card rounded-2xl p-4 md:p-6 shadow-sm border border-kid-border">
            <CalendarHeader
              currentDate={state.currentDate}
              onPrevMonth={prevMonth}
              onNextMonth={nextMonth}
              onToday={goToToday}
            />
            <CalendarGrid
              currentDate={state.currentDate}
              selectedDate={state.selectedDate}
              events={state.events}
              onSelectDate={selectDate}
            />
          </div>
        </div>

        {/* Day detail — side panel on desktop */}
        {state.selectedDate && (
          <div className="hidden md:block w-80">
            <div className="bg-kid-card rounded-2xl p-5 shadow-sm border border-kid-border sticky top-6">
              <DayDetail
                dateKey={state.selectedDate}
                events={state.events}
                onClose={closeDay}
                onAddEvent={openForm}
                onEditEvent={setEditingEvent}
                onDeleteEvent={deleteEvent}
              />
            </div>
          </div>
        )}
      </div>

      {/* Day detail — bottom sheet on mobile */}
      {state.selectedDate && (
        <div className="md:hidden fixed inset-0 z-40 flex flex-col justify-end" onClick={closeDay}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-kid-overlay" />

          {/* Sheet */}
          <div
            className="relative bg-kid-card rounded-t-3xl p-5 pb-8 shadow-2xl max-h-[70vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle */}
            <div className="w-10 h-1 bg-kid-border rounded-full mx-auto mb-4" />

            <DayDetail
              dateKey={state.selectedDate}
              events={state.events}
              onClose={closeDay}
              onAddEvent={openForm}
              onEditEvent={setEditingEvent}
              onDeleteEvent={deleteEvent}
            />
          </div>
        </div>
      )}

      {/* Event form modal */}
      {state.isFormOpen && state.selectedDate && (
        <EventForm
          date={state.selectedDate}
          editingEvent={state.editingEvent}
          onSave={addEvent}
          onUpdate={updateEvent}
          onClose={closeForm}
        />
      )}
    </div>
  );
}
