export type LessonColor =
  | "kid-blue"
  | "kid-green"
  | "kid-pink"
  | "kid-red"
  | "kid-orange"
  | "kid-purple"
  | "kid-yellow";

export interface Lesson {
  id: string;
  subject: string;
  day: number; // 0=Mon, 1=Tue, 2=Wed, 3=Thu, 4=Fri
  period: number; // 1-based
  room?: string;
  teacher?: string;
  color: LessonColor;
}

export interface ScheduleState {
  lessons: Lesson[];
  editingLesson: Lesson | null;
  isFormOpen: boolean;
  formDay: number | null;
  formPeriod: number | null;
}

export const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const;

export const LESSON_COLORS: { value: LessonColor; label: string }[] = [
  { value: "kid-blue", label: "Blue" },
  { value: "kid-green", label: "Green" },
  { value: "kid-pink", label: "Pink" },
  { value: "kid-red", label: "Red" },
  { value: "kid-orange", label: "Orange" },
  { value: "kid-purple", label: "Purple" },
  { value: "kid-yellow", label: "Yellow" },
];

export const COLOR_CLASSES: Record<LessonColor, { bg: string; text: string }> = {
  "kid-blue": { bg: "bg-kid-blue", text: "text-white" },
  "kid-green": { bg: "bg-kid-green", text: "text-white" },
  "kid-pink": { bg: "bg-kid-pink", text: "text-white" },
  "kid-red": { bg: "bg-kid-red", text: "text-white" },
  "kid-orange": { bg: "bg-kid-orange", text: "text-white" },
  "kid-purple": { bg: "bg-kid-purple", text: "text-white" },
  "kid-yellow": { bg: "bg-kid-yellow", text: "text-black" },
};

export const DEFAULT_PERIODS = 7;
