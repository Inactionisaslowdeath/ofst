# ADR 0002: Modular Presentation Decomposition and Unified Motion Architecture

## Context

Following the initial baseline (ADR 0001), `App.tsx` remained overly coupled (~1,080 lines), directly implementing section-specific state machines (process timer, FAQ toggles, contact form status), redundant scroll listeners, and duplicated motion primitives. Furthermore, the build included orphaned modules (`VideoShowcase`, `TextRoll`) and unneeded transitive dependencies.

## Decision

1. **Section Decomposition**: Extract all primary page sections into dedicated modules under `src/components/`:
   - `AboutSection.tsx`
   - `ServicesSection.tsx`
   - `ProcessSection.tsx`
   - `TestimonialsSection.tsx`
   - `MetricsSection.tsx`
   - `FaqSection.tsx`
   - `ContactSection.tsx`
   - `FooterSection.tsx`
   - `PartnerLogos.tsx`
2. **Centralized Motion Primitives**: Consolidate `Counter`, `RevealLine`, `RevealBlock`, and `CornerLabel` into `src/components/ui/MotionPrimitives.tsx` to ensure uniform timing, easing, and zero duplication.
3. **Smooth Scroll Harness Extraction**: Decouple Lenis lifecycle management and Framer Motion RAF synchronization into `src/hooks/useSmoothScroll.ts`.
4. **Dead Code Elimination**: Prune orphaned video and text roll components and unused legacy assets from `src/imports/`.
5. **Composite-First Animation Rule**: Replace layout-thrashing animations (e.g. `height: auto` in accordions) with composite-only transitions (CSS Grid `grid-template-rows: 0fr -> 1fr`).

## Consequences

- `App.tsx` reduced from ~1,080 lines to ~130 lines, serving solely as an orchestrator shell.
- Each section is independently testable, maintainable, and navigable for agents and developers.
- Zero layout reflow penalties during accordion expansion.
