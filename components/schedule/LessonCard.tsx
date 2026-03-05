"use client";

import type { Lesson } from "@/types/schedule";
import { COLOR_CLASSES } from "@/types/schedule";

interface LessonCardProps {
  lesson: Lesson;
  onTap: (lesson: Lesson) => void;
}

export default function LessonCard({ lesson, onTap }: LessonCardProps) {
  const colors = COLOR_CLASSES[lesson.color];

  return (
    <button
      type="button"
      onClick={() => onTap(lesson)}
      className={`${colors.bg} ${colors.text} flex h-full w-full flex-col items-center justify-center rounded-lg p-1 text-center transition-transform active:scale-95`}
    >
      <span className="text-xs font-bold leading-tight md:text-sm">
        {lesson.subject}
      </span>
      {lesson.room && (
        <span className="mt-0.5 text-[10px] leading-tight opacity-80 md:text-xs">
          {lesson.room}
        </span>
      )}
    </button>
  );
}
