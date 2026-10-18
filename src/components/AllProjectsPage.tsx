import { useEffect, useRef, useState } from "react"
import type Lenis from "lenis"
import { motion, AnimatePresence } from "framer-motion"
import StickyNavigation from "./StickyNavigation"
import FooterSection from "./FooterSection"
import { RevealBlock } from "./ui/MotionPrimitives"
import { PROJECTS } from "../data/content"

export interface AllProjectsPageProps {
  onSelectProject: (projectId: number) => void
  onNavigateHome: () => void
  onNavigateContact?: () => void
  onNavigateAbout?: () => void
  lenis?: Lenis | null
}

const CATEGORIES = [
  "All",
  "Brand Identity",
  "Digital Design",
  "product Design",
  "Editorial & Print Design",
]

export default function AllProjectsPage({
  onSelectProject,
  onNavigateHome,
  onNavigateContact,
  onNavigateAbout,
  lenis,
}: AllProjectsPageProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.style.overflow = ""
    if (lenis) {
      lenis.start()
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [lenis])

  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory)

  const pageMotion = {
    initial: { y: 56, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: {
      duration: 4.15,
      ease: [0.12, 1, 0.22, 1] as const,
    },
  }

  return (
    <div
      ref={containerRef}
      className="relative z-0 min-h-screen w-full overflow-x-clip text-[var(--fg)] transition-colors duration-300"
    >
      {/* Universal Sticky Navigation matching Home Page */}
      <StickyNavigation
        onNavigateHome={onNavigateHome}
        onNavigateProjects={() => {
          if (lenis) lenis.scrollTo(0, { immediate: false })
          else window.scrollTo({ top: 0, behavior: "smooth" })
        }}
        onNavigateContact={onNavigateContact}
        onNavigateAbout={onNavigateAbout}
      />

      {/* Main Page Elements with Page Slide-Up Animation */}
      <motion.div {...pageMotion} className="relative z-10 w-full">
        {/* Main Catalog Section */}
        <main className="relative z-10 w-full bg-[var(--bg)] transition-colors duration-300">
          <div className="mx-auto w-full max-w-[1920px] px-5 sm:px-10 md:px-[60px] lg:px-[180px] pt-28 sm:pt-36 md:pt-[150px] pb-24 md:pb-[140px]">
            {/* Top Header: Bar line design on left, "Projects." on right */}
            <div className="flex items-center justify-between gap-4">
              {/* Bar lines design identical to Home Page */}
              <RevealBlock
                delay={0.05}
                className="flex h-[26px] sm:h-[30px] shrink-0 items-stretch gap-[2.5px] sm:gap-[3px]"
              >
                <span className="w-7 sm:w-8 rounded-[1px] bg-[#030303] dark:bg-white" />
                <span className="w-5 sm:w-6 rounded-[1px] bg-[#030303] dark:bg-white" />
                <span className="w-3 sm:w-[14px] rounded-[1px] bg-[#030303] dark:bg-white" />
                {Array.from({ length: 17 }, (_, index) => (
                  <span
                    key={index}
                    className="w-[2px] rounded-[1px] bg-[#030303] dark:bg-white"
                  />
                ))}
              </RevealBlock>

              {/* Heading */}
              <h1 className="text-right text-[34px] sm:text-[46px] md:text-[52px] font-normal leading-none tracking-tight-hero text-[var(--fg)] shrink-0">
                Projects.
              </h1>
            </div>

            {/* Filter Pills */}
            <div className="mt-10 sm:mt-14 flex flex-wrap items-center gap-2 sm:gap-2.5">
              {CATEGORIES.map((cat) => {
                const isSelected = activeCategory === cat
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-[7px] px-3.5 py-1.5 text-[14px] sm:text-[15px] font-normal leading-none tracking-[-0.54px] transition-[background-color,color,transform] duration-150 active:scale-[0.96] cursor-pointer ${
                      isSelected
                        ? "bg-[#030303] text-white dark:bg-white dark:text-[#030303]"
                        : "bg-[#f2f2f2] text-[#696969] hover:bg-[#e6e6e6] hover:text-[#030303] dark:bg-[#18181b] dark:text-[#a1a1aa] dark:hover:bg-[#27272a] dark:hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>

            {/* Project Cards Grid */}
            <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-[5px] sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectProject(item.id)}
                  className="group flex flex-col text-left cursor-pointer transition-transform duration-150 active:scale-[0.98]"
                >
                  <div className="relative aspect-[512/560] w-full overflow-hidden rounded-[10px] bg-[#e6e6e6] dark:bg-[#18181b]">
                    <img
                      src={`/assets/${item.image}`}
                      alt={item.alt || item.name}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover transition-transform duration-300 ease-out @media(hover:hover):group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="mt-2.5 flex items-center justify-between px-0.5">
                    <span className="text-[13px] sm:text-[14px] font-normal tracking-[-0.54px] text-[var(--fg)] opacity-90">
                      {item.name}
                    </span>
                    {item.category && (
                      <span className="text-[11px] sm:text-[12px] tracking-[-0.54px] text-[#888888]">
                        {item.category}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </main>

        {/* Studio Footer */}
        <FooterSection
          lenis={lenis ?? null}
          onNavigateHome={onNavigateHome}
          onNavigateContact={onNavigateContact}
          onNavigateAbout={onNavigateAbout}
          onNavigateProjects={() => {
            if (lenis) {
              lenis.scrollTo(0)
            } else {
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
          }}
        />
      </motion.div>

      {/* Viewport Top & Bottom Progressive Blur */}
      <div aria-hidden="true" className="top-blur-gradient" />
      <div aria-hidden="true" className="bottom-blur-gradient" />
    </div>
  )
}
