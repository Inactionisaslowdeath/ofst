import { useEffect, useRef, useState } from "react"
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

import ProjectDetailPage from "./components/ProjectDetailPage"
import AllProjectsPage from "./components/AllProjectsPage"
import ContactPage from "./components/ContactPage"
import AboutPage from "./components/AboutPage"
import { useSmoothScroll } from "./hooks/useSmoothScroll"
import { PROJECTS } from "./data/content"

export default function App() {
  const [project, setProject] = useState<number | null>(null)
  const [showCatalog, setShowCatalog] = useState<boolean>(false)
  const [showContact, setShowContact] = useState<boolean>(false)
  const [showAbout, setShowAbout] = useState<boolean>(false)
  const heroRef = useRef<HTMLElement | null>(null)
  const heroFadeRef = useRef<HTMLDivElement | null>(null)
  const lenisInstance = useSmoothScroll()

  // Hero bottom fade scroll progress calculation
  useEffect(() => {
    const usesMobileViewTimeline =
      window.matchMedia("(max-width: 767px)").matches &&
      CSS.supports("animation-timeline: view()")
    if (usesMobileViewTimeline) return

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
        const progress = Math.max(
          0,
          Math.min(1, (rect.bottom - (windowHeight - 200)) / 200),
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
        if (project !== null) {
          setProject(null)
          setShowCatalog(true)
        } else if (showCatalog) {
          setShowCatalog(false)
        } else if (showContact) {
          setShowContact(false)
        } else if (showAbout) {
          setShowAbout(false)
        }
      }
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [project, showCatalog, showContact, showAbout])

  // 1. Render project detail page when a project is selected
  // Clicking Back inside any Project Details page takes the user to the All Projects page
  if (project !== null) {
    const currentProject = PROJECTS[project] ?? null
    return (
      <ProjectDetailPage
        project={currentProject}
        onBack={() => {
          setProject(null)
          setShowCatalog(true)
        }}
        onNavigateHome={() => {
          setProject(null)
          setShowCatalog(false)
          setShowContact(false)
          setShowAbout(false)
        }}
        onNavigateContact={() => {
          setProject(null)
          setShowCatalog(false)
          setShowAbout(false)
          setShowContact(true)
        }}
        onNavigateAbout={() => {
          setProject(null)
          setShowCatalog(false)
          setShowContact(false)
          setShowAbout(true)
        }}
        lenis={lenisInstance}
      />
    )
  }

  // 2. Render All Projects catalog page when showCatalog is true
  if (showCatalog) {
    return (
      <AllProjectsPage
        onSelectProject={(id) => {
          setProject(id)
        }}
        onNavigateHome={() => {
          setShowCatalog(false)
          setProject(null)
          setShowContact(false)
          setShowAbout(false)
        }}
        onNavigateContact={() => {
          setProject(null)
          setShowCatalog(false)
          setShowAbout(false)
          setShowContact(true)
        }}
        onNavigateAbout={() => {
          setProject(null)
          setShowCatalog(false)
          setShowContact(false)
          setShowAbout(true)
        }}
        lenis={lenisInstance}
      />
    )
  }

  // 3. Render dedicated Contact page when showContact is true
  if (showContact) {
    return (
      <ContactPage
        onNavigateHome={() => {
          setShowContact(false)
          setShowCatalog(false)
          setShowAbout(false)
          setProject(null)
        }}
        onNavigateProjects={() => {
          setShowContact(false)
          setShowAbout(false)
          setProject(null)
          setShowCatalog(true)
        }}
        onNavigateAbout={() => {
          setShowContact(false)
          setProject(null)
          setShowCatalog(false)
          setShowAbout(true)
        }}
        lenis={lenisInstance}
      />
    )
  }

  // 4. Render dedicated About page when showAbout is true
  if (showAbout) {
    return (
      <AboutPage
        onNavigateHome={() => {
          setShowAbout(false)
          setShowContact(false)
          setShowCatalog(false)
          setProject(null)
        }}
        onNavigateProjects={() => {
          setShowAbout(false)
          setShowContact(false)
          setProject(null)
          setShowCatalog(true)
        }}
        onNavigateContact={() => {
          setShowAbout(false)
          setShowCatalog(false)
          setProject(null)
          setShowContact(true)
        }}
        lenis={lenisInstance}
      />
    )
  }

  return (
    <div
      id="home"
      className="relative z-0 min-h-screen w-full max-w-full overflow-x-clip text-[var(--fg)] transition-colors duration-300"
    >
      <StickyNavigation
        heroRef={heroRef}
        onNavigateProjects={() => {
          setProject(null)
          setShowAbout(false)
          setShowContact(false)
          setShowCatalog(true)
        }}
        onNavigateContact={() => {
          setProject(null)
          setShowAbout(false)
          setShowCatalog(false)
          setShowContact(true)
        }}
        onNavigateAbout={() => {
          setProject(null)
          setShowContact(false)
          setShowCatalog(false)
          setShowAbout(true)
        }}
      />

      <main className="relative z-10 w-full bg-[var(--bg)] transition-colors duration-300">
        <div className="mx-auto w-full max-w-[1560px] px-4 sm:px-5 md:px-10">
          {/* Hero Section with Parallax Effect */}
          <section id="hero" ref={heroRef} className="hero-scroll-source relative w-full">
            <ParallaxGallery lenis={lenisInstance} />
            <div ref={heroFadeRef} aria-hidden="true" className="hero-bottom-fade" />
          </section>

        {/* Partner Logos */}
        <PartnerLogos />

        {/* Studio Philosophy & Statement */}
        <AboutSection />

        {/* Portfolio Showcase Grid & Detail Modal */}
        <ProjectShowcase
          projects={PROJECTS}
          activeProject={project}
          setActiveProject={setProject}
        />

        {/* Services & Capabilities */}
        <ServicesSection />

        {/* Interactive 5-Step Process Loop */}
        <ProcessSection />

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
        onNavigateProjects={() => {
          setProject(null)
          setShowAbout(false)
          setShowContact(false)
          setShowCatalog(true)
        }}
        onNavigateContact={() => {
          setProject(null)
          setShowAbout(false)
          setShowCatalog(false)
          setShowContact(true)
        }}
        onNavigateAbout={() => {
          setProject(null)
          setShowContact(false)
          setShowCatalog(false)
          setShowAbout(true)
        }}
      />

      {/* Viewport top & bottom blur bars */}
      <div aria-hidden="true" className="top-blur-gradient" />
      <div aria-hidden="true" className="bottom-blur-gradient" />
    </div>
  )
}
