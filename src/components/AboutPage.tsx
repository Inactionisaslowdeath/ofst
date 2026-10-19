import { useEffect, useRef, useState } from "react"
import type Lenis from "lenis"
import { motion, AnimatePresence } from "framer-motion"
import StickyNavigation from "./StickyNavigation"
import ServicesSection from "./ServicesSection"
import FaqSection from "./FaqSection"
import FooterSection from "./FooterSection"
import { unlockBodyScroll } from "../hooks/useScrollLock"
import {
  AdaptiveRevealParagraph,
  Counter,
  KineticBarcode,
  RevealLine,
} from "./ui/MotionPrimitives"

export interface AboutPageProps {
  onNavigateHome: () => void
  onNavigateProjects: () => void
  onNavigateContact: () => void
  lenis?: Lenis | null
}

const CAPABILITIES_ROWS = [
  {
    col1: "Brand Identity",
    col2: "Digital Products",
    col3: "Design Engineering",
  },
  {
    col1: "Visual Systems",
    col2: "Web Design & Motion",
    col3: "Technical Direction",
  },
  {
    col1: "Creative Direction",
    col2: "Interactive Systems",
    col3: "Prototyping",
  },
  {
    col1: "Editorial & Typography",
    col2: "Spatial & 3D Design",
    col3: "Production & Art Direction",
  },
]

const PARTNER_LOGOS = [
  {
    id: 1,
    light: "/assets/about/partner-logo-mark-1@3x.png",
    dark: "/assets/about/partner-logo-mark-1@3x-dark.png",
    alt: "Partner logo 1",
  },
  {
    id: 2,
    light: "/assets/about/partner-logo-mark-2@3x.png",
    dark: "/assets/about/partner-logo-mark-2@3x-dark.png",
    alt: "Partner logo 2",
  },
  {
    id: 3,
    light: "/assets/about/partner-logo-mark-1@3x.png",
    dark: "/assets/about/partner-logo-mark-1@3x-dark.png",
    alt: "Partner logo 3",
  },
  {
    id: 4,
    light: "/assets/about/partner-logo-mark-2@3x.png",
    dark: "/assets/about/partner-logo-mark-2@3x-dark.png",
    alt: "Partner logo 4",
  },
]

function PartnerLogoCarousel() {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setOffset((prev) => (prev + 1) % PARTNER_LOGOS.length)
    }, 2800)
    return () => clearInterval(timer)
  }, [])

  return (
    <div
      aria-label="Partner brand logos"
      className="mt-4 md:mt-[30px] mx-auto w-full max-w-[1560px] grid grid-cols-2 md:grid-cols-4 gap-[5px] md:h-[70px]"
    >
      {[0, 1, 2, 3].map((slotIndex) => {
        const logoIndex = (slotIndex + offset) % PARTNER_LOGOS.length
        const currentPartner = PARTNER_LOGOS[logoIndex]

        return (
          <div
            key={slotIndex}
            className="relative flex h-[70px] w-full min-w-0 md:max-w-[386.25px] items-center justify-center overflow-hidden rounded-[10px] bg-[#f2f2f2] dark:bg-[#18181b] px-3 sm:px-4"
          >
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={`${slotIndex}-${currentPartner.id}-${offset}`}
                initial={{ transform: "translateX(100%)", opacity: 0 }}
                animate={{ transform: "translateX(0%)", opacity: 1 }}
                exit={{ transform: "translateX(-100%)", opacity: 0 }}
                transition={{
                  duration: 0.85,
                  ease: [0.77, 0, 0.175, 1], // ease-in-out: slow start, fast in the middle, slow end
                }}
                className="flex size-full items-center justify-center will-change-[transform,opacity]"
              >
                <img
                  src={currentPartner.light}
                  alt={currentPartner.alt}
                  className="h-[20px] sm:h-[26px] w-auto max-w-[85%] object-contain dark:hidden select-none pointer-events-none"
                />
                <img
                  src={currentPartner.dark}
                  alt={currentPartner.alt}
                  className="hidden h-[20px] sm:h-[26px] w-auto max-w-[85%] object-contain dark:block select-none pointer-events-none"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

export function AboutPage({
  onNavigateHome,
  onNavigateProjects,
  onNavigateContact,
  lenis,
}: AboutPageProps) {
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
      {/* Canonical Navigation */}
      <StickyNavigation
        onNavigateHome={onNavigateHome}
        onNavigateProjects={onNavigateProjects}
        onNavigateContact={onNavigateContact}
        onNavigateAbout={() => {
          if (lenis) lenis.scrollTo(0, { immediate: false })
          else window.scrollTo({ top: 0, behavior: "smooth" })
        }}
      />

      {/* Main Content Layer: opaque background scrolling above sticky footer */}
      <div className="relative z-10 w-full bg-[var(--bg)] transition-colors duration-300">
        <motion.main
          initial={{ y: 56, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 4.15, ease: [0.12, 1, 0.22, 1] }}
          className="mx-auto w-full max-w-[1640px] px-4 sm:px-5 md:px-10 pt-24 sm:pt-28 md:pt-32"
        >
          {/* Section 1: Hero Double-Card Showcase with Exact Dimensions */}
          <section aria-label="Featured showcases" className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-[30px] items-start">
              {/* Left Card: exact W:765, H:856.98, rounded 10 */}
              <div className="relative w-full max-w-[765px] aspect-[765/856.98] overflow-hidden rounded-[10px] bg-[#f2f2f2] dark:bg-[#18181b]">
                <img
                  src="/assets/about/left-hand-device.png"
                  alt="Hand wearing titanium smart ring holding smartphone"
                  className="size-full object-cover rounded-[10px]"
                />
              </div>

              {/* Right Column: Text container (W:765, H:55.22) + Card (W:765, H:765) */}
              <div className="flex flex-col w-full max-w-[765px]">
                {/* Text Container: exact W:765, H:55.22, font size 16, line height 18.4, letter spacing -0.48px */}
                <div className="w-full max-w-[765px] min-h-[55.22px] mb-[36.76px] max-md:mb-4 text-[16px] leading-[18.4px] tracking-[-0.48px] text-[#030303] dark:text-white select-none">
                  <div className="hidden md:block">
                    <p className="whitespace-nowrap">
                      Founded in 2023, we've built a practice around the power
                      of contrast—visual,
                    </p>
                    <p className="whitespace-nowrap">
                      conceptual, and emotional. We believe the most compelling
                      digital experiences
                    </p>
                    <p>
                      don't try to please everyone. They make deliberate choices
                      that resonate deeply with the right audience.
                    </p>
                  </div>
                  <p className="block md:hidden">
                    Founded in 2023, we've built a practice around the power of
                    contrast—visual, conceptual, and emotional. We believe the
                    most compelling digital experiences don't try to please
                    everyone. They make deliberate choices that resonate deeply
                    with the right audience.
                  </p>
                </div>

                {/* Right Card: exact W:765, H:765, rounded 10 */}
                <div className="relative w-full max-w-[765px] aspect-square overflow-hidden rounded-[10px] bg-[#f2f2f2] dark:bg-[#18181b]">
                  <img
                    src="/assets/about/right-sculpture.png"
                    alt="3D sculptural organic flower with mesh cushion texture"
                    className="size-full object-cover rounded-[10px]"
                  />
                </div>
              </div>
            </div>

            {/* Partner Logo Shapes: On desktop Total W:1560, H:70 | 4 Shapes, each W:386.25, H:70, corner radius: 10. On mobile: 2x2 grid */}
            <PartnerLogoCarousel />
          </section>

          {/* Section 2: Studio Statement with Barcode Graphics */}
          <section
            aria-label="Studio Statement"
            className="py-20 sm:py-28 md:py-36"
          >
            <div className="flex flex-col items-center justify-center text-center mb-12 sm:mb-16">
              <p className="text-[12px] leading-[14.4px] tracking-[-0.48px] text-[#030303] dark:text-white">
                We don’t follow trends.
              </p>
              <p className="text-[12px] leading-[14.4px] tracking-[-0.48px] text-[#030303] dark:text-white">
                We build what feels inevitable.
              </p>
            </div>

            <div className="grid items-center gap-10 md:grid-cols-[1fr_2fr] md:content-center md:items-baseline">
              {/* Left Column: Kinetic Barcode Stripe Element */}
              <KineticBarcode />

              <div className="w-full space-y-8 md:space-y-10 md:-translate-x-[80px]">
                <AdaptiveRevealParagraph
                  containerClassName="w-full max-w-[1040px] text-[30px] leading-[1.16] tracking-tight-statement [container-type:inline-size] md:text-[40px] md:tracking-tight-display"
                  baseDelay={0.05}
                  lines={[
                    {
                      prefix: (
                        <span className="text-[#696969] dark:text-[#a1a1aa]">
                          OFST
                        </span>
                      ),
                      text: "is an independent digital studio built on contrast and craft.",
                      desktopClassName:
                        "block md:text-left md:text-[min(40px,3.75cqw)] md:whitespace-nowrap",
                    },
                    {
                      text: "Strategy and emotion. Restraint and impact. Clarity and intent.",
                      desktopClassName:
                        "block md:text-left md:text-[min(40px,3.75cqw)] md:whitespace-nowrap",
                    },
                  ]}
                />

                <AdaptiveRevealParagraph
                  containerClassName="w-full max-w-[1040px] text-[30px] leading-[1.16] tracking-tight-statement [container-type:inline-size] md:text-[40px] md:tracking-tight-display"
                  baseDelay={0.25}
                  lines={[
                    {
                      text: "We believe design is a conversation — one that doesn't need to be loud",
                      desktopClassName:
                        "block md:text-left md:text-[min(40px,3.75cqw)] md:whitespace-nowrap",
                    },
                    {
                      text: "to command presence. Our work balances clarity with intent, crafting",
                      desktopClassName:
                        "block md:text-left md:text-[min(40px,3.75cqw)] md:whitespace-nowrap",
                    },
                    {
                      text: "experiences that stay with you.",
                      desktopClassName:
                        "block md:text-left md:text-[min(40px,3.75cqw)] md:whitespace-nowrap",
                    },
                  ]}
                />
              </div>
            </div>
          </section>

          {/* Section 3: "What We Do Perfectly" (Our Home Page Services Section) */}
          <ServicesSection />

          {/* Section 4: Brand Statement & Metrics Counter (Exact Home Page Showcase Style) */}
          <section
            aria-label="Studio impact and metrics"
            className="py-14 sm:py-20 border-t border-[#e5e5e5] dark:border-white/10 mt-14"
          >
            <div className="ml-auto mt-6 sm:mt-10 md:mt-14 w-full max-w-[1040px]">
              <AdaptiveRevealParagraph
                containerClassName="w-full max-w-[1040px] text-[30px] leading-[1.16] tracking-tight-statement [container-type:inline-size] md:text-[40px] md:tracking-tight-display"
                baseDelay={0.05}
                lines={[
                  {
                    text: "We build distinctive brands and digital experiences around",
                    desktopClassName:
                      "block md:text-right md:text-[min(40px,3.75cqw)] md:whitespace-nowrap",
                  },
                  {
                    text: "a clear idea and a real purpose. Explore a selection of concepts",
                    desktopClassName:
                      "block md:text-left md:text-[min(40px,3.75cqw)] md:whitespace-nowrap",
                  },
                  {
                    text: "and design explorations from the OFST studio.",
                    desktopClassName:
                      "block md:text-left md:text-[min(40px,3.75cqw)]",
                  },
                ]}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-5 py-20 md:py-28 md:-translate-x-[7px]">
              {[
                { val: 8, suffix: "+", label: "Crafting Experiences" },
                { val: 50, suffix: "+", label: "Projects Delivered" },
                { val: 20, suffix: "+", label: "Clients Worldwide" },
              ].map(({ val, suffix, label }, index) => (
                <div key={label} className="text-center">
                  <p className="text-[55px] font-semibold leading-[1.65] tracking-tight-hero tabular-nums md:text-[90px]">
                    <Counter
                      target={val}
                      suffix={suffix}
                      className="number-gradient-180"
                    />
                  </p>
                  <p className="mt-3 text-[12px] tracking-[-0.54px] md:text-[20px]">
                    <RevealLine delay={0.15 + index * 0.08}>{label}</RevealLine>
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Capabilities Directory */}
          <section
            aria-label="Studio Capabilities"
            className="py-16 sm:py-24 border-t border-[#e5e5e5] dark:border-white/10"
          >
            <div className="mx-auto w-full max-w-[1880px] mb-8 sm:mb-10">
              <h3 className="text-[40px] font-medium leading-[1.15] tracking-tight-display text-[#030303] dark:text-white">
                Capabilities
              </h3>
            </div>

            {/* Desktop Capabilities: 4 rows x 3 columns */}
            <div className="hidden md:flex mx-auto w-full max-w-[1880px] flex-col gap-2">
              {CAPABILITIES_ROWS.map((row) => (
                <div
                  key={row.col1}
                  className="grid h-[38.41px] w-full max-w-[1880px] grid-cols-3 items-center rounded-[8px] bg-[#f2f2f2] dark:bg-[#18181b] px-6 text-[16px] tracking-[-0.48px] text-[#030303] dark:text-white transition-[background-color,transform] duration-150 hover:bg-[#e8e8e8] dark:hover:bg-[#222226]"
                >
                  <span className="text-left font-normal select-none truncate">
                    {row.col1}
                  </span>
                  <span className="text-left font-normal select-none truncate">
                    {row.col2}
                  </span>
                  <span className="text-left font-normal select-none truncate">
                    {row.col3}
                  </span>
                </div>
              ))}
            </div>

            {/* Mobile Capabilities: 6 rows x 2 columns (6 on left, 6 on right) */}
            <div className="flex md:hidden mx-auto w-full flex-col gap-2">
              {[
                { left: "Brand Identity", right: "Creative Direction" },
                { left: "Digital Products", right: "Interactive Systems" },
                { left: "Design Engineering", right: "Prototyping" },
                { left: "Visual Systems", right: "Editorial & Typography" },
                { left: "Web Design & Motion", right: "Spatial & 3D Design" },
                {
                  left: "Technical Direction",
                  right: "Production & Art Direction",
                },
              ].map((pair) => (
                <div
                  key={pair.left}
                  className="grid h-[38.41px] w-full grid-cols-2 items-center rounded-[8px] bg-[#f2f2f2] dark:bg-[#18181b] px-4 text-[14px] sm:text-[16px] tracking-[-0.48px] text-[#030303] dark:text-white transition-[background-color,transform] duration-150"
                >
                  <span className="text-left font-normal select-none truncate pr-2">
                    {pair.left}
                  </span>
                  <span className="text-left font-normal select-none truncate pl-2">
                    {pair.right}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6: Existing Studio FAQ */}
          <FaqSection />
        </motion.main>
      </div>

      {/* Section 7: Existing Newsletter and Footer */}
      <FooterSection
        lenis={lenis ?? null}
        onNavigateHome={onNavigateHome}
        onNavigateProjects={onNavigateProjects}
        onNavigateContact={onNavigateContact}
        onNavigateAbout={() => {
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

export default AboutPage
