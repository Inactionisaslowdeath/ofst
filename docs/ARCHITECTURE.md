# System Architecture: OFST

## Overview
OFST is an editorial, minimalist design studio portfolio built on React 19, Tailwind CSS v4, GSAP, Framer Motion, and Lenis smooth scrolling.

## System Topology & Layers

The system follows a strict 3-tier layering model:

```mermaid
flowchart TD
    Shell["Application Shell<br/>(src/App.tsx)"]
    State["Navigation State Machine<br/>(ViewState Discriminated Union)"]
    ScrollLock["Scroll Lock Registry<br/>(useScrollLock)"]
    History["Browser History API<br/>(pushState / popstate)"]

    Shell --> State
    Shell --> ScrollLock
    Shell --> History

    subgraph Presentation ["Presentation Layer (src/components/)"]
        Nav["StickyNavigation"]
        Hero["ParallaxGallery & HeroSection"]
        AboutSec["AboutSection"]
        Services["ServicesSection (GSAP Pin)"]
        Projects["ProjectShowcase"]
        Process["ProcessSection (GSAP Pin & Scrub)"]
        Testimonials["TestimonialsSection"]
        FAQ["FaqSection"]
        ContactSec["ContactSection (GSAP Convergence)"]
        Footer["FooterSection (Curtain Reveal)"]
        
        SubAbout["AboutPage (Subpage)"]
        SubCatalog["AllProjectsPage (Subpage)"]
        SubContact["ContactPage (Subpage)"]
        SubDetail["ProjectDetailPage (Modal View)"]
    end

    Shell --> Presentation

    subgraph DataUtilities ["Data & Domain Utilities (src/data/ & src/hooks/)"]
        Content["content.ts (Domain Schema & Entities)"]
        LenisHook["useSmoothScroll.ts"]
        LockHook["useScrollLock.ts"]
        Primitives["ui/MotionPrimitives.tsx"]
    end

    Presentation --> DataUtilities
```

## Key Architectural Decisions

1. **Deterministic State Routing (ADR-001)**:
   - Replaced multi-variable boolean flags with a single discriminated union `ViewState`.
   - Guaranteed exhaustive pattern matching prevents invalid overlapping states.

2. **Reference-Counted Scroll Management (ADR-002)**:
   - Centralized in `src/hooks/useScrollLock.ts`.
   - Prevents scroll un-locking race conditions when closing nested overlays or modal transitions.

3. **Motion Performance & Frame Budget (Zero-Jank)**:
   - All interactive and scroll-linked animations animate composite properties only (`transform`, `opacity`).
   - Forced reflow is eliminated by avoiding animated CSS `width`, `height`, or layout properties.
   - Pinned GSAP ScrollTriggers manage explicit `trigger` targets and clean up deterministically on unmount.

4. **Asset Splitting & Production Bundling**:
   - Function-based `manualChunks` in `vite.config.ts` segments React runtime, Framer Motion + Lenis, and GSAP into independent, cacheable vendor chunks.
