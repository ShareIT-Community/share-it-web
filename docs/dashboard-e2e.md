# Dashboard E2E guide (local)

Run the whole stack locally and check the dashboard (groups, referents, events) end to end. Local only, nothing here is deployed.

## 1. Prerequisites

- Docker with Compose v2 (`docker compose`).
- Node + pnpm `10.32.0` (`packageManager` in `package.json`; `corepack enable` picks it up).
- Both repos cloned side by side:

```
share-it-web/            # this repo
share-it-web-backend/
```

## 2. Recreate the backend from scratch

Run from `share-it-web-backend/`.

```bash
cp .env.example .env
```

In `.env`, set a real `JWT_SECRET`. `ACCESS_TOKEN_EXPIRE_MINUTES=60` is the token lifetime (the code default is 1440 if the variable is missing). `CORS_ORIGINS` already allows `https://share-it.tech` and `http://localhost:4321`.

Wipe and start. **`-v` deletes the Postgres volume: all local data is lost.**

```bash
docker compose down -v
docker compose up -d --build
```

Migrations run by themselves: the `api` command is `alembic upgrade head && uvicorn ...`. Check with `docker compose logs api`.

Seed the groups and referents (safe to rerun, upserts by slug):

```bash
docker compose exec api python -m app.scripts.seed_community
```

Seed the events (safe to rerun, upserts by title + start date):

```bash
docker compose exec api python -m app.scripts.seed_events
```

Create the admin (asks for the password, min 8 chars). The same command resets a forgotten password:

```bash
docker compose exec api python -m app.scripts.create_admin admin@share-it.tech
```

Check:

- http://localhost:8000/docs loads.
- http://localhost:8000/api/v1/groups returns the seeded groups (with nested referents) as JSON.
- http://localhost:8000/api/v1/events returns the seeded events.

To refresh the seed files from the website data (Node 22+), from the backend repo:

```bash
node --experimental-strip-types scripts/export_community_seed.mjs ../share-it-web > app/seed/community.json
node --experimental-strip-types scripts/export_events_seed.mjs ../share-it-web > app/seed/events.json
```

## 3. Frontend

Run from `share-it-web/`.

```bash
pnpm install
pnpm dev
```

- API base is `PUBLIC_API_URL`, default `http://localhost:8000/api/v1` (`src/modules/community/services/groups.service.ts`, shared by `events.service.ts`). Override only if the backend runs elsewhere, e.g. in `.env`: `PUBLIC_API_URL=http://localhost:8000/api/v1`.
- The backend CORS allows only `http://localhost:4321` and `https://share-it.tech`. Use port 4321 (`localhost`, not `127.0.0.1`).

## 4. Dashboard tabs

`/dashboard` has three tabs: **Grupos**, **Referentes** and **Eventos**. Each lists cards; click a card to edit, use "+ Agregar ..." to create.

- All modals share one shell: **X** (top right) closes it; Escape and a click on the backdrop also close it.
- In edit mode a **trash icon** opens a confirmation dialog ("Esta acción es irreversible.") with Cancelar / Borrar. The DELETE is only sent after confirming. The icon is hidden when creating.
- **Grupos**: title, description, order, image, icon, and a checklist of referents (`referent_ids`).
- **Referentes**: name, role, image and a links editor (label + URL rows).
- **Eventos**: title, description, type (meetup or workshop), start/end (`datetime-local`, sent as UTC ISO), location, speaker, site, media (video or image URL used by past-event cards) and repository. Events have no image field.

## 5. E2E checklist

- [ ] http://localhost:4321/community lists the groups (with referents) and events from the DB. Proof: edit a title in the dashboard, reload `/community`, the new title shows.
- [ ] `/dashboard` is not linked anywhere on the site and has `noindex, nofollow`.
- [ ] Login at `/dashboard` with the admin email and password.
- [ ] Groups: edit a card, Guardar, the card updates; create with "+ Agregar grupo", the card appears.
- [ ] Referentes: create one with two links, edit it, then open a group, check the referent and Guardar. Reload `/community`: the referent shows under that group.
- [ ] Eventos: create an upcoming event and a past one (with media). Reload `/community`: they appear in the upcoming and past sections.
- [ ] Events validation: set the end before the start. The modal shows the backend 422 message and nothing is saved.
- [ ] Delete (use throwaway items, in each tab): trash icon opens the confirmation dialog; Cancelar keeps the item, Borrar removes the card. The icon is absent when creating.
- [ ] Close: the X, Escape and a backdrop click each close a modal without saving.
- [ ] Session expiry: wait for the token TTL (or clear `panel_token` in sessionStorage and act) and save. You return to login with "Sesión vencida".
- [ ] Fallback, backend down (`docker compose stop api`): `/community` still renders from the hard-coded constants. Restart with `docker compose start api`.
- [ ] Fallback, empty tables: with no groups or events in the DB, `/community` shows the constants instead of an empty page. The same happens on an API error or a response slower than 3 s.

## 6. Known issues

- `pnpm build` fails on Windows at the Netlify adapter with `EPERM` on a symlink (Astro compile passes before it). Enable Developer Mode or use an elevated shell, or build in CI.
- The token lives in `sessionStorage`: it is readable by any XSS on the origin, and cleared when the tab closes. Accepted tradeoff for now.
- Events have no image: the backend `Event` model has no `image_url` (would need a field and a migration).
- Referents and events flows were checked in the browser by the user, not by automated tests (the repo has no frontend test runner).
- Local only, not deployed.

## 7. Troubleshooting

| Symptom | Cause / fix |
| :-- | :-- |
| 401 / "Sesión vencida" | Token expired or invalid. Log in again. If it keeps happening, check `JWT_SECRET` did not change. |
| 403 on save/delete | The user is not an admin. Run `create_admin` for that email (it sets the admin role). |
| CORS error in the browser console | Not served from `http://localhost:4321`, or `CORS_ORIGINS` in `.env` was edited. Fix it, then `docker compose up -d` to recreate `api`. |
| 409 on create/edit | Slug conflict: another group or referent already uses that slug (events have no slug). Change the title or name. |
| 422 on saving an event | Invalid dates (e.g. end before start) or a required field is empty. The modal shows the backend message; fix the dates. |
| `/community` shows the old constants | The API errored, took over 3 s, or the table is empty. Check `docker compose logs api` and that the seeds ran. |
| "Method Not Allowed" (405) | Wrong method or URL, usually `PUBLIC_API_URL` missing `/api/v1` or pointing at the frontend. |
| "No se pudo conectar" | Backend is down: `docker compose ps`, `docker compose logs api`. |
