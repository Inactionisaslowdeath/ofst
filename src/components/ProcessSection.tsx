import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PROCESS_STEPS } from "../data/content"
import { CornerLabel } from "./ui/MotionPrimitives"

export function ProcessSection() {
  const [step, setStep] = useState(0)

  return (
    <section
      id="process"
      className="flex min-h-[min(55vw,828px)] scroll-mt-20 flex-col rounded-[5px] bg-[#030303] p-5 text-white dark:bg-white dark:text-[#030303] max-md:min-h-[550px]"
    >
      <CornerLabel>Less Noise. More Clarity.</CornerLabel>
      <div
        className="flex flex-1 flex-col items-center justify-center px-5 py-20 text-center"
        aria-live="polite"
      >
        <AnimatePresence mode="popLayout">
          <motion.div key={step} className="flex flex-col items-center">
            <h2 className="text-[40px] leading-[46.4px] tracking-[-2px] flex overflow-hidden">
              {PROCESS_STEPS[step].title.split("").map((char, i) => (
                <motion.span
                  key={`${step}-${i}`}
                  initial={{ opacity: 0, y: 24, filter: "blur(20px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -16, filter: "blur(12px)" }}
                  transition={{
                    duration: 0.42,
                    ease: [0.16, 1, 0.3, 1],
                    delay: i * 0.04,
                  }}
                  style={{ display: "inline-block", whiteSpace: "pre" }}
                >
                  {char}
                </motion.span>
              ))}
            </h2>
            <motion.p
              key={`desc-${step}`}
              initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1,
              }}
              className="mt-3 text-[16px] tracking-[-0.48px]"
            >
              {PROCESS_STEPS[step].description}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="relative grid grid-cols-5 border-t border-white/20 dark:border-black/20">
        {PROCESS_STEPS.map(({ title }, index) => (
          <button
            key={title}
            type="button"
            onClick={() => setStep(index)}
            aria-pressed={step === index}
            className={`relative flex flex-col items-center gap-3 py-7 text-[12px] transition-opacity md:text-[16px] cursor-pointer ${
              step === index ? "opacity-100" : "opacity-40 hover:opacity-80"
            }`}
          >
            {/* Loading line indicator directly above the step button */}
            <div className="absolute -top-[1.5px] left-0 right-0 h-[2.5px] overflow-hidden">
              {step === index ? (
                <motion.div
                  key={`progress-${step}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 4.5, ease: "linear" }}
                  onAnimationComplete={() => {
                    setStep((current) => (current + 1) % PROCESS_STEPS.length)
                  }}
                  className="h-full w-full origin-left bg-white dark:bg-[#030303]"
                />
              ) : null}
            </div>
            <span className="text-[12px]">0{index + 1}</span>
            {title}
          </button>
        ))}
      </div>
    </section>
  )
}

export default ProcessSection
