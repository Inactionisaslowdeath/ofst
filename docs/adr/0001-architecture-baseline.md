# ADR 0001: Architecture, Modular Seams, and Testing Discipline

## Context

The initial codebase contained a monolithic `App.tsx` (over 1,400 lines) coupling page layout, raw window event listeners, smooth scroll controller lifecycles, and inlined data arrays. Furthermore, `ThemeToggle.tsx` contained ~880 lines of unused debugger GUI panels, and the project lacked automated test verification or type-checking scripts.

## Decision

1. **Deep Presentation Modules**: Decompose UI into focused components under `src/components/` (`StickyNavigation`, `ParallaxGallery`, `ProjectShowcase`, `VideoShowcase`, `TextRoll`) presenting minimal prop seams to callers.
2. **Domain Content Separation**: Decouple domain data from rendering trees into `src/data/content.ts` with strongly-typed interfaces aligned with `GLOSSARY.md`.
3. **Automated Verification**: Use Vitest + React Testing Library for automated regression checking at public component seams, paired with strict `tsc --noEmit` validation.
4. **Minimalist Theme Seam**: Retain the high-performance radial View Transitions theme toggling while eliminating unreachable demo panels.

## Consequences

- Direct testability of individual components in isolation without mounting the entire application shell.
- Faster development and AI-navigation velocity with reduced token context per file.
- Clean separation of concern between content changes and rendering structure.
