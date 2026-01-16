# 📘 ShareIT Guide

## 1. 🌳 Branch Convention (GitHub Flow)

  -----------------------------------------------------------------------------------
  Branch            Purpose                           Naming Convention
  ----------------- --------------------------------- -------------------------------
  **main**          Contains production-ready code.   `main`
                    Always stable.                    

  **Feature**       Development of a new feature.     `feature/<short-description>`

  **Bugfix**        Fixing an issue or bug.           `fix/<short-description>` or
                                                      `bugfix/<issue-id>`

  **Maintenance**   Non-feature, non-bug tasks (e.g., `chore/<short-description>`
                    updating dependencies).           
  -----------------------------------------------------------------------------------

### Workflow

1.  Create a new branch from `main` for any change.\
    Example:

    ``` bash
    git checkout -b feature/dark-theme
    ```

2.  Develop and commit following the Commit Convention.

3.  Push the branch and open a Pull Request (PR) to `main`.

4.  Once approved, merge it into `main`.

5.  Delete the branch after merging.

------------------------------------------------------------------------

## 2. Pull Request (PR) Convention

A well-structured PR makes code review easier and speeds up integration.

### PR Title

Must be concise and follow the commit convention.

Example:

    feat(ui): implement dark theme

------------------------------------------------------------------------

## Pull Request Description Template

### Description

Brief summary of the changes made.

### Problem / Context

Why is this change needed? - Closes/Relates to issue:
\#`<Issue-Number>`{=html}

### Type of Change

-   [ ] New feature (`feat`)
-   [ ] Bug fix (`fix`)
-   [ ] Documentation (`docs`)
-   [ ] Refactor (`refactor`)
-   [ ] Maintenance task (`chore`)
-   [ ] Style/Formatting (`style`)

### Review Checklist

-   [ ] All unit/integration tests pass.
-   [ ] Necessary documentation has been updated.
-   [ ] The target branch is correct (`main`).
-   [ ] No merge conflicts with the base branch.

### How to Test / Reproduction Steps

1.  Run `npm start`.
2.  Navigate to `/login`.
3.  Verify the new validation component is working.

------------------------------------------------------------------------

## Code Review Rules

### Reviewer Assignment

Assign at least one team member if needed.\
Anyone may take a PR and review it.\
Static or trivial changes may be self-approved.
