# figma-make-app

React + Vite + Tailwind CSS project running inside Figma Make.

## Development Server

A Vite development server is **already running** on `$PORT` (default 8443). You don't need to start it manually.

- Preview URL: The user can access the running app through the preview panel
- Hot reload: Changes to source files are reflected immediately

## Project Structure

This is the canonical project structure. Start with task-relevant files below. Only follow imports or inspect other files when required, when a documented path is missing, or when the repository contradicts this guide.

- `src/main.tsx` - React entrypoint; imports `src/index.css` and mounts `src/App.tsx` into the `#root` element
- `src/App.tsx` - Primary application component and the usual starting point for UI work
- `src/index.css` - Global CSS entrypoint and Tailwind CSS v4 import
- `index.html` - Vite HTML shell containing the `#root` element and loading `src/main.tsx`
- `package.json` - Project dependencies and the Vite build, development, preview, and formatting scripts
- `vite.config.ts` - Vite configuration with React, Tailwind CSS v4, and Figma Make plugins plus the `@` alias for `src`
- `.mise.toml` - Toolchain versions for Node.js and pnpm

## Dependencies

- Runtime: React 19 and React DOM 19
- Styling: Tailwind CSS v4 with the `@tailwindcss/vite` plugin
- Build tooling: Vite 8, TypeScript 5.7, and `@vitejs/plugin-react`
- Formatting: oxfmt

## Styling

This project uses **Tailwind CSS v4** through the `@tailwindcss/vite` plugin configured in `vite.config.ts`. `src/index.css` imports Tailwind with `@import 'tailwindcss';`. Use Tailwind utility classes directly in JSX and put global CSS or Tailwind v4 theme customization in `src/index.css`. This scaffold does not need a Tailwind config file or PostCSS config.

`src/main.tsx` imports `src/index.css`, so global font wiring belongs in `src/index.css`. Keep CSS `@import` statements first, then add any `@font-face` rules and font-family defaults there.

## Code quality

- Use double quotes for strings containing apostrophes (`"We're here to help"`), or escape them in single-quoted strings. An unescaped apostrophe in a single-quoted string breaks the build.
- Ensure JSX tags are closed and braces are balanced.
- Export components as default exports.

## Agent skills

### Issue tracker

GitHub issues via `gh` CLI. See [issue-tracker.md](file:///c:/Users/user/Desktop/OFST/docs/agents/issue-tracker.md).

### Triage labels

Canonical roles: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See [triage-labels.md](file:///c:/Users/user/Desktop/OFST/docs/agents/triage-labels.md).

### Domain docs

Single-context (`GLOSSARY.md` + `docs/adr/` at repo root). See [domain.md](file:///c:/Users/user/Desktop/OFST/docs/agents/domain.md).

### Engineering and Workflow Skills

Workspace skills are configured in `.agents/skills/`. Full directory and department taxonomy: [SKILLS_TAXONOMY.md](file:///c:/Users/user/Desktop/OFST/.agents/SKILLS_TAXONOMY.md).
- **Universal Orchestrator**: Use `orchestrate` to plan, decompose, and drive any complex multi-step task, automatically binding the relevant 24 foundational principles and routing through departmental skills.
- **Whole-Codebase Auditor**: Use `audit-codebase` to systematically assess repository health across all 11 departments and 24 foundational principles.
- Use `tdd` for test-driven development and feature slicing.
- Use `diagnosing-bugs` and `figure-it-out` when troubleshooting and fixing hard bugs or regressions.
- Use `code-review` and `thermo-nuclear-code-quality-review` before finalizing or submitting code changes.
- Use `codebase-design`, `architect`, and `domain-modeling` when designing architecture, interfaces, and terms.
- Use `grill-me` or `grill-with-docs` for upfront alignment and design clarification.
- Use `ponytail`, `ponytail-debt`, and `ponytail-gain` when analyzing technical debt and refactoring ROI.
- Use `typescript-best-practices` and `check-compiler-errors` for strict type correctness and compiler diagnostics.
- Use `deslop` and `unslop` to ensure clean, lean, high-density code and prose.
- Use the GSAP skill suite (`gsap-core`, `gsap-react`, `gsap-scrolltrigger`, `gsap-timeline`, `gsap-performance`, `gsap-plugins`, `gsap-utils`) when authoring or refactoring timelines, scroll triggers, parallax effects, or complex motion in React.

### Design, UI/UX & Motion Directives (MANDATORY)

Whenever building, modifying, refactoring, or reviewing ANY user interface, CSS, styling, gestures, or animations:
- **Mandatory Skills**: You MUST consult and follow `emil-design-eng`, `apple-design`, `animation-performance`, `animate`, `improve-animations`, `mobile-native`, `performance-optimization`, and the GSAP suite (`gsap-core`, `gsap-react`, `gsap-scrolltrigger`, `gsap-timeline`, `gsap-performance`, `gsap-plugins`, `gsap-utils`).
- **Zero-Jank Motion**: Strictly adhere to 60fps/120fps frame budgets. Animate ONLY composite properties (`transform`, `opacity`). Never animate `width`, `height`, `margin`, `padding`, or `top/left/right/bottom`.
- **Never use `transition: all`**: Explicitly specify transitions (`transform 150ms ease-out, opacity 150ms ease-out`).
- **Tactile Feedback**: Press states respond immediately on pointer-down (`scale(0.97)`). Never wait for click release.
- **Mobile First-Class**: Use `dvh` units, eliminate sticky touch hovers with `@media (hover: hover)`, and prevent mobile tap delay.
- **GSAP & React Lifecycle**: In React components, ALWAYS manage GSAP animations using `useGSAP` or `gsap.context()` for deterministic cleanup on unmount, avoiding memory leaks and zombie tweens.
- **ScrollTrigger Integrity**: Ensure ScrollTrigger instances have explicit triggers, appropriate scroller proxies when paired with Lenis, and refresh hooks after DOM layout changes.


