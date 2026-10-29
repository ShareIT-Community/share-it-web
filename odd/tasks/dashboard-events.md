# Feature: dashboard-events

## Objective
Roadmap P2: events seed in the backend, `/community` reads events from `GET /api/v1/events` (fallback to constants), and `/dashboard` gets an "Eventos" tab with CRUD.

## Scope / constraints
- No DB writes and no write calls against localhost:8000 during checks.
- `getGroupedEvents` and the event cards keep the `ShareITEvent` shape; the service maps API -> that shape.
- UI copy Spanish neutral, no "admin" wording. No new dependencies. Frontend is not committed by the writer.
- The backend `Event` model has no `image_url`, so cards show no image (a schema change + migration would be needed).
- Branches: backend feat/events-groups, frontend feat/dashboard-groups.

## TDD
- Backend: strict TDD ON, runner `uv run pytest`.
- Frontend: configured globally, but no test runner in the repo. Checks: `npx tsc --noEmit -p .`, `pnpm build`, `pnpm dev` + curl.

## Tasks (route: single delegated writer)
- [x] E1 Backend events seed: `app/scripts/seed_events.py`, `scripts/export_events_seed.mjs`, `app/seed/events.json`, tests. Natural key (title, start_at UTC). Commit 19af786.
- [x] E2 `src/modules/community/services/events.service.ts` (fetch + map + 3s timeout + fallback); `community.astro` uses it.
- [x] E3 Dashboard tab "Eventos": `EventsPanel`, `EventCard`, `EventModal` (shared `Modal`), `datetime-local` -> ISO, 422 detail shown, 401 logout.

## Progress
- E1-E3 implemented. Events verified in the browser by the user (look right).
- `/community` falls back to the constants when the API errors, times out (3s) or returns an empty list.

## Checks
See final report.
