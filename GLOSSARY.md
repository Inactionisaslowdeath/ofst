# Domain Glossary

Ubiquitous domain language for OFST (Drkst) — an editorial, minimalist design studio portfolio and showcase web application.

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

### Process Step Carousel
The auto-progressing 5-step studio methodology loop (`Listen`, `Explore`, `Refine`, `Build`, `Reflect`) with animated character staggered typography reveals and linear progress indicator bars.

### Portrait Stagger Array
The 9-column offset creative collaborator grid with millisecond-staggered vertical emergence.
