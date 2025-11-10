# Product Requirements Document (PRD) - TODO App: Due Dates, Priority & Filters

## 1. Overview

We are upgrading the basic TODO app to make it more practical for everyday use by adding due dates, priorities, and simple filters. The goal is a small, teachable MVP that improves task organization without introducing backend complexity. All data will remain local (no external storage). The changes will enable users to set optional due dates and priorities on tasks, view tasks by commonly used filters (All, Today, Overdue), and have sensible default behaviors and validation.

---

## 2. MVP Scope

- Data model
  - `title` (required)
  - `priority` enum: `"P1" | "P2" | "P3"` (default `"P3"`)
  - `dueDate` (optional, ISO `YYYY-MM-DD`); invalid values are ignored and treated as absent
- Storage
  - Use local storage only. No backend changes or external storage.
- UI / Features
  - UI controls to add/edit a task with title, optional due date, and priority selection
  - Filters/tabs: All, Today, Overdue
  - Filter behavior:
    - All: shows both completed and incomplete tasks
    - Today: shows only incomplete tasks due today
    - Overdue: shows only incomplete tasks with a past due date
- Validation & behavior
  - `title` is required when creating a task
  - `priority` defaults to `P3` when not set
  - `dueDate` must be parsed as ISO `YYYY-MM-DD`; invalid dates are ignored
- Acceptance criteria
  - Users can create, edit, complete, and delete tasks with title, optional due date, and priority
  - Tasks persist in local storage across page reloads
  - The app provides All / Today / Overdue filters with the behaviors above

---

## 3. Post-MVP Scope

- Visual improvements
  - Overdue tasks visually highlighted (e.g., red styling)
  - Priority badges color-coded: P1 = red, P2 = orange, P3 = gray
- Sorting
  - Default sort order: overdue first → priority (P1 → P3) → due date ascending → undated last
- UX enhancements
  - Subtle transitions/animations for add/edit/complete actions
  - Improve accessibility (keyboard navigation, ARIA attributes) if time permits

---

## 4. Out of Scope

- Notifications (push/email)
- Recurring tasks
- Multi-user collaboration or any backend/multi-user storage
- Keyboard-only navigation or advanced accessibility features for MVP
- External storage or syncing (stay local only)
