import { useEffect, useRef } from "react"
import type Lenis from "lenis"
import { motion } from "framer-motion"
import StickyNavigation from "./StickyNavigation"
import ContactSection from "./ContactSection"
import FaqSection from "./FaqSection"
import FooterSection from "./FooterSection"
import { unlockBodyScroll } from "../hooks/useScrollLock"

export interface ContactPageProps {
  onNavigateHome: () => void
  onNavigateProjects: () => void
  onNavigateAbout?: () => void
  lenis?: Lenis | null
}

export function ContactPage({
  onNavigateHome,
  onNavigateProjects,
  onNavigateAbout,
  lenis,
}: ContactPageProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    unlockBodyScroll()
    if (lenis) {
      lenis.start()
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [lenis])

  return (
    <div
      ref={containerRef}
      className="relative z-0 min-h-screen w-full max-w-full overflow-x-clip text-[var(--fg)] transition-colors duration-300"
    >
      {/* Studio Navigation identical to Landing & Detail Pages */}
      <StickyNavigation
        onNavigateHome={onNavigateHome}
        onNavigateProjects={onNavigateProjects}
        onNavigateAbout={onNavigateAbout}
        onNavigateContact={() => {
          if (lenis) lenis.scrollTo(0, { immediate: false })
          else window.scrollTo({ top: 0, behavior: "smooth" })
        }}
      />

      {/* Main Content Layer: opaque background scrolling above sticky footer */}
      <div className="relative z-10 w-full bg-[var(--bg)] transition-colors duration-300">
        <motion.main
          initial={{ y: 32, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto w-full max-w-[1560px] px-4 sm:px-5 md:px-10 pt-24 sm:pt-28 md:pt-32"
        >
          {/* Exact Contact Section from the Home Page */}
          <ContactSection lenis={lenis ?? null} initialConverged={true} />

          {/* Existing FAQ Section */}
          <FaqSection />
        </motion.main>
      </div>

      {/* Existing Newsletter and Footer Section */}
      <FooterSection
        lenis={lenis ?? null}
        onNavigateHome={onNavigateHome}
        onNavigateProjects={onNavigateProjects}
        onNavigateAbout={onNavigateAbout}
        onNavigateContact={() => {
          if (lenis) {
            lenis.scrollTo(0, { immediate: false })
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
        }}
      />

      {/* Viewport Top & Bottom Blur Bars */}
      <div aria-hidden="true" className="top-blur-gradient" />
      <div aria-hidden="true" className="bottom-blur-gradient" />
    </div>
  )
}

export default ContactPage
