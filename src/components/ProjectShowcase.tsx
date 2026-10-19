import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type { ProjectItem } from "../data/content"

import {
  Counter,
  RevealLine,
  AdaptiveRevealParagraph,
} from "./ui/MotionPrimitives"

gsap.registerPlugin(ScrollTrigger)

export interface ProjectShowcaseProps {
  projects: ProjectItem[]
  activeProject: number | null
  setActiveProject: (index: number | null) => void
}

export function ProjectShowcase({
  projects,
  activeProject,
  setActiveProject,
}: ProjectShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (activeProject === null) return

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveProject(null)
      }
    }

    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [activeProject, setActiveProject])

  useEffect(() => {
    const isJSDOM =
      typeof navigator !== "undefined" &&
      /jsdom/i.test(navigator.userAgent || "")
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    if (isJSDOM || reducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      const cards =
        sectionRef.current?.querySelectorAll<HTMLElement>(".project-card")
      cards?.forEach((card) => {
        const innerImg = card.querySelector<HTMLElement>(".project-image-inner")
        if (!innerImg) return

        gsap.fromTo(
          innerImg,
          { yPercent: -18 },
          {
            yPercent: 18,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [projects])

  const selectedItem = activeProject !== null ? projects[activeProject] : null

  return (
    <section id="projects" ref={sectionRef} className="scroll-mt-20 pt-10">
      <h2 className="mb-5 text-[40px] leading-[46.4px] tracking-tight-display">
        <div className="block">
          <RevealLine className="inline-block text-gradient-black-to-white">
            Selected Work
          </RevealLine>
        </div>
        <div className="block">
          <RevealLine
            delay={0.1}
            className="inline-block text-gradient-gray-to-white"
          >
            Made with Intent.
          </RevealLine>
        </div>
      </h2>

      <div className="grid min-h-[500px] grid-cols-1 items-end gap-2 rounded-[10px] bg-[#030303] px-4 pb-4 pt-[10%] text-white dark:bg-white dark:text-[#030303] md:min-h-[min(65vw,991px)] md:grid-cols-2">
        <button
          type="button"
          onClick={() => setActiveProject(0)}
          className="project-card group text-left cursor-pointer transition-[transform,opacity] duration-150 active:scale-[0.98]"
        >
          <div className="relative aspect-[738/781] w-full overflow-hidden rounded-[5px]">
            <div className="project-image-inner absolute inset-0 size-full scale-[1.38] will-change-transform">
              <img
                src={`/assets/${projects[0].image}`}
                alt={projects[0].alt || projects[0].name}
                className="size-full object-cover transition-opacity duration-200 @media(hover:hover):group-hover:opacity-85"
              />
            </div>
          </div>
          <span className="mt-2 block text-[12px] text-white dark:text-[#030303]">
            {projects[0].name}
          </span>
        </button>

        <div className="grid grid-cols-3 gap-2">
          {projects.slice(1).map((item, index) => (
            <button
              type="button"
              onClick={() => setActiveProject(index + 1)}
              key={item.name}
              className="project-card group text-left cursor-pointer transition-[transform,opacity] duration-150 active:scale-[0.97]"
            >
              <div className="relative aspect-[243/257] w-full overflow-hidden rounded-[5px]">
                <div className="project-image-inner absolute inset-0 size-full scale-[1.38] will-change-transform">
                  <img
                    src={`/assets/${item.image}`}
                    alt={item.name}
                    className="size-full object-cover transition-opacity duration-200 @media(hover:hover):group-hover:opacity-85"
                  />
                </div>
              </div>
              <span className="mt-2 block text-[12px] text-white dark:text-[#030303]">
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <AdaptiveRevealParagraph
        containerClassName="ml-auto mt-20 w-full max-w-[1040px] text-[30px] leading-[1.16] tracking-tight-statement [container-type:inline-size] md:text-[40px] md:tracking-tight-display"
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
            desktopClassName: "block md:text-left md:text-[min(40px,3.75cqw)]",
          },
        ]}
      />

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

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-5 backdrop-blur-sm"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-label={selectedItem.name}
              initial={{ scale: 0.95, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 8 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="relative max-h-[90dvh] max-w-[760px] overflow-auto rounded-[10px] bg-[#030303] p-4 text-white"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                autoFocus
                type="button"
                onClick={() => setActiveProject(null)}
                aria-label="Close project"
                className="absolute right-6 top-6 flex size-8 items-center justify-center rounded-full bg-black/70 text-white transition-transform duration-150 active:scale-90 hover:bg-black/90 cursor-pointer"
              >
                ✕
              </button>
              <img
                src={`/assets/${selectedItem.image}`}
                alt={selectedItem.name}
                className="max-h-[75dvh] w-full object-contain"
              />
              <h2 className="pt-4 text-[20px] font-medium">
                {selectedItem.name}
              </h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default ProjectShowcase
