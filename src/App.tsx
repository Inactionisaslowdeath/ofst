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
import { useSmoothScroll } from "./hooks/useSmoothScroll"
import { PROJECTS } from "./data/content"

export default function App() {
  const [project, setProject] = useState<number | null>(null)
  const heroRef = useRef<HTMLElement | null>(null)
  const heroFadeRef = useRef<HTMLDivElement | null>(null)
  const lenisInstance = useSmoothScroll()

  // Hero bottom fade scroll progress calculation
  useEffect(() => {
    let ticking = false
    const updateHeroFade = () => {
      const hero = heroRef.current
      const fade = heroFadeRef.current
      if (!hero || !fade) return

      const rect = hero.getBoundingClientRect()
      const windowHeight = window.innerHeight

      if (rect.bottom <= 0 || rect.top >= windowHeight) {
        fade.style.opacity = "0"
        ticking = false
        return
      }

      if (rect.bottom < windowHeight) {
        const progress = Math.max(
          0,
          Math.min(1, (rect.bottom - (windowHeight - 120)) / 120),
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
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  // Lock body scroll and focus when project modal is active
  useEffect(() => {
    if (project === null) return
    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    lenisInstance?.stop()
    document.body.style.overflow = "hidden"
    const closeButton = document.querySelector<HTMLButtonElement>(
      '[aria-label="Close project"]',
    )
    closeButton?.focus()

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setProject(null)
      if (event.key === "Tab") {
        event.preventDefault()
        closeButton?.focus()
      }
    }
    document.addEventListener("keydown", handleKey)
    return () => {
      document.body.style.overflow = previousOverflow
      lenisInstance?.start()
      document.removeEventListener("keydown", handleKey)
      previousFocus?.focus()
    }
  }, [project, lenisInstance])

  return (
    <div
      id="home"
      className="min-h-screen w-full max-w-full overflow-x-hidden bg-[var(--bg)] text-[var(--fg)] transition-colors duration-300"
    >
      <main className="mx-auto w-full max-w-[1560px] px-4 sm:px-5 md:px-10">
        {/* Hero Section with Parallax Effect */}
        <section id="hero" ref={heroRef} className="relative w-full">
          <StickyNavigation heroRef={heroRef} />
          <ParallaxGallery lenis={lenisInstance} />
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
      </main>

      {/* Sticky Newsletter Curtain & Revealed Bottom Footer */}
      <FooterSection lenis={lenisInstance} />

      {/* Hero section bottom fade overlay */}
      <div ref={heroFadeRef} aria-hidden="true" className="hero-bottom-fade" />

      {/* Viewport top & bottom blur bars */}
      <div aria-hidden="true" className="top-blur-gradient" />
      <div aria-hidden="true" className="bottom-blur-gradient" />
    </div>
  )
}
