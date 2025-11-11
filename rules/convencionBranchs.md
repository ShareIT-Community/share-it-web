```markdown
# 🌿 Web ShareIT — Convención de Ramas y Colaboración

Este documento define el flujo de trabajo y las reglas para la creación, mantenimiento y eliminación de ramas dentro del proyecto **Web ShareIT**.

---

## 🔁 Flujo Básico

El flujo básico consiste en **crear una rama para cada tarea en curso**.  
Cada rama puede involucrar:

- Una **corrección** (fix)
- Una **refactorización** del código existente
- La **adición de nuevas funcionalidades**

---

## 🧱 Nueva Convención de Nombres para Ramas

Las ramas deben seguir las siguientes reglas de nomenclatura:

- Utilizar nombres **en inglés**, sin excepción.
- Usar **guiones medios** (`-`) para separar palabras.
- Escribir **solo en minúsculas**.
- Añadir al **inicio** el nombre del **dueño de la rama**.
- **No incluir números ni símbolos especiales**.

### ✅ Ejemplos válidos
```

azza-auth-module
vic-reports-generator
justin-customer-management

```

### ❌ Ejemplos inválidos
```

justin-customer-management-#3 (inválido)

```

### 🔁 Alternativa válida
```

justin-customer-management-attempt-three

```

---

## 🗑️ Eliminación de Ramas

Cuando una tarea finaliza y se integra en la rama **dev**,
la rama correspondiente puede eliminarse **si ya no será utilizada**.

Si en el futuro se requieren mejoras o correcciones, se debe **crear una nueva rama** que indique su propósito de forma clara.

### Ejemplo:
```

vic-form-fix-remove-linkedin-field

```

---

## 🧭 Ejemplo de Flujo de Trabajo

**Caso:** Generador de Reportes (`reports-generator`)

1. **Creación Inicial**
   La rama original que añadió este módulo al código se llamó:
   `azza-reports-generator`

2. **Integración**
   Los cambios se probaron localmente y luego se integraron en `dev` mediante un **Pull Request (PR)**.

3. **Limpieza**
   Tras su integración, la rama `azza-reports-generator` fue eliminada.

4. **Refactorización Posterior**
   Una semana más tarde, se necesitó reorganizar la estructura de carpetas del módulo.
   Como `dev` contenía los últimos cambios, se creó una nueva rama:
   `azza-reports-generator-new-folder-hierarchy`

5. **Preparación**
   Se aplicaron los cambios y la rama quedó lista para revisión.

6. **Pull Request**
   Se creó un **PR** que solo contenía estos cambios para fusionar
   `azza-reports-generator-new-folder-hierarchy` → `dev`.

7. **Fusión a Main**
   Una vez que `dev` pasó las pruebas y estaba estable, se creó un **PR** para fusionar
   `dev` → `main`.

8. **Despliegue y Limpieza**
   El PR fue aprobado, los cambios se desplegaron a producción,
   y posteriormente se eliminó la rama `azza-reports-generator-new-folder-hierarchy`.

---

## 📄 Archivos Relacionados

- [Convención de Pull Requests](./convencionPR.md)
- [Convención de Commits](./convencionCommits.md)
```

---

https://share-it-conventions.vercel.app/
