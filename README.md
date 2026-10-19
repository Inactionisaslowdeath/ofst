# OFST

> Independent by Design. Less But More.

**OFST** is an editorial, minimalist design studio portfolio and interactive showcase web application built with **React 19**, **Vite 8**, **Tailwind CSS v4**, **GSAP**, and **Lenis**.

---

## Architecture & Design Highlights

- **Modular Presentation Decks**: Clean separation of page sections under [`src/components/`](file:///c:/Users/user/Desktop/OFST/src/components/) with minimal prop surfaces.
- **Type-Safe Routing State Machine**: Mutually exclusive single-page views (`home`, `catalog`, `contact`, `about`, `project`) managed via an algebraic discriminated union `ViewState` synchronized with the browser History API.
- **Unified Smooth Scroll Harness**: Centralized Lenis lifecycle management in [`src/hooks/useSmoothScroll.ts`](file:///c:/Users/user/Desktop/OFST/src/hooks/useSmoothScroll.ts), automatically bypassing touch devices (`pointer: coarse`) and reduced-motion environments.
- **Radial View Transitions Theme Toggling**: Hardware-accelerated light/dark switching via native View Transitions API with expanding geometric clipping (`src/ThemeToggle.tsx`).
- **Zero-Jank Motion & Adaptive Pinning**: Kinematically scrubbed timelines, bilateral converging hands, and transform-based pinning on mobile touch devices satisfying ADR 0003.
- **Universal Typographic Optical Tracking**: Adaptive negative letter-spacing dynamically scaled based on heading display sizes in `src/index.css`.
- **Reference-Counted Scroll Lock**: Centralized `useScrollLock` hook preventing concurrent modal and navigation scroll race conditions.

---

## Directory Structure

```
OFST/
├── .github/
│   ├── workflows/ci.yml       # Automated CI pipeline (typecheck, lint, test, format, build)
│   └── pull_request_template.md
├── docs/
│   ├── adr/                   # Architectural Decision Records (0001, 0002, 0003)
│   └── agents/                # Issue tracker & triage specifications
├── src/
│   ├── components/            # Isolated presentation sections & subpages
│   │   ├── ui/                # Shared motion primitives (Counter, AdaptiveRevealParagraph)
│   │   └── ...
│   ├── data/
│   │   └── content.ts         # Centralized domain content and typed schemas
│   ├── hooks/
│   │   ├── useScrollLock.ts   # Reference-counted body scroll lock
│   │   └── useSmoothScroll.ts # Lenis & GSAP ScrollTrigger synchronizer
│   ├── App.tsx                # Main application orchestrator & routing shell
│   ├── index.css              # Tailwind v4 import & optical typography curves
│   └── ThemeToggle.tsx        # View transitions theme switcher
├── GLOSSARY.md                # Ubiquitous domain vocabulary
├── AUDIT_FINDINGS.md          # Comprehensive 11-department audit report
└── AUDIT_TASKS.md             # Prioritized remediation roadmap
```

---

## Quickstart & Verification

```bash
# Install dependencies
pnpm install

# Start Vite local development server
pnpm dev

# Run TypeScript typecheck
pnpm typecheck

# Run linter
pnpm lint

# Check code formatting
pnpm format --check

# Execute unit and component tests
pnpm test

# Build production bundle with optimized vendor chunking
pnpm build
```
