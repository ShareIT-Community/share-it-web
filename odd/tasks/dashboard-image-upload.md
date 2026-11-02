# Feature: dashboard-image-upload

## Objective
The dashboard modals for groups, referents and events upload, replace and remove images through the backend (`PUT/DELETE /{resource}/{id}/image`, Cloudinary).

## Scope / constraints
- Backend contract (branch `feat/image-uploads`): multipart field `file`, Bearer token, no manual Content-Type. Errors 422/413/503/502 carry `{detail}`; 401 logs out via the existing pattern.
- Fields: groups and referents `image_url`; events `media` (shared with the recording URL).
- Reuse `useCrud`, `Modal`, `DashboardCard`, `fields.tsx`. No new dependencies. Existing URL inputs stay; none added.
- Branch: feat/dashboard-image-upload (from staging). Not pushed.

## TDD
TDD: no test runner in repo. Checks: `npx tsc --noEmit` + `pnpm build` (Netlify adapter EPERM symlink on Windows is a known environmental failure).

## Tasks (route: single direct writer)
- [x] I1 `image.ts` (type/5 MB pre-check, FormData reader) + `ImageField` component (preview, remove, inline error) + `useCrud.submit` PATCH/POST then PUT/DELETE image; wired in the three modals; event card shows the image
- [x] I2 `docs/dashboard-e2e.md` "Images" section

## Progress
- Partial image failure keeps the modal open and switches it to edit mode so a retry PATCHes instead of duplicating.
- `/community`: Cloudinary absolute URLs render as-is (`image_url` and `media` are used directly as `src`).
- Event `media` that is a YouTube/Drive embed is not treated as an image (preview and card ignore it).

## Checks
- `npx tsc --noEmit`: exit 0.
- `pnpm build`: Astro compile passes; fails only with the known EPERM symlink in the Netlify adapter.
