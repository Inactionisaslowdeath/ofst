import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import ParallaxGallery from "./components/ParallaxGallery"
import StickyNavigation from "./components/StickyNavigation"
import ProjectShowcase from "./components/ProjectShowcase"
import PartnerLogos from "./components/PartnerLogos"
import AboutSection from "./components/AboutSection"
import ServicesSection from "./components/ServicesSection"
import ProcessSection from "./components/ProcessSection"
import TestimonialsSection from "./components/TestimonialsSection"
import MetricsSection from "./components/MetricsSection"
import FaqSection from "./components/FaqSection"
import ContactSection from "./components/ContactSection"
import FooterSection from "./components/FooterSection"
import { useSmoothScroll } from "./hooks/useSmoothScroll"
import { PROJECTS } from "./data/content"

const ProjectDetailPage = lazy(() => import("./components/ProjectDetailPage"))
const AllProjectsPage = lazy(() => import("./components/AllProjectsPage"))
const ContactPage = lazy(() => import("./components/ContactPage"))
const AboutPage = lazy(() => import("./components/AboutPage"))

export interface ProjectViewState {
  type: "project"
  projectId: number
}

export type ViewState = { type: "home" } | { type: "catalog" } | {
  type: "contact"
} | { type: "about" } | ProjectViewState

export default function App() {
  const [viewState, setViewState] = useState<ViewState>(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.toLowerCase()
      if (hash === "#projects" || hash === "#work" || hash === "#catalog") {
        return { type: "catalog" }
      }
      if (hash === "#contact") return { type: "contact" }
      if (hash === "#about") return { type: "about" }
    }
    return { type: "home" }
  })

  const heroRef = useRef<HTMLElement | null>(null)
  const heroFadeRef = useRef<HTMLDivElement | null>(null)
  const lenisInstance = useSmoothScroll()

  const navigate = useCallback((nextState: ViewState) => {
    setViewState(nextState)
    if (typeof window !== "undefined" && window.history) {
      window.history.pushState(nextState, "")
    }
  }, [])

  // Sync browser back/forward buttons with ViewState
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && typeof event.state.type === "string") {
        setViewState(event.state as ViewState)
      } else {
        setViewState({ type: "home" })
      }
    }
    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  // Hero bottom fade scroll progress calculation
  useEffect(() => {
    const usesNativeViewTimeline =
      typeof CSS !== "undefined" &&
      typeof CSS.supports === "function" &&
      CSS.supports("animation-timeline: view()")
    if (usesNativeViewTimeline) return

    let ticking = false
    const updateHeroFade = () => {
      const hero = heroRef.current
      const fade = heroFadeRef.current
      if (!hero || !fade) return

      const rect = hero.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // If the hero has scrolled out of view completely (above the viewport), fade is strictly 0
      if (rect.bottom <= 0 || rect.top >= windowHeight) {
        fade.style.opacity = "0"
        ticking = false
        return
      }

      // Smoothly fade out as the bottom of the hero approaches the viewport bottom
      if (rect.bottom < windowHeight) {
        const progress = gsap.utils.clamp(
          0,
          1,
          (rect.bottom - (windowHeight - 200)) / 200,
        )
        fade.style.opacity = String(progress)
      } else {
        fade.style.opacity = "1"
      }
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(updateHeroFade)
      }
    }

    updateHeroFade()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)

    if (lenisInstance) {
      lenisInstance.on("scroll", onScroll)
    }

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (lenisInstance) {
        lenisInstance.off("scroll", onScroll)
      }
    }
  }, [lenisInstance])

  // Back button keyboard listener
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (viewState.type === "project") {
          navigate({ type: "catalog" })
        } else if (viewState.type !== "home") {
          navigate({ type: "home" })
        }
      }
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [viewState, navigate])

  // 1. Render project detail page when a project view is active
  if (viewState.type === "project") {
    const currentProject =
      PROJECTS.find((p) => p.id === viewState.projectId) ?? PROJECTS[0]
    return (
      <Suspense fallback={null}>
        <ProjectDetailPage
          project={currentProject}
          onBack={() => navigate({ type: "catalog" })}
          onNavigateHome={() => navigate({ type: "home" })}
          onNavigateContact={() => navigate({ type: "contact" })}
          onNavigateAbout={() => navigate({ type: "about" })}
          lenis={lenisInstance}
        />
      </Suspense>
    )
  }

  // 2. Render All Projects catalog page when catalog view is active
  if (viewState.type === "catalog") {
    return (
      <Suspense fallback={null}>
        <AllProjectsPage
          onSelectProject={(id) => navigate({ type: "project", projectId: id })}
          onNavigateHome={() => navigate({ type: "home" })}
          onNavigateContact={() => navigate({ type: "contact" })}
          onNavigateAbout={() => navigate({ type: "about" })}
          lenis={lenisInstance}
        />
      </Suspense>
    )
  }

  // 3. Render dedicated Contact page when contact view is active
  if (viewState.type === "contact") {
    return (
      <Suspense fallback={null}>
        <ContactPage
          onNavigateHome={() => navigate({ type: "home" })}
          onNavigateProjects={() => navigate({ type: "catalog" })}
          onNavigateAbout={() => navigate({ type: "about" })}
          lenis={lenisInstance}
        />
      </Suspense>
    )
  }

  // 4. Render dedicated About page when about view is active
  if (viewState.type === "about") {
    return (
      <Suspense fallback={null}>
        <AboutPage
          onNavigateHome={() => navigate({ type: "home" })}
          onNavigateProjects={() => navigate({ type: "catalog" })}
          onNavigateContact={() => navigate({ type: "contact" })}
          lenis={lenisInstance}
        />
      </Suspense>
    )
  }

  // 5. Default Home Showcase Shell
  return (
    <div
      id="home"
      className="relative z-0 min-h-screen w-full max-w-full overflow-x-clip text-[var(--fg)] transition-colors duration-300"
    >
      <StickyNavigation
        heroRef={heroRef}
        onNavigateProjects={() => navigate({ type: "catalog" })}
        onNavigateContact={() => navigate({ type: "contact" })}
        onNavigateAbout={() => navigate({ type: "about" })}
        onNavigateHome={() => navigate({ type: "home" })}
      />

      <main className="relative z-10 w-full bg-[var(--bg)] transition-colors duration-300">
        <div className="mx-auto w-full max-w-[1560px] px-4 sm:px-5 md:px-10">
          {/* Hero Section with Parallax Effect */}
          <section
            id="hero"
            ref={heroRef}
            className="hero-scroll-source relative w-full"
          >
            <ParallaxGallery lenis={lenisInstance} />
            <div
              ref={heroFadeRef}
              aria-hidden="true"
              className="hero-bottom-fade"
            />
          </section>

          {/* Partner Logos */}
          <PartnerLogos />

          {/* Studio Philosophy & Statement */}
          <AboutSection />

          {/* Portfolio Showcase Grid & Detail Navigation */}
          <ProjectShowcase
            projects={PROJECTS}
            activeProject={null}
            setActiveProject={(id) => {
              if (id !== null) {
                navigate({ type: "project", projectId: id })
              }
            }}
          />

          {/* Services & Capabilities */}
          <ServicesSection />

          {/* Interactive 5-Step Process Loop */}
          <ProcessSection lenis={lenisInstance} />

          {/* Collaborators & Testimonials */}
          <TestimonialsSection />

          {/* Metrics & Why OFST */}
          <MetricsSection />

          {/* FAQ Accordion */}
          <FaqSection />

          {/* Contact Form with Bilateral Hand Convergence */}
          <ContactSection lenis={lenisInstance} />
        </div>
      </main>

      {/* Sticky Newsletter Curtain & Revealed Bottom Footer */}
      <FooterSection
        lenis={lenisInstance}
        onNavigateProjects={() => navigate({ type: "catalog" })}
        onNavigateContact={() => navigate({ type: "contact" })}
        onNavigateAbout={() => navigate({ type: "about" })}
        onNavigateHome={() => navigate({ type: "home" })}
      />

      {/* Viewport top & bottom blur bars */}
      <div aria-hidden="true" className="top-blur-gradient" />
      <div aria-hidden="true" className="bottom-blur-gradient" />
    </div>
  )
}
