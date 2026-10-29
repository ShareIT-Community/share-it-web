![blog-logo](https://github.com/user-attachments/assets/abe6f530-723e-4d4d-8924-2b6d40cd58c8)

# Share IT 🚀

Bienvenido a **Share IT**. Somos una comunidad unida por el deseo de aprender, compartir conocimientos y crecer juntos en el ámbito tecnológico. Este es un rincón para intercambiar conocimientos y experiencias que nos han guiado y ayudado en nuestro recorrido. ☀️

Este repositorio es el **frontend** ([share-it.tech](https://share-it.tech)): el sitio público y el panel de administración. Los datos de grupos, referentes y eventos vienen de la API de [`share-it-web-backend`](https://github.com/ShareIT-Community/share-it-web-backend).

## ✨ Funcionalidades

- 🗓️ Eventos con estado dinámico (próximo, en vivo, pasado), mostrados en hora de Argentina
- 👥 Página de comunidad con los grupos de WhatsApp y sus referentes
- 🎙️ Workshops con historial de sesiones pasadas (grabación y repositorio)
- 📝 Blog de artículos en Markdown con tags y paginación
- 🛠️ Panel de administración (`/dashboard`) para gestionar grupos, referentes y eventos sin tocar código

## 🧱 Stack

- [Astro 5](https://astro.build) con islas de [React 19](https://react.dev)
- [Tailwind CSS 4](https://tailwindcss.com)
- Adaptador de [Netlify](https://docs.astro.build/en/guides/integrations-guide/netlify/): la mayoría de las páginas son estáticas; `/community` y `/dashboard` se renderizan en el servidor (`prerender = false`)
- pnpm `10.32.0` (fijado en `packageManager`)

## 🔄 Cómo fluyen los datos

```text
                 ┌──────────────────────────┐
  /dashboard ───►│  API (share-it-web-      │◄─── /community (SSR)
  (React, JWT)   │  backend) /api/v1        │     fetchGroups(), fetchEvents()
  crea / edita / │  groups · referents ·    │     timeout 3 s
  borra          │  events · auth/token     │
                 └──────────────────────────┘
                                │ si falla, tarda o viene vacía
                                ▼
                   constantes locales (fallback)
                   channels.const.ts · events.const.ts
```

- **Sitio público**: `/community` pide grupos y eventos a la API en cada request ([`src/modules/community/services/`](src/modules/community/services/)). Si la API falla, tarda más de 3 s o devuelve una lista vacía, se usan las constantes de `src/modules/global/constants/`, así el sitio nunca queda en blanco.
- **Panel**: `/dashboard` hace login contra `POST /auth/token` y guarda el token en `sessionStorage`. Las escrituras (POST/PATCH/DELETE) van con `Authorization: Bearer`. La página no está enlazada desde el sitio y tiene `noindex, nofollow`.
- Las fechas de los eventos viajan en UTC (ISO); el panel las edita en la hora local del navegador y el sitio las muestra en hora de Argentina.

## 🗂️ Estructura del Proyecto

```text
/
├── public/                    # Imágenes estáticas, favicon, fuentes
├── docs/
│   └── dashboard-e2e.md       # Guía para levantar front + back y probar el panel
├── rules/                     # Convenciones de ramas, commits y contribución
├── src/
│   ├── content.config.ts      # Colección de artículos del blog
│   ├── modules/
│   │   ├── about-us/
│   │   ├── blog/              # Artículos en Markdown (content/articles)
│   │   ├── community/
│   │   │   ├── components/    # Tarjetas de grupos y modales de referentes
│   │   │   ├── constants/     # Referentes e íconos de grupos (fallback)
│   │   │   └── services/      # groups.service.ts, events.service.ts (cliente de la API)
│   │   ├── dashboard/         # Panel de administración (React)
│   │   ├── global/
│   │   │   ├── constants/     # channels.const.ts, events.const.ts (fallback)
│   │   │   ├── layouts/
│   │   │   └── utils/         # events.utils.ts (estado y agrupación de eventos)
│   │   ├── home/
│   │   ├── resources/         # Componentes de eventos (UpcomingEventCard, Events)
│   │   └── rules/
│   └── pages/
│       ├── index.astro
│       ├── community.astro    # SSR: grupos y eventos desde la API
│       ├── dashboard.astro    # SSR: monta el panel (client:only)
│       ├── articles.astro, articles/, tags/
│       ├── resources.astro, aboutUs.astro, rules.astro
│       └── 404.astro
└── package.json
```

### Panel de administración (`src/modules/dashboard/`)

Cada sección (Grupos, Referentes, Eventos) sigue el mismo patrón: **panel → tarjeta → modal**, apoyado en piezas compartidas.

| Archivo | Rol |
| :-- | :-- |
| `GroupsPanel.tsx` | Raíz del panel: login, sesión, carga inicial de las tres colecciones y sección de grupos |
| `ReferentsPanel.tsx`, `EventsPanel.tsx` | Secciones de referentes y eventos |
| `DashboardShell.tsx` | Layout (sidebar, navegación móvil) y `DashboardHeading`, `DashboardToolbar`, `DashboardState` |
| `DashboardCard.tsx` | Tarjeta genérica; `GroupCard`, `ReferentCard` y `EventCard` solo le pasan datos |
| `Modal.tsx` | Diálogo común: título, cerrar, errores, Guardar y borrado con confirmación (`ConfirmDialog.tsx`) |
| `fields.tsx` | Campos de formulario (`Field`, `TextAreaField`, `ImageUrlField`) y sus clases |
| `useCrud.ts` | Hook de alta/edición/borrado contra la API (401 → cierra sesión, errores 422 legibles) |
| `useBackdropClose.ts` | Cierra un `<dialog>` solo con un clic real en el fondo |
| `types.ts` | Tipos de la API (`Group`, `Referent`, `EventItem` y sus `*Body`) |

**Agregar una sección nueva:** define sus tipos en `types.ts`, crea `XCard` sobre `DashboardCard`, `XModal` sobre `Modal` + `fields.tsx`, y `XPanel` con `useCrud`. Luego súmala a `DashboardSection` en `DashboardShell.tsx` y a la carga inicial de `GroupsPanel.tsx`.

## 💻 Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/ShareIT-Community/share-it-web.git
   cd share-it-web
   ```

2. Instala las dependencias (con `corepack enable` se usa la versión de pnpm del proyecto):

   ```bash
   pnpm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   pnpm dev
   ```

4. Abre `http://localhost:4321` 🌐

Sin backend el sitio funciona igual con los datos de las constantes, pero `/dashboard` no puede iniciar sesión. Para levantar la API local (Docker, seeds y usuario admin) sigue la [guía E2E del dashboard](docs/dashboard-e2e.md).

### Variables de entorno

| Variable | Default | Uso |
| :-- | :-- | :-- |
| `PUBLIC_API_URL` | `http://localhost:8000/api/v1` | Base de la API, incluye `/api/v1` |

Se define en un `.env` en la raíz. El CORS del backend solo acepta `http://localhost:4321` y `https://share-it.tech`: en local usa `localhost`, no `127.0.0.1`.

## 🧞 Comandos

| Comando | Acción |
| :-- | :-- |
| `pnpm install` | Instala las dependencias |
| `pnpm dev` | Servidor de desarrollo en `localhost:4321` |
| `pnpm build` | Build de producción en `./dist/` |
| `pnpm preview` | Previsualiza la build localmente |
| `pnpm astro -- --help` | Ayuda del CLI de Astro |

> Los scripts `security-test` y `test:*` de `package.json` apuntan a `scripts/penetration-test.mjs`, que no existe en el repo; por ahora no funcionan.

## 📄 Gestionar Contenido

### Grupos, referentes y eventos

Se gestionan desde **`/dashboard`** con una cuenta admin (se crea en el backend con `create_admin`, ver la [guía E2E](docs/dashboard-e2e.md)). Los cambios se ven en `/community` al recargar, sin redeploy.

Las constantes `src/modules/global/constants/channels.const.ts` y `events.const.ts` quedan solo como **respaldo** cuando la API no responde. El backend también las usa como origen de sus seeds (`scripts/export_*_seed.mjs`), así que si las cambias, regenera los seeds.

Forma de un evento en la API:

```typescript
{
  title: 'Nombre del Evento',
  description: 'Descripción breve',
  type: 'meetup' | 'workshop',
  start_at: '2026-11-20T22:00:00Z', // UTC
  end_at: '2026-11-20T23:30:00Z',
  location: 'Discord',              // opcionales (null)
  speaker: 'Nombre',
  site: 'https://...',
  media: 'https://...',             // grabación o imagen para eventos pasados
  repository: 'https://...',
}
```

El estado (`próximo`, `en vivo`, `pasado`) se calcula a partir de `start_at` y `end_at`.

### Artículos

Los artículos son archivos Markdown en `src/modules/blog/content/articles/`.

## 🤝 Contribuir

Para añadir artículos debes ser parte de nuestra comunidad. El contenido es revisado antes de publicarse. Si deseas contribuir, únete primero a uno de nuestros canales de la comunidad.

Para código, sigue las convenciones de [`rules/`](rules/): [ramas](rules/branchs.md), [commits](rules/commits.md) y [contribución](rules/CONTRIBUTING.md).

## 🚀 Releases

| Versión  | Descripción                     |
| :------- | :------------------------------ |
| `v3.0.0` | Community & Events Overhaul     |
| `v2.0.0` | Rediseño de página de comunidad |
| `v1.0.0` | Versión inicial del blog        |

## 🔗 Links

- [Share IT Community](https://github.com/ShareIT-Community)
- [Backend: share-it-web-backend](https://github.com/ShareIT-Community/share-it-web-backend)
- [Guía E2E del dashboard (local)](docs/dashboard-e2e.md)
- [Elias Velazquez 👨🏻‍💻](https://github.com/eliasvelazquezdev)
- [Documentación de Astro](https://docs.astro.build)

---

**¡Gracias por visitar Share IT! 🙌**
