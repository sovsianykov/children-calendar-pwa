"use client";

import { useSchedule } from "@/hooks/useSchedule";
import ScheduleGrid from "./ScheduleGrid";
import LessonForm from "./LessonForm";

export default function Schedule() {
  const {
    state,
    addLesson,
    updateLesson,
    deleteLesson,
    openForm,
    editLesson,
    closeForm,
  } = useSchedule();

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <h1 className="mb-4 text-center text-2xl font-bold md:text-3xl">
        📚 Class Schedule
      </h1>

      <ScheduleGrid
        lessons={state.lessons}
        onEmptyCell={openForm}
        onLessonTap={editLesson}
      />

      {state.isFormOpen && state.formDay !== null && state.formPeriod !== null && (
        <LessonForm
          day={state.formDay}
          period={state.formPeriod}
          editingLesson={state.editingLesson}
          onSave={addLesson}
          onUpdate={updateLesson}
          onDelete={deleteLesson}
          onClose={closeForm}
        />
      )}
    </div>
  );
}
