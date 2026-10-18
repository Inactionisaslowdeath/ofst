# UI/UX, Design Engineering & Motion Directives

You MUST ALWAYS follow these standards whenever building, styling, animating, or reviewing any user interface component or interaction.

## 1. Mandatory Skills Activation
Whenever modifying or designing UI components, CSS, layouts, or transitions, you MUST actively apply the principles from:
- `emil-design-eng`: Micro-interactions, tactile press states, layout jump prevention, tabular figures, and elevation.
- `apple-design`: Direct manipulation, 1:1 continuous tracking with pointer events, interruptible physics/velocity-aware springs, and seamless boundary resistance.
- `animation-performance`: Enforce strict 16.7ms (60fps) / 8ms (120fps) frame budgets. Composite-only animations (`transform`, `opacity`). Never animate layout properties (`width`, `height`, `top`, `margin`, `padding`).
- `animate`: Motion intentionality gating (frequency gate: items triggered 100+ times/day get no animation; rare items get high craft). Correct cubic-bezier and spring physics curves. Always respect `prefers-reduced-motion`.
- `mobile-native`: Eliminate iOS 100vh bugs, disable sticky touch hover states, kill the 300ms tap delay, and prevent input auto-zooming.
- `performance-optimization`: Layout shifts (CLS = 0), asset delivery, and memory lifecycle cleanup.
- `gsap-core` & `gsap-react`: Standard GSAP animations, `useGSAP` hook lifecycle, ref scoping, and automated context cleanup on unmount.
- `gsap-scrolltrigger`: Scroll-driven animations, parallax effects, scrub synchronization, section pinning, and Lenis integration.
- `gsap-timeline`: Choreographed multi-step sequences, position parameter micro-timings, and labels.
- `gsap-performance`: Hardware-accelerated transforms, avoiding layout thrashing, and batching `will-change`.
- `gsap-plugins` & `gsap-utils`: FLIP layout morphing, Draggable, SplitText, and numerical interpolation helpers (`clamp`, `mapRange`, `pipe`).

## 2. Hard Non-Negotiable Rules

### A. Motion & Animation
1. **Never use `transition: all`**. Always explicitly name the animating properties (`transition: transform 150ms ease-out, opacity 150ms ease-out`).
2. **Composite-only properties**. Restrict animations strictly to `transform` and `opacity`. Never animate `width`, `height`, `left`, `top`, `right`, `bottom`, `margin`, or `padding`.
3. **No `ease-in` on UI entrances**. Entrances MUST use `ease-out` or a critically damped spring.
4. **Keyboard shortcuts / high-frequency actions never animate**. Modals and command bars triggered by keyboard open and close instantly.
5. **No `scale(0)`**. Entering popovers and modals scale down to at most `scale(0.95)` to maintain visual weight and avoid feeling like a cartoon pop.
6. **GSAP React Cleanup**: Never leave unmanaged GSAP tweens or ScrollTrigger instances. Always wrap them inside `useGSAP` or `gsap.context()` with proper unmount cleanup.

### B. Tactile Feedback & Micro-interactions
1. **Press states live on pointer-down**: Interactive elements MUST respond immediately on press (`:active { transform: scale(0.97); }` or subtle brightness shifts). Never wait for release/click.
2. **Numbers and counters**: Always apply `font-variant-numeric: tabular-nums` or `tabular-nums` class to prevent jitter during updates.
3. **Prevent layout shift (CLS)**: Skeleton loaders and image wrappers MUST reserve explicit aspect ratios or dimensions before content loads.

### C. Mobile Native Standards
1. Use `dvh` or `min-h-[100dvh]` instead of `100vh`.
2. Disable double-tap zoom delays and tap highlights on interactive elements (`touch-action: manipulation`, `-webkit-tap-highlight-color: transparent`).
3. Gate hover effects behind `@media (hover: hover) and (pointer: fine)` so touch devices do not retain sticky hover states after tapping.
