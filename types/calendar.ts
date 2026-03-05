export type EventCategory =
  | "school"
  | "sports"
  | "birthday"
  | "doctor"
  | "play"
  | "music"
  | "other";

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  category: EventCategory;
  description?: string;
}


export interface CalendarState {
  currentDate: Date;
  selectedDate: string | null; // "YYYY-MM-DD"
  events: CalendarEvent[];
  editingEvent: CalendarEvent | null;
  isFormOpen: boolean;
}

export const CATEGORY_EMOJI: Record<EventCategory, string> = {
  school: "📚",
  sports: "⚽",
  birthday: "🎂",
  doctor: "🏥",
  play: "🎮",
  music: "🎵",
  other: "⭐",
};

export const CATEGORY_COLORS: Record<EventCategory, string> = {
  school: "bg-kid-blue",
  sports: "bg-kid-green",
  birthday: "bg-kid-pink",
  doctor: "bg-kid-red",
  play: "bg-kid-orange",
  music: "bg-kid-purple",
  other: "bg-kid-yellow",
};

export const CATEGORY_LABELS: Record<EventCategory, string> = {
  school: "School",
  sports: "Sports",
  birthday: "Birthday",
  doctor: "Doctor",
  play: "Play",
  music: "Music",
  other: "Other",
};
