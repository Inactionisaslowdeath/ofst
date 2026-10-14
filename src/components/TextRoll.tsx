import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"

export interface TextRollItem {
  number: string
  title: string
  description: string
}

export function TextRoll({ items }: { items: TextRollItem[] }) {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div className="flex flex-col border-t border-[#d6d6d6] dark:border-[#27272a]">
      {items.map((item, index) => {
        const isHovered = hovered === index

        return (
          <div
            key={item.number}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className="group flex flex-col justify-between border-b border-[#d6d6d6] py-5 transition-colors dark:border-[#27272a] sm:py-6"
          >
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-mono text-[#696969] sm:text-[14px]">
                {item.number}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-[18px] font-medium tracking-tight text-[#030303] transition-transform duration-300 group-hover:translate-x-1 dark:text-white sm:text-[22px]">
                  {item.title}
                </span>
                <span
                  aria-hidden="true"
                  className={`size-4 text-[#696969] transition-transform duration-300 ${
                    isHovered ? "rotate-45 text-[#030303] dark:text-white" : ""
                  }`}
                >
                  <Plus className="size-4" />
                </span>
              </div>
            </div>

            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pt-3 text-[13px] leading-relaxed text-[#696969] sm:text-[14px]">
                    {item.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

export default TextRoll
