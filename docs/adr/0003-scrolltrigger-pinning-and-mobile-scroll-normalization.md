# ADR 0003: ScrollTrigger Pinning and Mobile Scroll Normalization Discipline

## Context

The studio showcase features a layered `ParallaxGallery` that requires `ScrollTrigger.normalizeScroll(true)` and `ignoreMobileResize: true` on touch devices (`pointer: coarse`) to eliminate asynchronous compositor thread jitter. 

When introducing pinned interactive sequences (such as `ProcessSection`'s 5-step scrubbed timeline), default ScrollTrigger behaviors (`pinType: "fixed"`, `anticipatePin: 1`, and numeric scrub lag) caused jarring visual jumps at pin start and unpin boundaries on mobile:
1. `position: fixed` forces the mobile browser to promote/demote GPU composite layers while touch momentum is active on the JS thread, creating a frame desynchronization jump.
2. `anticipatePin: 1` prematurely estimated pin threshold crossings during touch flicks, teleporting the container before reaching the trigger.
3. Numeric scrub (e.g. `scrub: 0.8`) introduced playhead lag, causing ScrollTrigger to unpin at `end` while the animation was still incomplete, snapping the final state.
4. Adjacent vertical margins (`margin-bottom` on `ServicesSection`) collapsed inconsistently when `.pin-spacer` was injected into document flow.
5. Desktop hero bottom fade overlay was constrained to mobile media queries, causing a persistent fixed white bar across desktop sections.

## Decision

1. **Adaptive `pinType` Strategy**:
   - On touch/mobile devices (`pointer: coarse` or `ScrollTrigger.isTouch`): ALWAYS use `pinType: "transform"`. This keeps pinning strictly on the JavaScript thread via hardware-accelerated CSS `translateY(...)`, perfectly synchronized with `normalizeScroll(true)`.
   - On desktop: Use `pinType: "fixed"`, continuing to leverage Lenis smooth scroll natively.
2. **Zero Anticipation on Touch**: Set `anticipatePin: 0` on pinned sequences to ensure elements lock at their exact, pixel-perfect trigger threshold without velocity estimation snapping.
3. **Synchronous 1:1 Scrubbing**: Use `scrub: true` paired with `fastScrollEnd: true` so the animation progress is strictly bound to scroll distance, eliminating unpin catch-up snaps.
4. **Padding Spacing Discipline**: Use padding (`pb-*`/`pt-*`) rather than collapsing margins (`mb-*`/`mt-*`) on sections adjacent to pinned scroll triggers to prevent layout shifts when `.pin-spacer` elements mount.
5. **Universal Hardware-Accelerated Viewport Overlays**: View-timeline fade animations (`animation-timeline: --hero-scroll`) must apply across all viewports without mobile media query constraints, delegating opacity fade-out to the browser compositor thread with JS fallback only for non-supporting browsers.

## Consequences

- Completely eliminates pin start/end jumps on touch devices while preserving the mobile Parallax Gallery smooth scroll normalization.
- Establishes a concrete, regression-proof contract for authoring any future pinned scroll triggers in this codebase.
- Preserves native Lenis smooth scroll on desktop with zero overhead.
