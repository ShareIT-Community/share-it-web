# Dashboard E2E guide (local)

Run the whole stack locally and check the group dashboard end to end. Local only, nothing here is deployed.

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

Create the admin (asks for the password, min 8 chars). The same command resets a forgotten password:

```bash
docker compose exec api python -m app.scripts.create_admin admin@share-it.tech
```

Check:

- http://localhost:8000/docs loads.
- http://localhost:8000/api/v1/groups returns the seeded groups as JSON.

To refresh `app/seed/community.json` from the website data (Node 22+), from the backend repo:

```bash
node --experimental-strip-types scripts/export_community_seed.mjs ../share-it-web > app/seed/community.json
```

## 3. Frontend

Run from `share-it-web/`.

```bash
pnpm install
pnpm dev
```

- API base is `PUBLIC_API_URL`, default `http://localhost:8000/api/v1` (`src/modules/community/services/groups.service.ts`). Override only if the backend runs elsewhere, e.g. in `.env`: `PUBLIC_API_URL=http://localhost:8000/api/v1`.
- The backend CORS allows only `http://localhost:4321` and `https://share-it.tech`. Use port 4321 (`localhost`, not `127.0.0.1`).

## 4. E2E checklist

- [ ] http://localhost:4321/community lists the groups from the DB. Proof: edit a title in the dashboard, reload `/community`, the new title shows.
- [ ] `/dashboard` is not linked anywhere on the site and has `noindex, nofollow`.
- [ ] Login at `/dashboard` with the admin email and password.
- [ ] Edit: click a card, change a field, Guardar. The card updates.
- [ ] Create: "+ Agregar grupo", fill the form, Guardar. The card appears.
- [ ] Delete: open a group, Borrar, then "Confirmar borrado". The card disappears (use a throwaway group). Borrar is hidden when creating.
- [ ] Session expiry: wait for the token TTL (or clear `panel_token` in sessionStorage and act) and save. You return to login with "Sesión vencida".
- [ ] Backend down (`docker compose stop api`): `/community` still renders, using the hard-coded groups. Restart with `docker compose start api`.

## 5. Known issues

- `pnpm build` fails on Windows at the Netlify adapter with `EPERM` on a symlink (Astro compile passes before it). Enable Developer Mode or use an elevated shell, or build in CI.
- The token lives in `sessionStorage`: it is readable by any XSS on the origin, and cleared when the tab closes. Accepted tradeoff for now.
- Referents are not editable yet (read-only, matched by slug to local data).
- Local only, not deployed.

## 6. Troubleshooting

| Symptom | Cause / fix |
| :-- | :-- |
| 401 / "Sesión vencida" | Token expired or invalid. Log in again. If it keeps happening, check `JWT_SECRET` did not change. |
| 403 on save/delete | The user is not an admin. Run `create_admin` for that email (it sets the admin role). |
| CORS error in the browser console | Not served from `http://localhost:4321`, or `CORS_ORIGINS` in `.env` was edited. Fix it, then `docker compose up -d` to recreate `api`. |
| 409 on create/edit | Slug conflict: another group already uses that slug. Change the title. |
| "Method Not Allowed" (405) | Wrong method or URL, usually `PUBLIC_API_URL` missing `/api/v1` or pointing at the frontend. |
| "No se pudo conectar" | Backend is down: `docker compose ps`, `docker compose logs api`. |
