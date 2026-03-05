"use client";

import type { Lesson } from "@/types/schedule";
import { DAY_NAMES, DEFAULT_PERIODS } from "@/types/schedule";
import LessonCard from "./LessonCard";

interface ScheduleGridProps {
  lessons: Lesson[];
  onEmptyCell: (day: number, period: number) => void;
  onLessonTap: (lesson: Lesson) => void;
}

export default function ScheduleGrid({
  lessons,
  onEmptyCell,
  onLessonTap,
}: ScheduleGridProps) {
  const periods = Array.from({ length: DEFAULT_PERIODS }, (_, i) => i + 1);

  function getLessonAt(day: number, period: number): Lesson | undefined {
    return lessons.find((l) => l.day === day && l.period === period);
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[480px] border-collapse">
        <thead>
          <tr>
            <th className="w-12 border border-kid-border bg-kid-muted p-2 text-center text-xs font-bold md:text-sm">
              #
            </th>
            {DAY_NAMES.map((name, i) => (
              <th
                key={i}
                className="border border-kid-border bg-kid-muted p-2 text-center text-xs font-bold md:text-sm"
              >
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {periods.map((period) => (
            <tr key={period}>
              <td className="border border-kid-border bg-kid-muted p-2 text-center text-xs font-bold text-foreground/60 md:text-sm">
                {period}
              </td>
              {DAY_NAMES.map((_, dayIndex) => {
                const lesson = getLessonAt(dayIndex, period);
                return (
                  <td
                    key={dayIndex}
                    className="h-14 border border-kid-border p-0.5 md:h-16"
                  >
                    {lesson ? (
                      <LessonCard lesson={lesson} onTap={onLessonTap} />
                    ) : (
                      <button
                        type="button"
                        onClick={() => onEmptyCell(dayIndex, period)}
                        className="flex h-full w-full items-center justify-center rounded-lg text-foreground/20 transition-colors hover:bg-kid-muted hover:text-foreground/40"
                        aria-label={`Add lesson on ${DAY_NAMES[dayIndex]}, period ${period}`}
                      >
                        <span className="text-lg">+</span>
                      </button>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
