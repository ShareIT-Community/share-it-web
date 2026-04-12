![blog-logo](https://github.com/user-attachments/assets/abe6f530-723e-4d4d-8924-2b6d40cd58c8)

# Share IT 🚀

> **v3.0.0** — Community & Events Overhaul

Bienvenido a **Share IT**. Somos una comunidad unida por el deseo de aprender, compartir conocimientos y crecer juntos en el ámbito tecnológico. Este es un rincón para intercambiar conocimientos y experiencias que nos han guiado y ayudado en nuestro recorrido. ☀️

## ✨ Funcionalidades

- 🗓️ Sistema de eventos con estado dinámico (próximo, en vivo, pasado)
- 👥 Sección de comunidad con grupos de Discord y WhatsApp
- 🎙️ Sección de Workshops con historial de sesiones pasadas
- 🌐 Soporte para múltiples zonas horarias en eventos
- 🤝 Página de colaboradores y autores

## 🗂️ Estructura del Proyecto

```text
/
├── public/
│   ├── images/
│   │   └── groups/          # Avatares de grupos de comunidad
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── content.config.ts
│   ├── modules/
│   │   ├── about-us/
│   │   ├── blog/
│   │   ├── community/       # Tarjetas de grupos (Discord, WhatsApp)
│   │   ├── global/
│   │   │   ├── constants/   # events.const.ts, channels.const.ts
│   │   │   └── utils/       # events.utils.ts
│   │   ├── home/
│   │   ├── resources/       # UpcomingEventCard, Events components
│   │   └── rules/
│   └── pages/
│       ├── index.astro
│       ├── articles.astro
│       ├── community.astro  # Página principal de comunidad
│       ├── resources.astro
│       ├── aboutUs.astro
│       ├── rules.astro
│       ├── articles/
│       └── tags/
└── package.json
```

## 💻 Instalación

Para ejecutar este proyecto localmente, sigue estos pasos:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/ShareIT-Community/share-it-web.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd share-it-web
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

5. Abre tu navegador y ve a `http://localhost:4321` 🌐

## 🧞 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto:

| Comando                   | Acción                                                     |
| :------------------------ | :--------------------------------------------------------- |
| `npm install`             | Instala las dependencias                                   |
| `npm run dev`             | Inicia el servidor de desarrollo local en `localhost:4321` |
| `npm run build`           | Construye el sitio de producción en `./dist/`              |
| `npm run preview`         | Previsualiza la build localmente, antes de desplegar       |
| `npm run astro ...`       | Ejecuta comandos CLI como `astro add`, `astro check`       |
| `npm run astro -- --help` | Obtén ayuda usando el CLI de Astro                         |

## 📄 Añadir Contenido

### Eventos

Los eventos se gestionan en `src/modules/global/constants/events.const.ts`. Cada evento tiene la siguiente forma:

```typescript
{
  title: 'Nombre del Evento',
  description: 'Descripción breve',
  date: '2026-MM-DD',       // o undefined para "TBD"
  time: 'HH:MM',
  type: 'meetup' | 'workshop',
  link: 'https://...',
}
```

El estado del evento (`próximo`, `en vivo`, `pasado`) se calcula automáticamente en el cliente.

## 🤝 Contribuir

Para añadir artículos debes ser parte de nuestra comunidad. El contenido es revisado antes de publicarse. Si deseas contribuir, únete primero a uno de nuestros canales de la comunidad.

## 🚀 Releases

| Versión  | Descripción                     |
| :------- | :------------------------------ |
| `v3.0.0` | Community & Events Overhaul     |
| `v2.0.0` | Rediseño de página de comunidad |
| `v1.0.0` | Versión inicial del blog        |

## 🔗 Links

- [Share IT Community](https://github.com/ShareIT-Community)
- [Elias Velazquez 👨🏻‍💻](https://github.com/eliasvelazquezdev)
- [Documentación de Astro](https://docs.astro.build)

---

**¡Gracias por visitar Share IT! 🙌**
