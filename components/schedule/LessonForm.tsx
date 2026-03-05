"use client";

import { useState } from "react";
import type { Lesson, LessonColor } from "@/types/schedule";
import { LESSON_COLORS, COLOR_CLASSES, DAY_NAMES } from "@/types/schedule";
import Button from "@/components/Button";

interface LessonFormProps {
  day: number;
  period: number;
  editingLesson: Lesson | null;
  onSave: (lesson: Omit<Lesson, "id">) => void;
  onUpdate: (lesson: Lesson) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export default function LessonForm({
  day,
  period,
  editingLesson,
  onSave,
  onUpdate,
  onDelete,
  onClose,
}: LessonFormProps) {
  const [subject, setSubject] = useState(editingLesson?.subject ?? "");
  const [room, setRoom] = useState(editingLesson?.room ?? "");
  const [teacher, setTeacher] = useState(editingLesson?.teacher ?? "");
  const [color, setColor] = useState<LessonColor>(editingLesson?.color ?? "kid-blue");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) return;

    const lessonData = {
      subject: subject.trim(),
      day,
      period,
      room: room.trim() || undefined,
      teacher: teacher.trim() || undefined,
      color,
    };

    if (editingLesson) {
      onUpdate({ ...lessonData, id: editingLesson.id });
    } else {
      onSave(lessonData);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-kid-overlay"
        onClick={onClose}
      />

      {/* Bottom sheet */}
      <div className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-kid-card p-4 shadow-xl md:inset-x-auto md:left-1/2 md:top-1/2 md:bottom-auto md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md md:rounded-2xl">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold">
            {editingLesson ? "Edit Lesson" : "Add Lesson"}
          </h2>
          <span className="text-sm text-foreground/60">
            {DAY_NAMES[day]} &middot; Period {period}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label htmlFor="subject" className="mb-1 block text-sm font-medium">
              Subject *
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Math"
              required
              className="w-full rounded-lg border border-kid-border bg-kid-bg px-3 py-2 text-sm outline-none focus:border-kid-blue"
            />
          </div>

          <div>
            <label htmlFor="room" className="mb-1 block text-sm font-medium">
              Room
            </label>
            <input
              id="room"
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="e.g. 204"
              className="w-full rounded-lg border border-kid-border bg-kid-bg px-3 py-2 text-sm outline-none focus:border-kid-blue"
            />
          </div>

          <div>
            <label htmlFor="teacher" className="mb-1 block text-sm font-medium">
              Teacher
            </label>
            <input
              id="teacher"
              type="text"
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
              placeholder="e.g. Ms. Smith"
              className="w-full rounded-lg border border-kid-border bg-kid-bg px-3 py-2 text-sm outline-none focus:border-kid-blue"
            />
          </div>

          <div>
            <span className="mb-1 block text-sm font-medium">Color</span>
            <div className="flex flex-wrap gap-2">
              {LESSON_COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setColor(c.value)}
                  className={`${COLOR_CLASSES[c.value].bg} h-8 w-8 rounded-full transition-transform ${
                    color === c.value
                      ? "ring-2 ring-foreground ring-offset-2 ring-offset-kid-card scale-110"
                      : "hover:scale-105"
                  }`}
                  aria-label={c.label}
                />
              ))}
            </div>
          </div>

          <div className="mt-2 flex gap-2">
            <Button type="submit" className="flex-1">
              {editingLesson ? "Save" : "Add"}
            </Button>
            {editingLesson && (
              <Button
                type="button"
                variant="outline"
                className="text-kid-red border-kid-red"
                onClick={() => onDelete(editingLesson.id)}
              >
                Delete
              </Button>
            )}
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
