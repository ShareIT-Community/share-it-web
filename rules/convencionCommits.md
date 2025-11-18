# 📜 Commit Convention

This document defines the rules for writing clear and standardized
commit messages, based on the **Conventional Commits** specification.

------------------------------------------------------------------------

## 🤔 Why Use Conventional Commits?

-   **Automation:** Enables automatic generation of `CHANGELOG`s.
-   **Clarity:** Makes it easier to understand the change history at a
    glance.
-   **Traceability:** Helps identify what type of change each commit
    introduces (a new feature, a fix, etc.).
-   **Integration:** A widely recognized standard supported by many
    development tools.

------------------------------------------------------------------------

## 🧱 Commit Structure

A commit message must follow the format:

    <type>[optional scope]: <description>

    [optional body]

    [optional footer]

------------------------------------------------------------------------

### 🔸 1. Type

The **type** is mandatory and describes the nature of the change. It
must be one of the following:

  --------------------------------------------------------------------------------
  Type             Description
  ---------------- ---------------------------------------------------------------
  **`feat`**       **Feature.** Introduces a new functionality.

  **`fix`**        **Bug Fix.** Fixes an error or bug in the code.

  **`docs`**       **Documentation.** Documentation-only changes (guides, READMEs,
                   etc.).

  **`style`**      Changes that do not affect code logic (formatting, whitespace,
                   semicolons, etc.).

  **`refactor`**   Code changes that neither fix a bug nor add a feature, but
                   improve structure.

  **`test`**       Adds or updates tests (unit, integration, etc.).

  **`chore`**      **Maintenance tasks**, build changes, config updates, etc. No
                   production code impact.

  **`perf`**       **Performance.** Code changes that improve performance.

  **`ci`**         Changes to CI configuration files or scripts.

  **`revert`**     Reverts a previous commit.
  --------------------------------------------------------------------------------

------------------------------------------------------------------------

### 🔹 2. Scope (Optional)

The **scope** is a noun describing the section of the code affected by
the change.

**Examples:** `feat(api): ...`\
`fix(login): ...`\
`refactor(profile-page): ...`

------------------------------------------------------------------------

### 📝 3. Description

-   A **brief and concise** summary of the change.
-   Written in **lowercase**, without a trailing period.
-   Written in **imperative mood** ("add" instead of "added" or
    "adding").

------------------------------------------------------------------------

### 📄 4. Body (Optional)

-   Provides **additional context** about the change.
-   Explains **what** and **why**, not the *how*.
-   Separated from the description by a blank line.

------------------------------------------------------------------------

### 🦶 5. Footer (Optional)

-   Used to reference **GitHub issues** or indicate **breaking
    changes**.
-   **Breaking Change:** If a commit introduces a change that breaks
    compatibility, include `BREAKING CHANGE:` in the footer.

------------------------------------------------------------------------

## ✅ Commit Examples

**Simple commit (only description):**

    feat: allow users to update their profile picture

**Commit with scope:**

    fix(auth): correct redirect after login

**Commit with body:**

    docs: update contribution guide

    Adds a section about branch naming and fixes formatting issues in tables.

**Commit with Breaking Change:**

    refactor(api): simplify user endpoint

    BREAKING CHANGE: The `/users/{id}` endpoint now returns an object
    with a `data` key instead of returning the user directly.

------------------------------------------------------------------------

## 🔗 Official Reference

For more details, see the official specification:\
[**Conventional Commits
Specification**](https://www.conventionalcommits.org/)
