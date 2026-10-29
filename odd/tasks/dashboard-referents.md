# Feature: dashboard-referents

## Objective
Roadmap P1: `/community` reads referents from the API, `/dashboard` gets a referents CRUD, and the group modal assigns referents (`referent_ids`).

## Scope / constraints
- Backend is read-only reference (`/api/v1/referents`, `referent_ids` on groups). No DB writes during checks.
- `/community` keeps the fallback to constants + `GROUP_REFERENTS` when the API is down.
- UI copy Spanish neutral, no "admin" wording. No new dependencies. Not committed by the writer.
- Branch: feat/dashboard-groups.

## TDD
Strict TDD configured globally; repo has no test runner. Checks: `pnpm build` (Astro compile) + `pnpm dev` curl.

## Tasks (route: single delegated writer)
- [x] R1 groups.service maps nested `referents` to `GroupReferent`; community.astro prefers `group.referents`
- [x] R2 Dashboard tabs Grupos | Referentes; referent cards, modal (links editor, image preview), two-step delete, 401 logout
- [x] R3 Group modal referent checklist; `referent_ids` sent on POST/PATCH, current referents pre-checked
- [ ] R4 Mobile modal layout, icon close/delete, shared ConfirmDialog (new `Modal.tsx` shell + `ConfirmDialog.tsx`; X close, trash icon, links rows stack on mobile). Pending browser check at 360px.

## Progress
- R4 implemented; tsc clean in dashboard, astro build compiles, /dashboard 200. Not yet verified in a browser.

## Checks
See final report (build / dev curl results).
