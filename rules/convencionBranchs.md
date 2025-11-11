# 🌿 Convención de Ramas y Pull Requests

Este documento define el flujo de trabajo y las reglas para la creación y gestión de ramas y Pull Requests (PRs) en el proyecto.

---

## 🌳 1. Flujo de Ramas

El flujo de trabajo se basa en **crear una rama por cada tarea**. Cada rama debe estar asociada a una corrección (`fix`), una nueva característica (`feature`) o una refactorización (`refactor`).

### 🔸 Nomenclatura de Ramas

Para mantener la consistencia, todas las ramas deben seguir estas reglas:

- **Idioma:** Escribir nombres en **inglés**.
- **Separador:** Usar **guiones medios** (`-`) para separar palabras.
- **Minúsculas:** Todo el nombre debe estar en minúsculas.
- **Autor:** Incluir el **nombre del autor** al inicio.
- **Sin caracteres especiales:** No usar números de issues o símbolos.

---

### 🔹 Ejemplos de Nomenclatura

| Tipo            | Ejemplo Válido                             | Ejemplo Inválido                              |
| :-------------- | :----------------------------------------- | :-------------------------------------------- |
| **Feature**     | `vic/reports-generator`                    | `vic-reports-generator-#3` (usa número)       |
| **Feature**     | `azza/auth-module`                         | `Azza/AuthModule` (usa mayúsculas)            |
| **Refactor**    | `justin/customer-management-refactor`      | `justin/customer_management` (usa guion bajo) |
| **Alternativa** | `justin/customer-management-attempt-three` |                                               |

---

### 🗑️ Eliminación de Ramas

- Una vez que una rama se ha integrado en `dev` a través de un PR, **debe ser eliminada** desde GitHub.
- Si se necesitan cambios futuros sobre la misma funcionalidad, se debe crear una **nueva rama** a partir de `dev`.

**Ejemplo:**
Si `vic/form-fix` fue integrada, para un nuevo cambio se podría crear `vic/form-fix-add-validation`.

---

## 🚀 2. Pull Requests (PR)

Un Pull Request (PR) es el mecanismo para proponer cambios y solicitar su integración en otra rama (generalmente `dev` o `main`).

### 🔸 Reglas para Pull Requests

1.  **Vincular a una Tarea:** Todo PR debe estar **vinculado a una tarea existente** en el _Project_ de GitHub. Esto asegura que cada cambio tiene un propósito definido y trazable.

2.  **PR Pequeños y Enfocados:** Cada PR debe resolver **una sola tarea**. Evita mezclar correcciones, nuevas funcionalidades y refactors en un mismo PR.

3.  **Auto-aprobación (Auto-Merge):**

    - Los PRs marcados con tamaño **XS** o **S** pueden ser **auto-aprobados y mergeados por su autor**.
    - Esto aplica a cambios menores como correcciones de texto, ajustes de estilos o bugs triviales.

4.  **Revisión Obligatoria:**
    - Los PRs de tamaño **M**, **L**, o **XL** requieren la **revisión y aprobación de al menos un miembro del equipo** antes de ser mergeados.
    - El responsable de merge (conocido como "Mersh") tiene la última palabra en la aprobación.

---

## 🧭 3. Ejemplo de Flujo Completo

**Caso:** Un desarrollador llamado `Azza` necesita refactorizar el módulo de reportes.

1.  **Crear Tarea:** Azza crea una tarea en el _Project_ de GitHub con `Size: M` y `Priority: P2`.
2.  **Asignar Tarea:** Se asigna la tarea a sí mismo y la mueve a "In Progress".
3.  **Crear Rama:** Crea una nueva rama desde `dev`: `azza/reports-generator-refactor`.
4.  **Desarrollar:** Realiza los cambios y los commitea siguiendo la [convención de commits](./convencionCommits.md).
5.  **Crear Pull Request:** Abre un PR desde `azza/reports-generator-refactor` hacia `dev`. En la descripción, vincula el PR a la tarea del _Project_.
6.  **Revisión:** Al ser tamaño `M`, el PR es revisado y aprobado por otro miembro del equipo.
7.  **Merge:** Una vez aprobado, Azza mergea el PR a `dev`.
8.  **Limpieza:** Finalmente, elimina la rama `azza/reports-generator-refactor`.

---

## 📄 Archivos Relacionados

- [**Guía de Contribución**](./CONTRIBUTING.md)
- [**Convención de Commits**](./convencionCommits.md)
