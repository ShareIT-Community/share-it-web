# 🧭 Guía de Contribución

Este documento define las reglas y el flujo de trabajo que deben seguirse para contribuir al proyecto.  
El objetivo es mantener una organización clara, trazabilidad de tareas y calidad en el código.

---

## 📋 1. Definición de Tareas

Antes de comenzar cualquier desarrollo o modificación de código, **todas las tareas deben definirse en la sección _Projects_ de GitHub**.  
Cada tarea debe contar con las siguientes propiedades:

### 🔸 Prioridad (Priority)

La **prioridad** indica el nivel de urgencia o importancia de la tarea:

| Código | Descripción                                                                                                              |
| :----- | :----------------------------------------------------------------------------------------------------------------------- |
| **P0** | **Crítica / Primordial.** Debe resolverse de forma inmediata. Afecta el funcionamiento principal o bloquea otras tareas. |
| **P1** | **Alta.** Importante pero no bloqueante. Debe resolverse pronto para mantener el flujo del proyecto.                     |
| **P2** | **Media o baja.** Mejora, refactor o ajuste que puede postergarse sin impacto inmediato.                                 |

---

### 🔹 Tamaño (Size)

El **tamaño** representa la complejidad o el esfuerzo requerido para completar la tarea:

| Código | Descripción                                                         |
| :----- | :------------------------------------------------------------------ |
| **XS** | Cambios mínimos o triviales (ortografía, pequeños estilos, etc.).   |
| **S**  | Tareas pequeñas y de bajo riesgo (un componente o endpoint simple). |
| **M**  | Complejidad media, puede involucrar varios archivos o dependencias. |
| **L**  | Cambios amplios o de alto impacto en el sistema.                    |
| **XL** | Refactors o implementaciones grandes que afectan múltiples áreas.   |

> ⚙️ **Las tareas de tamaño XS y S pueden ser auto-mergeadas** (sin revisión obligatoria).

---

## 🧑‍💻 2. Asignación y Seguimiento de Tareas

- Si un colaborador decide trabajar en una tarea, debe **asignarse a sí mismo como responsable** dentro del _Project_.
- Luego, mover la tarea a la columna correspondiente según el estado:

| Estado          | Descripción                                            |
| :-------------- | :----------------------------------------------------- |
| **Analysis**    | Fase de análisis o planificación previa al desarrollo. |
| **To Do**       | Pendiente de iniciar.                                  |
| **In Progress** | En desarrollo activo.                                  |
| **In Review**   | Código finalizado y en proceso de revisión.            |
| **Done**        | Tarea aprobada y mergeada.                             |
| **Stoper**      | Tarea en pausa o bloqueada por dependencias externas.  |

> Toda codificación o alteración debe quedar **declarada y actualizada en el mismo _Project_**, para asegurar trazabilidad.

---

## 🪶 3. Convención de Commits

Todos los mensajes de commit deben seguir la convención establecida en el siguiente documento:

👉 [**Ver convención de commits**](./convencionCommits.md)

---

## 🚀 4. Pull Requests (PR)

Las reglas de apertura, revisión y aprobación de PR se encuentran detalladas en:

👉 [**Ver convención de Pull Requests**](./convencionPR.md)

A modo de resumen:

- Los PR deben estar vinculados a una tarea del _Project_.
- Los PR de tamaño **XS / S** pueden **autoautorizarse**.
- Los PR de tamaño **M / L / XL** deben ser **revisados y aprobados por el responsable de merge (Mersh)**.

---

## ✅ 5. Buenas Prácticas

- Mantener commits claros, breves y descriptivos.
- Seguir las convenciones de código del proyecto.
- No mergear directamente a la rama principal sin seguir el flujo de revisión.
- Consultar al equipo antes de iniciar tareas grandes o de prioridad alta (P0 o P1).
- Mantener comunicación activa dentro de las tareas y PRs.
