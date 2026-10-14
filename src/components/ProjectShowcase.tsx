import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import type { ProjectItem } from "../data/content"

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
        <span className="block">Proof of Less</span>
        <span className="block text-[#696969]">But More.</span>
      </h2>

      <div className="grid min-h-[500px] grid-cols-1 items-end gap-2 rounded-[10px] bg-[#030303] px-4 pb-4 pt-[10%] text-white dark:bg-white dark:text-[#030303] md:min-h-[min(65vw,991px)] md:grid-cols-2">
        <button
          type="button"
          onClick={() => setActiveProject(0)}
          className="group text-left cursor-pointer"
        >
          <img
            src={`/assets/${projects[0].image}`}
            alt={projects[0].alt || projects[0].name}
            className="aspect-[738/781] w-full rounded-[5px] object-cover transition-opacity group-hover:opacity-80"
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
              className="group text-left cursor-pointer"
            >
              <img
                src={`/assets/${item.image}`}
                alt={item.name}
                className="aspect-[243/257] w-full rounded-[5px] object-cover transition-opacity group-hover:opacity-80"
              />
              <span className="mt-2 block text-[12px] text-white dark:text-[#030303]">
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <p className="ml-auto mt-20 w-full max-w-[1040px] text-[30px] leading-[1.16] tracking-[-1.5px] [container-type:inline-size] md:text-[40px] md:tracking-[-2px]">
        <span className="md:block md:text-right md:text-[min(40px,3.75cqw)] md:whitespace-nowrap">We craft minimalistic, purposeful digital experiences that</span>{" "}
        <span className="md:block md:text-left md:text-[min(40px,3.75cqw)] md:whitespace-nowrap">resonate with clarity and intention. Every project is a story; here's</span>{" "}
        <span className="md:block md:text-left md:text-[min(40px,3.75cqw)]">what ours says..</span>
      </p>

      <div className="grid grid-cols-3 gap-5 py-20 md:py-28 -translate-x-[7px]">
        {[
          { val: 8, suffix: "+", label: "Crafting Experiences" },
          { val: 50, suffix: "+", label: "Projects Delivered" },
          { val: 20, suffix: "+", label: "Clients Worldwide" },
        ].map(({ val, suffix, label }) => (
          <div key={label} className="text-center">
            <p className="text-[55px] font-semibold leading-[1.65] tracking-[-5px] md:text-[90px] md:tracking-[-10px]">
              {val}{suffix}
            </p>
            <p className="mt-3 text-[12px] tracking-[-0.4px] md:text-[20px]">
              {label}
            </p>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-5 backdrop-blur-sm"
          onClick={() => setActiveProject(null)}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label={selectedItem.name}
            className="relative max-h-[90dvh] max-w-[760px] overflow-auto rounded-[10px] bg-[#030303] p-4 text-white"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              autoFocus
              type="button"
              onClick={() => setActiveProject(null)}
              aria-label="Close project"
              className="absolute right-6 top-6 rounded-full bg-black px-3 py-1 text-[24px] cursor-pointer"
            >
              ×
            </button>
            <img
              src={`/assets/${selectedItem.image}`}
              alt={selectedItem.name}
              className="max-h-[75dvh] w-full object-contain"
            />
            <h2 className="pt-4 text-[20px]">{selectedItem.name}</h2>
          </div>
        </div>
      )}
    </section>
  )
}

export default ProjectShowcase
