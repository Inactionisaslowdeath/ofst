# Remediation Roadmap & Task Inventory: OFST

**Auditor**: Senior Principal Engineer & Enterprise Software Auditor  
**Date**: October 19, 2026  
**Governing Standard**: 24 Foundational Engineering Principles & Mental Models  
**Taxonomy Reference**: [`.agents/SKILLS_TAXONOMY.md`](file:///c:/Users/user/Desktop/OFST/.agents/SKILLS_TAXONOMY.md)  
**Coordination Skill**: [`orchestrate`](file:///c:/Users/user/Desktop/OFST/.agents/skills/orchestrate/SKILL.md)  
**Findings Cross-Reference**: [`AUDIT_FINDINGS.md`](file:///c:/Users/user/Desktop/OFST/AUDIT_FINDINGS.md)

---

## Department 1: Product Management, Requirements & Scoping

### Task PM-1: Synchronize Canonical Triage Labels on Remote GitHub Repository
- **Linked Finding**: `FIND-PM-01`
- **Recommended Skill**: [`triage`](file:///c:/Users/user/Desktop/OFST/.agents/skills/triage/SKILL.md)
- **Priority**: P1 (High)
- **Estimated Effort**: 15 minutes
- **Dependencies**: None
- **Acceptance Criteria**:
  1. The 4 canonical triage roles defined in [`docs/agents/triage-labels.md`](file:///c:/Users/user/Desktop/OFST/docs/agents/triage-labels.md) (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`) are created via `gh label create` with descriptive colors and descriptions.
  2. Running `gh label list` displays all 4 labels successfully.

### Task PM-2: Author Feature Specifications and Seed Initial Issue Tracker
- **Linked Finding**: `FIND-PM-02`
- **Recommended Skill**: [`to-spec`](file:///c:/Users/user/Desktop/OFST/.agents/skills/to-spec/SKILL.md), [`to-tickets`](file:///c:/Users/user/Desktop/OFST/.agents/skills/to-tickets/SKILL.md)
- **Priority**: P2 (Medium)
- **Estimated Effort**: 45 minutes
- **Dependencies**: Task PM-1
- **Acceptance Criteria**:
  1. Create `docs/specs/0001-portfolio-subpages.md` documenting the specifications, user stories, and acceptance boundaries for `AllProjectsPage`, `ContactPage`, and `AboutPage`.
  2. Seed sliced GitHub issues for pending architectural work using `gh issue create` tagged with `ready-for-agent`.

### Task PM-3: Create Issue Intake and Discovery Templates
- **Linked Finding**: `FIND-PM-03`
- **Recommended Skill**: [`to-questionnaire`](file:///c:/Users/user/Desktop/OFST/.agents/skills/to-questionnaire/SKILL.md)
- **Priority**: P3 (Low)
- **Estimated Effort**: 20 minutes
- **Dependencies**: Task PM-1
- **Acceptance Criteria**:
  1. Create `.github/ISSUE_TEMPLATE/feature_request.md` and `.github/ISSUE_TEMPLATE/discovery_questionnaire.md`.
  2. Provide structured prompts for client intent, design references, constraints, and acceptance criteria.

---

## Department 2: System Architecture & Domain Modeling

### Task ARCH-1: Refactor Navigation Routing into a Discriminated Union State Machine
- **Linked Finding**: `FIND-ARCH-01`
- **Recommended Skill**: [`codebase-design`](file:///c:/Users/user/Desktop/OFST/.agents/skills/codebase-design/SKILL.md), [`typescript-best-practices`](file:///c:/Users/user/Desktop/OFST/.agents/skills/typescript-best-practices/SKILL.md)
- **Priority**: P1 (High)
- **Estimated Effort**: 1 hour
- **Dependencies**: None
- **Acceptance Criteria**:
  1. Define a strict discriminated union type in [`src/App.tsx`](file:///c:/Users/user/Desktop/OFST/src/App.tsx):
     ```ts
     export type ViewState =
       | { view: "home" }
       | { view: "catalog" }
       | { view: "contact" }
       | { view: "about" }
       | { view: "project"; projectId: number }
     ```
  2. Replace `project`, `showCatalog`, `showContact`, and `showAbout` state variables with a single `const [viewState, setViewState] = useState<ViewState>({ view: "home" })`.
  3. Replace waterfall `if` blocks with a type-safe `switch (viewState.view)` block with exhaustive checking (`const _exhaustive: never = viewState`).
  4. All existing tests pass without regressions (`pnpm test`).

### Task ARCH-2: Decouple Project Selection from Array Indexing
- **Linked Finding**: `FIND-ARCH-02`
- **Recommended Skill**: [`codebase-design`](file:///c:/Users/user/Desktop/OFST/.agents/skills/codebase-design/SKILL.md)
- **Priority**: P2 (Medium)
- **Estimated Effort**: 20 minutes
- **Dependencies**: Task ARCH-1
- **Acceptance Criteria**:
  1. Replace `const currentProject = PROJECTS[project] ?? null` in `App.tsx` with `const currentProject = PROJECTS.find((p) => p.id === viewState.projectId) ?? null`.
  2. If project ID is invalid, fallback to catalog view rather than rendering unexpected default project.

### Task ARCH-3: Author Root README and Architecture Blueprint
- **Linked Finding**: `FIND-ARCH-03`, `FIND-LEAD-01`
- **Recommended Skill**: [`technical-writing`](file:///c:/Users/user/Desktop/OFST/.agents/skills/technical-writing/SKILL.md), [`architect`](file:///c:/Users/user/Desktop/OFST/.agents/skills/architect/SKILL.md)
- **Priority**: P2 (Medium)
- **Estimated Effort**: 30 minutes
- **Dependencies**: None
- **Acceptance Criteria**:
  1. Create `README.md` in repository root containing project overview, tech stack (React 19, Tailwind CSS v4, GSAP, Lenis), quickstart instructions, and Mermaid diagram illustrating component hierarchy.
  2. Document key development commands (`pnpm dev`, `pnpm build`, `pnpm typecheck`, `pnpm test`, `pnpm format`).

### Task ARCH-4: Expand Domain Glossary with Schema Entities
- **Linked Finding**: `FIND-ARCH-04`
- **Recommended Skill**: [`domain-modeling`](file:///c:/Users/user/Desktop/OFST/.agents/skills/domain-modeling/SKILL.md)
- **Priority**: P3 (Low)
- **Estimated Effort**: 20 minutes
- **Dependencies**: None
- **Acceptance Criteria**:
  1. Update [`GLOSSARY.md`](file:///c:/Users/user/Desktop/OFST/GLOSSARY.md) with definitions for `ProjectItem`, `ProjectDetailData`, `ServiceItem`, and `ProcessStep`.
  2. Cross-link entities to their primary type definitions in `src/data/content.ts`.

---

## Department 3: UI/UX, Design Engineering & Frontend

### Task UI-1: Eliminate Layout Reflow in Sticky Navigation Transition
- **Linked Finding**: `FIND-UI-01`
- **Recommended Skill**: [`animation-performance`](file:///c:/Users/user/Desktop/OFST/.agents/skills/animation-performance/SKILL.md), [`animate`](file:///c:/Users/user/Desktop/OFST/.agents/skills/animate/SKILL.md)
- **Priority**: P0 (Critical)
- **Estimated Effort**: 1 hour
- **Dependencies**: None
- **Acceptance Criteria**:
  1. In [`src/components/StickyNavigation.tsx#L74`](file:///c:/Users/user/Desktop/OFST/src/components/StickyNavigation.tsx#L74), eliminate `width` from CSS transition classes.
  2. Replace dynamic width animation (`transition-[width,background-color,color]`) with hardware-accelerated transform scaling (`scaleX`, `translateX`) or discrete non-interpolated width change paired with opacity fade.
  3. Verify with Chrome DevTools Performance panel that zero Forced Reflow / Layout events trigger during scroll transitions.

### Task UI-2: Standardize Page Entry Transition Duration
- **Linked Finding**: `FIND-UI-02`
- **Recommended Skill**: [`apple-design`](file:///c:/Users/user/Desktop/OFST/.agents/skills/apple-design/SKILL.md), [`emil-design-eng`](file:///c:/Users/user/Desktop/OFST/.agents/skills/emil-design-eng/SKILL.md)
- **Priority**: P1 (High)
- **Estimated Effort**: 20 minutes
- **Dependencies**: None
- **Acceptance Criteria**:
  1. In [`src/components/AllProjectsPage.tsx#L54`](file:///c:/Users/user/Desktop/OFST/src/components/AllProjectsPage.tsx#L54) and [`src/components/ContactPage.tsx#L55`](file:///c:/Users/user/Desktop/OFST/src/components/ContactPage.tsx#L55), adjust page motion duration from `4.15` seconds to `0.4` seconds (400ms) with ease `[0.16, 1, 0.3, 1]`.
  2. Test page transitions across desktop and mobile to confirm immediate responsiveness without perceived input lag.

### Task UI-3: Fix Tailwind CSS v4 Media Query Variant Syntax
- **Linked Finding**: `FIND-UI-03`
- **Recommended Skill**: [`emil-design-eng`](file:///c:/Users/user/Desktop/OFST/.agents/skills/emil-design-eng/SKILL.md)
- **Priority**: P2 (Medium)
- **Estimated Effort**: 15 minutes
- **Dependencies**: None
- **Acceptance Criteria**:
  1. In `AllProjectsPage.tsx#L140` and `ProjectShowcase.tsx#L110,L132`, replace `@media(hover:hover):group-hover:scale-[1.02]` with valid Tailwind CSS v4 syntax: `[@media(hover:hover)]:group-hover:scale-[1.02]`.
  2. Verify that image hover scale works correctly on pointer devices and does not stick on touch devices.

### Task UI-4: Adopt Canonical `useGSAP` Hook across GSAP Components
- **Linked Finding**: `FIND-UI-04`
- **Recommended Skill**: [`gsap-react`](file:///c:/Users/user/Desktop/OFST/.agents/skills/gsap-react/SKILL.md), [`gsap-core`](file:///c:/Users/user/Desktop/OFST/.agents/skills/gsap-core/SKILL.md)
- **Priority**: P2 (Medium)
- **Estimated Effort**: 1.5 hours
- **Dependencies**: None
- **Acceptance Criteria**:
  1. Refactor `ProcessSection.tsx`, `ServicesSection.tsx`, `ContactSection.tsx`, and `AboutSection.tsx` to utilize `useGSAP(() => { ... }, { scope: containerRef })` from `@gsap/react`.
  2. Eliminate manual `useEffect` + `ctx.revert()` boilerplate.
  3. Verify all ScrollTrigger scrub and pin behaviors remain 100% functionally identical.

### Task UI-5: Standardize Viewport Height Units in Footer
- **Linked Finding**: `FIND-UI-05`
- **Recommended Skill**: [`mobile-native`](file:///c:/Users/user/Desktop/OFST/.agents/skills/mobile-native/SKILL.md)
- **Priority**: P3 (Low)
- **Estimated Effort**: 10 minutes
- **Dependencies**: None
- **Acceptance Criteria**:
  1. In [`src/components/FooterSection.tsx#L143`](file:///c:/Users/user/Desktop/OFST/src/components/FooterSection.tsx#L143), update `h-[90svh]` to `h-[90dvh]` to account for dynamic mobile browser toolbars.

---

## Department 4: Core Implementation & Engineering Standards

### Task CODE-1: Remediate Formatting Check Failures
- **Linked Finding**: `FIND-CODE-01`
- **Recommended Skill**: [`control-cli`](file:///c:/Users/user/Desktop/OFST/.agents/skills/control-cli/SKILL.md), [`unslop`](file:///c:/Users/user/Desktop/OFST/.agents/skills/unslop/SKILL.md)
- **Priority**: P1 (High)
- **Estimated Effort**: 15 minutes
- **Dependencies**: None
- **Acceptance Criteria**:
  1. Execute `pnpm format` to apply Oxlint formatting rules across all 7 flagged files.
  2. Run `pnpm format --check` and verify exit code 0.

### Task CODE-2: Integrate Linter into Project Configuration
- **Linked Finding**: `FIND-CODE-02`
- **Recommended Skill**: [`typescript-best-practices`](file:///c:/Users/user/Desktop/OFST/.agents/skills/typescript-best-practices/SKILL.md), [`control-cli`](file:///c:/Users/user/Desktop/OFST/.agents/skills/control-cli/SKILL.md)
- **Priority**: P1 (High)
- **Estimated Effort**: 30 minutes
- **Dependencies**: None
- **Acceptance Criteria**:
  1. Add `oxlint` or `@eslint/js` to `devDependencies` and configure `"lint": "oxlint"` in `package.json#scripts`.
  2. Verify running `pnpm lint` completes with zero errors or warnings.

### Task CODE-3: Deduplicate Partner Logos in About Page
- **Linked Finding**: `FIND-CODE-03`
- **Recommended Skill**: [`deslop`](file:///c:/Users/user/Desktop/OFST/.agents/skills/deslop/SKILL.md), [`subtract-before-you-add`](file:///c:/Users/user/Desktop/OFST/.agents/skills/principle-subtract-before-you-add/SKILL.md)
- **Priority**: P2 (Medium)
- **Estimated Effort**: 30 minutes
- **Dependencies**: None
- **Acceptance Criteria**:
  1. Refactor [`src/components/AboutPage.tsx`](file:///c:/Users/user/Desktop/OFST/src/components/AboutPage.tsx) to reuse [`PartnerLogos.tsx`](file:///c:/Users/user/Desktop/OFST/src/components/PartnerLogos.tsx) or extract a shared `PartnerGrid` component.
  2. Delete redundant inlined `PARTNER_LOGOS` constant and unneeded `setInterval` loop from `AboutPage.tsx`.

### Task CODE-4: Include Test Configuration in TypeScript Scope
- **Linked Finding**: `FIND-CODE-04`
- **Recommended Skill**: [`typescript-best-practices`](file:///c:/Users/user/Desktop/OFST/.agents/skills/typescript-best-practices/SKILL.md)
- **Priority**: P3 (Low)
- **Estimated Effort**: 10 minutes
- **Dependencies**: None
- **Acceptance Criteria**:
  1. Update [`tsconfig.json#L22`](file:///c:/Users/user/Desktop/OFST/tsconfig.json#L22) to `"include": ["src", "vite.config.ts", "vitest.config.ts"]`.
  2. Verify `pnpm typecheck` validates test configuration files cleanly.

---

## Department 5: Software Quality Assurance, Testing & Formal Verification

### Task QA-1: Author Test Suite for `TestimonialsSection`
- **Linked Finding**: `FIND-QA-01`
- **Recommended Skill**: [`tdd`](file:///c:/Users/user/Desktop/OFST/.agents/skills/tdd/SKILL.md), [`verify-this`](file:///c:/Users/user/Desktop/OFST/.agents/skills/verify-this/SKILL.md)
- **Priority**: P1 (High)
- **Estimated Effort**: 30 minutes
- **Dependencies**: None
- **Acceptance Criteria**:
  1. Create `src/components/TestimonialsSection.test.tsx`.
  2. Test rendering of creative collaborator portrait grid (`PORTRAIT_COLUMNS`), statement copy ("Good work. Clear thinking."), and testimonial cards.
  3. Verify all tests pass during `pnpm test`.

### Task QA-2: Author Unit Tests for Shared Motion Primitives and Hooks
- **Linked Finding**: `FIND-QA-02`
- **Recommended Skill**: [`tdd`](file:///c:/Users/user/Desktop/OFST/.agents/skills/tdd/SKILL.md)
- **Priority**: P2 (Medium)
- **Estimated Effort**: 45 minutes
- **Dependencies**: None
- **Acceptance Criteria**:
  1. Create `src/components/ui/MotionPrimitives.test.tsx` testing `Counter`, `RevealLine`, `KineticBarcode`, and `AdaptiveRevealParagraph`.
  2. Create `src/hooks/useSmoothScroll.test.ts` testing Lenis instantiation and reduced-motion fallback.

### Task QA-3: Mock JSDOM `window.scrollTo` and `location.href` in Test Setup
- **Linked Finding**: `FIND-QA-03`
- **Recommended Skill**: [`check-compiler-errors`](file:///c:/Users/user/Desktop/OFST/.agents/skills/check-compiler-errors/SKILL.md)
- **Priority**: P2 (Medium)
- **Estimated Effort**: 15 minutes
- **Dependencies**: None
- **Acceptance Criteria**:
  1. In [`src/test-setup.ts`](file:///c:/Users/user/Desktop/OFST/src/test-setup.ts), mock `window.scrollTo = vi.fn()`.
  2. Stub or mock `window.location` assignments to eliminate JSDOM navigation warnings.
  3. Run `pnpm test` and verify test suite logs are 100% clean of unhandled JSDOM warnings.

### Task QA-4: Configure Browser Smoke Testing Harness
- **Linked Finding**: `FIND-QA-04`
- **Recommended Skill**: [`run-smoke-tests`](file:///c:/Users/user/Desktop/OFST/.agents/skills/run-smoke-tests/SKILL.md), [`control-ui`](file:///c:/Users/user/Desktop/OFST/.agents/skills/control-ui/SKILL.md)
- **Priority**: P3 (Low)
- **Estimated Effort**: 1 hour
- **Dependencies**: Task GIT-1
- **Acceptance Criteria**:
  1. Install Playwright (`@playwright/test`) and create `tests/smoke.spec.ts` verifying home page load, smooth scrolling, navigation pill click, and theme toggle.
  2. Add `"test:smoke": "playwright test"` to `package.json`.

---

## Department 6: Code Review, Pull Requests & Git Operations

### Task GIT-1: Establish GitHub Actions CI/CD Pipeline
- **Linked Finding**: `FIND-GIT-01`
- **Recommended Skill**: [`fix-ci`](file:///c:/Users/user/Desktop/OFST/.agents/skills/fix-ci/SKILL.md), [`review-and-ship`](file:///c:/Users/user/Desktop/OFST/.agents/skills/review-and-ship/SKILL.md)
- **Priority**: P0 (Critical)
- **Estimated Effort**: 45 minutes
- **Dependencies**: Task CODE-1, Task CODE-2
- **Acceptance Criteria**:
  1. Create `.github/workflows/ci.yml` triggering on push to `main` and on pull requests.
  2. Pipeline must execute:
     - Dependency installation via `pnpm install --frozen-lockfile`
     - Typecheck verification (`pnpm typecheck`)
     - Test execution (`pnpm test`)
     - Format checking (`pnpm format --check`)
     - Build verification (`pnpm build`)
  3. Ensure workflow finishes green on GitHub Actions runners.

### Task GIT-2: Synchronize Local Commit History with Remote
- **Linked Finding**: `FIND-GIT-02`
- **Recommended Skill**: [`review-and-ship`](file:///c:/Users/user/Desktop/OFST/.agents/skills/review-and-ship/SKILL.md)
- **Priority**: P1 (High)
- **Estimated Effort**: 15 minutes
- **Dependencies**: Task GIT-1
- **Acceptance Criteria**:
  1. Inspect 11 unpushed commits on `main` branch.
  2. Push commits to `origin/main` via `git push origin main`.
  3. Verify `git status` reports working tree clean and up to date with `origin/main`.

### Task GIT-3: Add Standardized Pull Request Template
- **Linked Finding**: `FIND-GIT-03`
- **Recommended Skill**: [`pr`](file:///c:/Users/user/Desktop/OFST/.agents/skills/pr/SKILL.md), [`make-pr-easy-to-review`](file:///c:/Users/user/Desktop/OFST/.agents/skills/make-pr-easy-to-review/SKILL.md)
- **Priority**: P2 (Medium)
- **Estimated Effort**: 15 minutes
- **Dependencies**: None
- **Acceptance Criteria**:
  1. Create `.github/pull_request_template.md` with sections for Overview, Visual Diff/Evidence, Principles Satisfied, and Verification Proofs.

---

## Department 7: Performance Engineering & Technical Debt

### Task PERF-1: Configure Vite Rollup Vendor Chunk Splitting
- **Linked Finding**: `FIND-PERF-01`
- **Recommended Skill**: [`performance-optimization`](file:///c:/Users/user/Desktop/OFST/.agents/skills/performance-optimization/SKILL.md)
- **Priority**: P1 (High)
- **Estimated Effort**: 30 minutes
- **Dependencies**: None
- **Acceptance Criteria**:
  1. In [`vite.config.ts`](file:///c:/Users/user/Desktop/OFST/vite.config.ts), add `build.rollupOptions.output.manualChunks`:
     ```ts
     manualChunks: {
       "vendor-react": ["react", "react-dom"],
       "vendor-motion": ["framer-motion", "lenis"],
       "vendor-gsap": ["gsap", "@gsap/react"],
     }
     ```
  2. Run `pnpm build` and verify `FooterSection` chunk size drops below 100 kB (down from 282 kB).

### Task PERF-2: Replace Manual Math Clamping with `gsap.utils.clamp`
- **Linked Finding**: `FIND-PERF-02`
- **Recommended Skill**: [`gsap-utils`](file:///c:/Users/user/Desktop/OFST/.agents/skills/gsap-utils/SKILL.md)
- **Priority**: P2 (Medium)
- **Estimated Effort**: 15 minutes
- **Dependencies**: None
- **Acceptance Criteria**:
  1. In `src/App.tsx#L57` and `src/components/ParallaxGallery.tsx#L118`, replace `Math.max(0, Math.min(1, ...))` with `gsap.utils.clamp(0, 1, ...)`.
  2. Verify scroll progress calculations remain identical.

### Task PERF-3: Exclude Scratch Directories in `.gitignore`
- **Linked Finding**: `FIND-PERF-03`
- **Recommended Skill**: [`ponytail`](file:///c:/Users/user/Desktop/OFST/.agents/skills/ponytail/SKILL.md)
- **Priority**: P3 (Low)
- **Estimated Effort**: 5 minutes
- **Dependencies**: None
- **Acceptance Criteria**:
  1. Add `scratch/` and `scratch_gsap_skills/` to [`.gitignore`](file:///c:/Users/user/Desktop/OFST/.gitignore).

---

## Department 8: Debugging, Diagnostics & Problem Resolution

### Task DEBUG-1: Centralize Body Scroll Locking in `useScrollLock` Hook
- **Linked Finding**: `FIND-DEBUG-01`
- **Recommended Skill**: [`diagnosing-bugs`](file:///c:/Users/user/Desktop/OFST/.agents/skills/diagnosing-bugs/SKILL.md), [`codebase-design`](file:///c:/Users/user/Desktop/OFST/.agents/skills/codebase-design/SKILL.md)
- **Priority**: P1 (High)
- **Estimated Effort**: 45 minutes
- **Dependencies**: None
- **Acceptance Criteria**:
  1. Create `src/hooks/useScrollLock.ts` implementing a reference-counted body scroll lock.
  2. Replace ad-hoc `document.body.style.overflow = ""` and `document.body.style.overflow = "hidden"` in `StickyNavigation.tsx`, `AboutPage.tsx`, `AllProjectsPage.tsx`, `ProjectDetailPage.tsx`, and `ContactPage.tsx` with `useScrollLock(isLocked)`.
  3. Verify that concurrent modal or menu toggles never leave the document body inadvertently locked or unlocked.

### Task DEBUG-2: Synchronize State Navigation with Browser History API
- **Linked Finding**: `FIND-DEBUG-02`
- **Recommended Skill**: [`diagnosing-bugs`](file:///c:/Users/user/Desktop/OFST/.agents/skills/diagnosing-bugs/SKILL.md)
- **Priority**: P2 (Medium)
- **Estimated Effort**: 45 minutes
- **Dependencies**: Task ARCH-1
- **Acceptance Criteria**:
  1. In `App.tsx`, listen to `window.addEventListener("popstate", ...)` and push state on subpage transition via `window.history.pushState(viewState, "", ...)`.
  2. Verify that clicking browser Back button from a Project Details page or Catalog returns to Home without exiting the site.

---

## Department 9: Engineering Leadership, Team Rituals & Knowledge Transfer

### Task LEAD-1: Create Team Onboarding & Architecture Guide
- **Linked Finding**: `FIND-LEAD-01`
- **Recommended Skill**: [`teach`](file:///c:/Users/user/Desktop/OFST/.agents/skills/teach/SKILL.md), [`technical-writing`](file:///c:/Users/user/Desktop/OFST/.agents/skills/technical-writing/SKILL.md)
- **Priority**: P2 (Medium)
- **Estimated Effort**: 30 minutes
- **Dependencies**: Task ARCH-3
- **Acceptance Criteria**:
  1. Create `docs/ARCHITECTURE.md` documenting the 3-tier layering: Shell (`App.tsx`), Presentation Modules (`src/components/`), and Utilities (`src/hooks/`, `src/data/`).
  2. Include guide for adding a new project or section.

### Task LEAD-2: Establish Persistent Developer Handoff Document
- **Linked Finding**: `FIND-LEAD-02`
- **Recommended Skill**: [`handoff`](file:///c:/Users/user/Desktop/OFST/.agents/skills/handoff/SKILL.md)
- **Priority**: P3 (Low)
- **Estimated Effort**: 15 minutes
- **Dependencies**: None
- **Acceptance Criteria**:
  1. Create `docs/HANDOFF.md` recording current sprint status, active branches, completed features, and the immediate next priorities.

---

## Department 10: Foundational Principles & Mental Models

### Task PRIN-1: Remediate Core Engineering Principles Violations
- **Linked Finding**: Section 3 (Department 10 Evaluation)
- **Recommended Skill**: [`orchestrate`](file:///c:/Users/user/Desktop/OFST/.agents/skills/orchestrate/SKILL.md)
- **Priority**: P0 / P1 (Cross-Cutting)
- **Estimated Effort**: Tracked across subtasks
- **Dependencies**: Task UI-1, Task ARCH-1, Task GIT-1, Task CODE-1, Task DEBUG-1
- **Acceptance Criteria**:
  1. `principle-type-system-discipline`: Satisfied by Task ARCH-1.
  2. `principle-encode-lessons-in-structure`: Satisfied by Task GIT-1 and Task CODE-2.
  3. `principle-experience-first`: Satisfied by Task UI-1, Task UI-2, and Task DEBUG-2.
  4. `principle-separate-before-serializing-shared-state`: Satisfied by Task DEBUG-1.
  5. `principle-prove-it-works`: Satisfied by Task QA-1 and Task QA-3.

---

## Department 11: Multi-Agent Orchestration & Workflow Utilities

### Task AGENT-1: Review `.gitignore` Policy for Custom Agent Skills
- **Linked Finding**: `FIND-AGENT-01`
- **Recommended Skill**: [`writing-for-agents`](file:///c:/Users/user/Desktop/OFST/.agents/skills/writing-for-agents/SKILL.md)
- **Priority**: P3 (Low)
- **Estimated Effort**: 15 minutes
- **Dependencies**: None
- **Acceptance Criteria**:
  1. Review whether custom skills developed for OFST should be checked into Git under `.agents/skills/` or distributed via external plugin packages.
  2. Update `.gitignore` with inline comments explaining the skill tracking boundary.

---

## 4. Remediation Execution Matrix

| Sequence | Task ID | Description | Department | Priority | Est. Effort | Skill |
|:---:|:---|:---|:---|:---:|:---:|:---|
| **1** | **UI-1** | Eliminate layout reflow in Sticky Navigation | UI/UX & Frontend | **P0** | 1h | `animation-performance` |
| **2** | **GIT-1** | Establish GitHub Actions CI/CD Pipeline | Git & CI | **P0** | 45m | `fix-ci` |
| **3** | **CODE-1** | Remediate formatting check failures | Core Standards | **P1** | 15m | `control-cli` |
| **4** | **CODE-2** | Integrate linter into project scripts | Core Standards | **P1** | 30m | `typescript-best-practices` |
| **5** | **UI-2** | Standardize page transition duration (0.4s) | UI/UX & Frontend | **P1** | 20m | `emil-design-eng` |
| **6** | **ARCH-1** | Refactor routing into discriminated union | Architecture | **P1** | 1h | `codebase-design` |
| **7** | **QA-1** | Author test suite for `TestimonialsSection` | QA & Testing | **P1** | 30m | `tdd` |
| **8** | **DEBUG-1** | Centralize scroll locking in `useScrollLock` | Diagnostics | **P1** | 45m | `diagnosing-bugs` |
| **9** | **PERF-1** | Configure Vite Rollup vendor chunk splitting | Performance | **P1** | 30m | `performance-optimization` |
| **10** | **GIT-2** | Synchronize 11 local commits to remote | Git & CI | **P1** | 15m | `review-and-ship` |
| **11** | **PM-1** | Synchronize triage labels on remote tracker | Product Mgmt | **P1** | 15m | `triage` |
| **12** | **QA-3** | Mock `scrollTo` & `location` in `test-setup.ts` | QA & Testing | **P2** | 15m | `check-compiler-errors` |
| **13** | **ARCH-2** | Decouple project lookup from array indexing | Architecture | **P2** | 20m | `codebase-design` |
| **14** | **DEBUG-2** | Synchronize routing with History API | Diagnostics | **P2** | 45m | `diagnosing-bugs` |
| **15** | **ARCH-3** | Author root README & architecture blueprint | Architecture | **P2** | 30m | `technical-writing` |
| **16** | **UI-3** | Fix Tailwind CSS v4 media query syntax | UI/UX & Frontend | **P2** | 15m | `emil-design-eng` |
| **17** | **UI-4** | Adopt canonical `useGSAP` hook | UI/UX & Frontend | **P2** | 1.5h | `gsap-react` |
| **18** | **CODE-3** | Deduplicate partner logos in About page | Core Standards | **P2** | 30m | `deslop` |
| **19** | **QA-2** | Unit test shared primitives and hooks | QA & Testing | **P2** | 45m | `tdd` |
| **20** | **PERF-2** | Use `gsap.utils.clamp` for math clamping | Performance | **P2** | 15m | `gsap-utils` |
| **21** | **GIT-3** | Add standardized Pull Request template | Git & CI | **P2** | 15m | `pr` |
| **22** | **PM-2** | Author feature specs & seed issue tracker | Product Mgmt | **P2** | 45m | `to-spec` |
| **23** | **LEAD-1** | Create onboarding & architecture guide | Leadership | **P2** | 30m | `teach` |
| **24** | **PERF-3** | Add scratch directories to `.gitignore` | Performance | **P3** | 5m | `ponytail` |
| **25** | **UI-5** | Use `dvh` units in sticky footer | UI/UX & Frontend | **P3** | 10m | `mobile-native` |
| **26** | **CODE-4** | Add `vitest.config.ts` to `tsconfig.json` | Core Standards | **P3** | 10m | `typescript-best-practices` |
| **27** | **ARCH-4** | Update `GLOSSARY.md` with schema entities | Architecture | **P3** | 20m | `domain-modeling` |
| **28** | **PM-3** | Create issue discovery templates | Product Mgmt | **P3** | 20m | `to-questionnaire` |
| **29** | **QA-4** | Configure Playwright smoke testing harness | QA & Testing | **P3** | 1h | `run-smoke-tests` |
| **30** | **LEAD-2** | Establish persistent handoff document | Leadership | **P3** | 15m | `handoff` |
| **31** | **AGENT-1** | Review agent skill gitignore policy | Multi-Agent | **P3** | 15m | `writing-for-agents` |
