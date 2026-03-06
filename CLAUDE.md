# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Ovsianykov Family Calendar" — a kid-friendly PWA for planning events and class schedules. Built with Next.js 16 (App Router), TypeScript, React 19, and Tailwind CSS v4. Package manager is **pnpm**.

## Commands

- `pnpm dev` — Start development server (http://localhost:3000)
- `pnpm build` — Production build
- `pnpm lint` — Run ESLint
- `pnpm vitest` — Run Vitest tests (browser tests via Playwright)

## Architecture

### Routes (App Router)

- `/` — Calendar view with monthly grid and today's events (`app/page.tsx`, client component)
- `/schedule` — Weekly class schedule grid (`app/schedule/page.tsx`)

### Component Organization

- `components/calendar/` — Calendar feature: `Calendar` (orchestrator), `CalendarHeader`, `CalendarGrid`, `DayCell`, `DayDetail`, `EventCard`, `EventForm`, `TodayEvents`
- `components/schedule/` — Schedule feature: `Schedule` (orchestrator), `ScheduleGrid`, `LessonCard`, `LessonForm`
- `components/NavBar.tsx` — Bottom nav (mobile) / top nav (desktop) with Calendar and Schedule tabs
- `components/ServiceWorkerRegister.tsx` — PWA service worker registration

### State Management

All state is managed via custom hooks — no external state library:
- `hooks/useCalendar.ts` — Calendar navigation, date selection, form state
- `hooks/useEvents.ts` — CRUD operations for calendar events (fetches from API)
- `hooks/useSchedule.ts` — Schedule UI state
- `hooks/useLessons.ts` — CRUD operations for lessons

### Data Layer

- **API client**: `lib/api-client.ts` — generic fetch wrapper targeting `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:8080`)
- **API modules**: `lib/api/events.ts`, `lib/api/lessons.ts` — typed REST endpoints for events and lessons
- **Local storage fallback**: `lib/events-storage.ts`, `lib/schedule-storage.ts` — localStorage-based persistence
- **Utilities**: `lib/calendar-utils.ts` — date formatting helpers (`formatDateKey` produces `"YYYY-MM-DD"`)
- No Next.js API routes — the frontend talks to an external backend

### Types

- `types/calendar.ts` — `CalendarEvent`, `EventCategory`, category color/emoji/label maps
- `types/schedule.ts` — `Lesson`, `LessonColor`, day/period constants, color class maps

### Styling

- Tailwind CSS v4 via `@tailwindcss/postcss`; global styles in `app/globals.css`
- Custom design tokens prefixed `kid-` (e.g., `bg-kid-blue`, `text-kid-purple`, `bg-kid-bg`, `bg-kid-card`, `border-kid-border`)
- Mobile-first responsive: bottom sheet modals on mobile, side panels on desktop

### Testing

- **Vitest** configured to run browser tests in headless Chromium via `@vitest/browser-playwright`

## Key Config

- **TypeScript**: Strict mode, target ES2017, bundler module resolution
- **Path alias**: `@/*` maps to project root (`./`)
- **ESLint**: v9 flat config extending `next/core-web-vitals`, `next/typescript`
- **PWA**: `public/manifest.json` + `public/sw.js` service worker; icons in `public/icons/`
