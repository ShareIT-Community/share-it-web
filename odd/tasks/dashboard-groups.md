# Feature: dashboard-groups

## Objective
Let the admin log in on an unlinked `/dashboard` page and edit the WhatsApp groups, with `/community` reading groups from the backend. Local only (no deploy).

## Why
Group edits currently need a code change and a frontend deploy.

## Scope / constraints
- Only `/community` (SSR, `prerender = false`) and the new `/dashboard` change. The rest of the site stays static and untouched.
- `/community` falls back to `channels.const.ts` when the API fails.
- `/dashboard`: no link anywhere, `noindex`, no "admin"/"login" wording in public UI.
- Token in `sessionStorage` (60 min TTL from backend). Known tradeoff: readable by XSS.
- Editable fields: title, description, order, image_url, icon. Referents are assigned from the group modal (`referent_ids`) and edited in their own tab (see dashboard-referents.md).
- API base: `PUBLIC_API_URL`, default `http://localhost:8000/api/v1`.
- Branch: feat/dashboard-groups (from feat/community-events-human-groups).

## TDD
Strict TDD is configured globally, but this repo has no test runner. Checks: `pnpm build` + manual run against local backend (docker compose).

## Tasks
- [x] T1 `/community` reads groups from `GET /groups` with fallback (route: delegated writer)
- [x] T2 `/dashboard` login + group edit form via `PATCH /groups/{id}` (route: delegated writer)
- [x] T3 Dashboard group cards, edit modal and create button (route: delegated writer)
- [x] T4 Delete group from modal (route: delegated writer)
- [x] T5 E2E guide docs/dashboard-e2e.md (route: delegated writer)

## Acceptance
- Backend up: `/community` shows DB groups; backend down: shows constants.
- Login with admin works; editing a group and reloading `/community` shows the change.

## Progress
- Created 2026-10-28.
- 2026-10-28: T1/T2 implemented. `pnpm build`: Astro compile OK, netlify adapter fails on Windows with EPERM symlink (env). Dev: /community and /dashboard 200 against local backend; login/PATCH flow not exercised in a browser.
- 2026-10-28: T3 implemented (GroupCard, GroupModal via native <dialog>, create via POST). Dev /dashboard 200; `pnpm build` Astro compile OK (netlify EPERM env). Left unchecked: browser check of cards, modal, create/edit pending.
- 2026-10-28: T4 implemented (Borrar + inline confirm in GroupModal, DELETE in GroupsPanel); T5 docs/dashboard-e2e.md written. T4 unchecked: browser check pending.
- T3/T4 verified in the browser by the user. T4 delete later moved to the shared `Modal` trash icon + `ConfirmDialog` (see dashboard-referents.md R4).
