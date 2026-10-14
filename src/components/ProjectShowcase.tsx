import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { animate } from "motion"
import type { ProjectItem } from "../data/content"

function Counter({
  target,
  suffix = "",
}: {
  target: number
  suffix?: string
}) {
  const [displayValue, setDisplayValue] = useState(0)
  const inView = useRef(false)

  return (
    <motion.span
      initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      onViewportEnter={() => {
        if (inView.current) return
        inView.current = true
        animate(0, target, {
          duration: 1.8,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: (latest) => {
            setDisplayValue(Math.round(latest))
          },
        })
      }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="inline-block tabular-nums"
    >
      {displayValue}
      {suffix}
    </motion.span>
  )
}

function RevealLine({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.span>
  )
}

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

  const selectedItem = activeProject !== null ? projects[activeProject] : null

  return (
    <section id="projects" className="scroll-mt-20 pt-10">
      <h2 className="mb-5 text-[40px] leading-[46.4px] tracking-[-2px]">
        <RevealLine className="block">Proof of Less</RevealLine>
        <RevealLine delay={0.1} className="block text-[#696969]">But More.</RevealLine>
      </h2>

      <div className="grid min-h-[500px] grid-cols-1 items-end gap-2 rounded-[10px] bg-[#030303] px-4 pb-4 pt-[10%] text-white dark:bg-white dark:text-[#030303] md:min-h-[min(65vw,991px)] md:grid-cols-2">
        <button
          type="button"
          onClick={() => setActiveProject(0)}
          className="group text-left cursor-pointer transition-[transform,opacity] duration-150 active:scale-[0.98]"
        >
          <img
            src={`/assets/${projects[0].image}`}
            alt={projects[0].alt || projects[0].name}
            className="aspect-[738/781] w-full rounded-[5px] object-cover transition-opacity duration-200 group-hover:opacity-85"
          />
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
              className="group text-left cursor-pointer transition-[transform,opacity] duration-150 active:scale-[0.97]"
            >
              <img
                src={`/assets/${item.image}`}
                alt={item.name}
                className="aspect-[243/257] w-full rounded-[5px] object-cover transition-opacity duration-200 group-hover:opacity-85"
              />
              <span className="mt-2 block text-[12px] text-white dark:text-[#030303]">
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <p className="ml-auto mt-20 w-full max-w-[1040px] text-[30px] leading-[1.16] tracking-[-1.5px] [container-type:inline-size] md:text-[40px] md:tracking-[-2px]">
        <RevealLine delay={0.05} className="md:block md:text-right md:text-[min(40px,3.75cqw)] md:whitespace-nowrap">We craft minimalistic, purposeful digital experiences that</RevealLine>{" "}
        <RevealLine delay={0.15} className="md:block md:text-left md:text-[min(40px,3.75cqw)] md:whitespace-nowrap">resonate with clarity and intention. Every project is a story; here's</RevealLine>{" "}
        <RevealLine delay={0.25} className="md:block md:text-left md:text-[min(40px,3.75cqw)]">what ours says..</RevealLine>
      </p>

      <div className="grid grid-cols-3 gap-5 py-20 md:py-28 -translate-x-[7px]">
        {[
          { val: 8, suffix: "+", label: "Crafting Experiences" },
          { val: 50, suffix: "+", label: "Projects Delivered" },
          { val: 20, suffix: "+", label: "Clients Worldwide" },
        ].map(({ val, suffix, label }, index) => (
          <div key={label} className="text-center">
            <p className="text-[55px] font-semibold leading-[1.65] tracking-[-5px] tabular-nums md:text-[90px] md:tracking-[-10px]">
              <Counter target={val} suffix={suffix} />
            </p>
            <p className="mt-3 text-[12px] tracking-[-0.4px] md:text-[20px]">
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
              <h2 className="pt-4 text-[20px] font-medium">{selectedItem.name}</h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default ProjectShowcase
