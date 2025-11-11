# 📜 Convención de Commits

Este documento establece las reglas para escribir mensajes de commit claros y estandarizados, basados en la especificación de **Conventional Commits**.

---

## 🤔 ¿Por Qué Usar Conventional Commits?

- **Automatización:** Permite generar `CHANGELOGs` automáticamente.
- **Claridad:** Facilita la comprensión del historial de cambios de un vistazo.
- **Trazabilidad:** Ayuda a identificar qué tipo de cambio introduce cada commit (una nueva función, una corrección, etc.).
- **Integración:** Es un estándar reconocido por muchas herramientas de desarrollo.

---

## 🧱 Estructura de un Commit

Un mensaje de commit debe seguir el siguiente formato:

```
<tipo>[ámbito opcional]: <descripción>

[cuerpo opcional]

[pie opcional]
```

---

### 🔸 1. Tipo (Type)

El **tipo** es obligatorio y define la naturaleza del cambio. Debe ser uno de los siguientes:

| Tipo         | Descripción                                                                                             |
| :----------- | :------------------------------------------------------------------------------------------------------ |
| **`feat`**   | **(Feature)** Introduce una nueva funcionalidad al código.                                              |
| **`fix`**    | **(Bug Fix)** Corrige un error o bug en el código.                                                      |
| **`docs`**   | **(Documentation)** Cambios exclusivos en la documentación (guías, READMEs, etc.).                    |
| **`style`**  | Cambios que no afectan la lógica del código (formato, espacios, punto y coma, etc.).                    |
| **`refactor`** | Cambios en el código que no corrigen un error ni añaden una función, sino que mejoran la estructura. |
| **`test`**   | Añade o modifica pruebas (unitarias, de integración, etc.).                                             |
| **`chore`**  | **(Chores)** Tareas de mantenimiento, builds, configuración, etc. No afecta el código de producción.   |
| **`perf`**   | **(Performance)** Un cambio de código que mejora el rendimiento.                                        |
| **`ci`**     | Cambios en los archivos y scripts de configuración de CI (Integración Continua).                        |
| **`revert`** | Revierte un commit anterior.                                                                            |

---

### 🔹 2. Ámbito (Scope) - Opcional

El **ámbito** es un sustantivo que describe la sección del código afectada por el cambio.

**Ejemplos:**
`feat(api): ...`
`fix(login): ...`
`refactor(profile-page): ...`

---

### 📝 3. Descripción (Description)

- Una descripción **breve y concisa** del cambio.
- En **minúsculas** y sin punto final.
- Escrita en **imperativo** (ej: "añade" en lugar de "añadido" o "añadiendo").

---

### 📄 4. Cuerpo (Body) - Opcional

- Proporciona **contexto adicional** sobre el cambio.
- Explica el "qué" y el "porqué" del cambio, no el "cómo".
- Se separa de la descripción con una línea en blanco.

---

### <footer> 5. Pie (Footer) - Opcional

- Se utiliza para hacer referencia a **issues de GitHub** o para indicar **cambios que rompen la compatibilidad (Breaking Changes)**.
- **Breaking Change:** Un commit que introduce un cambio que rompe la compatibilidad con versiones anteriores debe indicarlo con `BREAKING CHANGE:` en el pie.

---

## ✅ Ejemplos de Commits

**Commit simple (solo descripción):**
```
feat: permitir que el usuario actualice su foto de perfil
```

**Commit con ámbito:**
```
fix(auth): corregir redirección después del login
```

**Commit con cuerpo:**
```
docs: actualizar la guía de contribución

Se añade una sección sobre la nomenclatura de ramas y se
corrigen errores de formato en las tablas.
```

**Commit con Breaking Change:**
```
refactor(api): simplificar el endpoint de usuarios

BREAKING CHANGE: El endpoint `/users/{id}` ahora devuelve un objeto
con la clave `data` en lugar de devolver el usuario directamente.
```

---

## 🔗 Referencia Oficial

Para más detalles, consulta la especificación oficial:
[**Conventional Commits Specification**](https://www.conventionalcommits.org/)
