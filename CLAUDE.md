# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 16 application using the App Router, TypeScript, React 19, and Tailwind CSS v4. Package manager is **pnpm**.

## Commands

- `pnpm dev` — Start development server (http://localhost:3000)
- `pnpm build` — Production build
- `pnpm start` — Start production server
- `pnpm lint` — Run ESLint

## Architecture

- **App Router**: All routes live in `app/`. `app/layout.tsx` is the root layout; `app/page.tsx` is the home page.
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss`. Global styles in `app/globals.css` using CSS custom properties for dark mode support.
- **Fonts**: Geist Sans and Geist Mono loaded via `next/font/google`, applied as CSS variables on `<html>`.
- **Path alias**: `@/*` maps to the project root (`./`).

## Key Config

- **TypeScript**: Strict mode enabled, target ES2017, bundler module resolution.
- **ESLint**: v9 flat config (`eslint.config.mjs`) extending `next/core-web-vitals` and `next/typescript`.
- **PostCSS**: Configured in `postcss.config.mjs` with `@tailwindcss/postcss`.
