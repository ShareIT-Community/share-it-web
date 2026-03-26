# 🧭 Contribution Guide

This document defines the rules and workflow that must be followed when contributing to the project.  
The goal is to maintain clear organization, task traceability, and code quality.

---

## 📋 1. Task Definition

Before starting any development or code modification, **all tasks must be created in the GitHub _Projects_ section**.  
Each task must include the following properties:

### 🔸 Priority

**Priority** indicates the urgency or importance of the task:

| Code | Description                                                                                                   |
| :---- | :------------------------------------------------------------------------------------------------------------ |
| **P0** | **Critical / Essential.** Must be resolved immediately. Affects core functionality or blocks other tasks.     |
| **P1** | **High.** Important but not blocking. Should be solved soon to maintain project flow.                         |
| **P2** | **Medium or Low.** Improvement, refactor, or adjustment that can be postponed without immediate impact.       |

---

### 🔹 Size

**Size** represents the complexity or effort required to complete the task:

| Code | Description                                                          |
| :---- | :------------------------------------------------------------------- |
| **XS** | Minimal or trivial changes (typos, small style fixes, etc.).        |
| **S**  | Small, low-risk tasks (a simple component or endpoint).             |
| **M**  | Medium complexity, may involve multiple files or dependencies.      |
| **L**  | Large or high-impact system changes.                                |
| **XL** | Major refactors or implementations affecting multiple areas.        |

> ⚙️ **Tasks sized XS and S may be auto-merged** (no mandatory review).

---

## 🧑‍💻 2. Task Assignment and Tracking

- If a collaborator chooses to work on a task, they must **assign themselves as the owner** within the _Project_.
- Then, move the task to the correct column according to its status:

| Status        | Description                                         |
| :------------ | :-------------------------------------------------- |
| **Analysis**  | Analysis or planning phase before development.      |
| **To Do**     | Pending to start.                                   |
| **In Progress** | Currently being developed.                         |
| **In Review** | Code completed and pending review.                  |
| **Done**      | Task approved and merged.                           |
| **Stoper**    | Task paused or blocked by external dependencies.    |

> All coding or modifications must be **registered and updated in the same _Project_**, ensuring traceability.

---

## 🪶 3. Commit Convention

All commit messages must follow the convention described in the following document:

👉 [**View commit convention**](./convencionCommits.md)

---

## 🚀 4. Pull Requests (PR)

Rules for opening, reviewing, and approving PRs are detailed in:

👉 [**View Pull Request Convention**](./convencionBranchs.md)

Summary:

- PRs must be linked to a task in the _Project_.
- PRs sized **XS / S** may be **self-approved**.
- PRs sized **M / L / XL** must be **reviewed and approved by the merge responsible (Mersh)**.

---

## ✅ 5. Best Practices

- Keep commits clear, concise, and descriptive.
- Follow the project's coding conventions.
- Do not merge directly into the main branch without following the review workflow.
- Consult the team before starting large or high-priority tasks (P0 or P1).
- Maintain active communication within tasks and PRs.

