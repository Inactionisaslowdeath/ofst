# Domain Glossary

Ubiquitous domain language for OFST — an editorial, minimalist design studio portfolio and showcase web application.

---

## Brand & Aesthetic Concepts

### Less But More
The core studio philosophy: impact through tension and intentional reduction rather than visual noise. Embodied in the stark black/white palette, deep typography contrast, and restrained motion.

### Progressive Fade (Hero Fade)
The custom multi-stop gradient overlay at the bottom of the hero gallery that gradually transitions viewport media into the solid background color (`--bg`) as the user scrolls.

### Compact Navigation
The adaptive fixed pill navigation. Begins wide displaying full section anchors (`About`, `Projects`, `Services`, `Process`, `Contact`) and compacts down to a minimalist 217px pill with logo and CTA once the hero folds out of view.

### Sticky Curtain Reveal
The two-tier footer interaction where the sticky newsletter panel pins as a curtain while continuing scroll reveals the oversized OFST studio wordmark and directory underneath.

### Bilateral Convergence
The contact section scroll interaction where two sculpted hands converge horizontally toward the center as the section enters the viewport.

---

## Architectural & Technical Modules

### Parallax Gallery
The multi-column vertical gallery in the hero section displaying staggered imagery running at varying velocity factors (`y`, `y2`, `y3`, `y4`) synchronized to page scroll.

### Smooth Scroll Harness
The application-wide scroll smoothing orchestrator (powered by Lenis), equipped with automatic reduced-motion detection, requestAnimationFrame lifecycle hooks, and modal scroll-locking capabilities. Centralized via `src/hooks/useSmoothScroll.ts`.

### Theme Transition
A view-transition powered theme switcher that clips light and dark mode changes via expanding radial geometry (`circle at top-right`) with zero flicker.

### Project Showcase Modal
An accessible, dialog-based portfolio detail view that captures focus, binds `Escape` and `Tab` keys, and temporarily halts root scroll velocity.

### Pinned Process Timeline
The pinned interactive 5-step studio methodology sequence (`Listen`, `Explore`, `Refine`, `Build`, `Reflect`) driven by synchronous ScrollTrigger scrubbing with upward character dispersal and linear progress tracking.

### Portrait Stagger Array
The 9-column offset creative collaborator grid with millisecond-staggered vertical emergence.

---

## Domain Schema Entities

### ViewState
The core discriminated union navigation state model governing client-side routing within [`src/App.tsx`](file:///c:/Users/user/Desktop/OFST/src/App.tsx):
- `{ view: "home" }`: Main landing page with full stacked sections.
- `{ view: "catalog" }`: Complete projects archive gallery.
- `{ view: "contact" }`: Dedicated inquiry and touchpoint view.
- `{ view: "about" }`: Dedicated studio narrative, capabilities, and FAQ view.
- `{ view: "project"; projectId: number }`: Deep-linked project showcase modal or standalone project view.

### ProjectItem
The atomic portfolio entry defined in [`src/data/content.ts`](file:///c:/Users/user/Desktop/OFST/src/data/content.ts#L19-L27). Represents a creative showcase item with `id`, `name`, `image`, optional `category`, `slug`, and comprehensive `detail` payload.

### ProjectDetailData
The rich portfolio case study payload defined in [`src/data/content.ts`](file:///c:/Users/user/Desktop/OFST/src/data/content.ts#L6-L17). Encapsulates client metadata, narrative statement, design brief bullets (`whatIsAbout`), hero imagery, and visual deliverable gallery (`cards`).

### ServiceItem
The studio capabilities entity defined in [`src/data/content.ts`](file:///c:/Users/user/Desktop/OFST/src/data/content.ts#L29-L32). Pairs practice disciplines (e.g. "Brand Architecture", "Design Systems", "Creative Direction") with visual preview assets for the interactive hover-reveal showcase.

### ProcessStep
The studio engagement methodology entity defined in [`src/data/content.ts`](file:///c:/Users/user/Desktop/OFST/src/data/content.ts#L34-L37). Defines each step in the studio's 5-phase delivery model (`title` and `description`) rendered in the pinned process timeline.

