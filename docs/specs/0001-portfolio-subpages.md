# Spec 0001: Portfolio Subpages & Navigation State Model

- **Status**: Implemented / Active
- **Author**: Senior Principal Engineer
- **Date**: October 19, 2026
- **Governing Standard**: 24 Foundational Engineering Principles

## 1. Objective
Establish a robust, accessible, and high-performance client-side navigation architecture for the OFST portfolio, supporting seamless transitions between the main showcase (`home`), projects catalog (`catalog`), inquiry page (`contact`), studio narrative (`about`), and individual case study deep views (`project`).

## 2. Architecture & State Management
Navigation is modeled as a strictly typed discriminated union in [`src/App.tsx`](file:///c:/Users/user/Desktop/OFST/src/App.tsx):

```ts
export type ViewState =
  | { view: "home" }
  | { view: "catalog" }
  | { view: "contact" }
  | { view: "about" }
  | { view: "project"; projectId: number }
```

### State Transitions
- State transitions are managed via `setViewState(newState)`.
- Transitions synchronize with the browser History API (`window.history.pushState` and `window.addEventListener("popstate", ...)`), enabling native browser forward and back navigation.
- Body scroll locking during subpage/overlay views is managed through the centralized, reference-counted `useScrollLock` hook (`src/hooks/useScrollLock.ts`), preventing page jump and scroll leaks.

## 3. Motion & UX Requirements
- **Transition Duration**: Page transitions must execute in under 500ms (configured at `0.45s` with `[0.16, 1, 0.3, 1]` ease).
- **Composite Properties Only**: Animating layout properties (`width`, `height`, `margin`, `padding`) is strictly prohibited. Only `transform` and `opacity` are animated.
- **Scroll Restoration**: Navigating back to `home` returns scroll position smoothly without layout jumping.

## 4. Verification & Testing
- Unit tests cover each subpage component (`AboutPage.test.tsx`, `ContactSection.test.tsx`, etc.).
- History API popstate transitions are verified to handle both null states and valid `ViewState` snapshots.
