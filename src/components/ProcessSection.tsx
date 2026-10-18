import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type Lenis from "lenis"
import { PROCESS_STEPS } from "../data/content"
import { CornerLabel } from "./ui/MotionPrimitives"

gsap.registerPlugin(ScrollTrigger)

export interface ProcessSectionProps {
  lenis?: Lenis | null
}

export function ProcessSection({ lenis }: ProcessSectionProps) {
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const progressLineRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

  useEffect(() => {
    const isJSDOM =
      typeof navigator !== "undefined" &&
      /jsdom/i.test(navigator.userAgent || "")
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    if (reducedMotion || isJSDOM || !sectionRef.current) return

    const section = sectionRef.current
    const slides = stepRefs.current.filter(Boolean) as HTMLDivElement[]
    const progressLine = progressLineRef.current

    if (slides.length === 0) return

    const isTouch =
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches ||
        window.matchMedia("(max-width: 767px)").matches ||
        ScrollTrigger.isTouch === 1)

    const ctx = gsap.context(() => {
      // Set initial positions: Step 0 visible, remaining steps primed below
      slides.forEach((slide, i) => {
        if (i === 0) {
          gsap.set(slide, { yPercent: 0, opacity: 1, filter: "blur(0px)" })
        } else {
          gsap.set(slide, { yPercent: 20, opacity: 0, filter: "blur(10px)" })
        }
      })

      if (progressLine) {
        gsap.set(progressLine, { scaleX: 0, transformOrigin: "left center" })
      }

      // Master scrubbed timeline for the 5-step pinned sequence
      // On mobile / touch, pinType: "transform" keeps pinning strictly on the JS thread
      // in 100% sync with normalizeScroll(true), completely eliminating layer-toggle jumps.
      // On desktop, pinType: "fixed" works natively with Lenis.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          pinSpacing: true,
          pinType: isTouch ? "transform" : "fixed",
          anticipatePin: 0,
          start: isTouch ? "top 72px" : "top 80px",
          end: "+=2500",
          scrub: true,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress
            const calculatedStep = Math.min(
              PROCESS_STEPS.length - 1,
              Math.max(0, Math.floor(p * PROCESS_STEPS.length)),
            )
            setActiveStep(calculatedStep)
          },
        },
      })

      // Store scrollTrigger instance for tab click navigation
      scrollTriggerRef.current = tl.scrollTrigger ?? null

      // 1. Bottom linear progress line fills continuously from 0% to 100%
      if (progressLine) {
        tl.to(
          progressLine,
          {
            scaleX: 1,
            ease: "none",
            duration: 5,
          },
          0,
        )
      }

      // 2. Step transitions: at each 20% interval, the previous title & description
      // disperse upward (yPercent: -15, opacity: 0, filter: blur(10px)),
      // while the next step rises cleanly from below (yPercent: 0, opacity: 1, filter: blur(0px)).
      for (let i = 0; i < slides.length - 1; i++) {
        const transitionStart = i + 0.75
        const currentSlide = slides[i]
        const nextSlide = slides[i + 1]

        // Previous step disperses upward
        tl.to(
          currentSlide,
          {
            yPercent: -15,
            opacity: 0,
            filter: "blur(10px)",
            ease: "power2.inOut",
            duration: 0.5,
          },
          transitionStart,
        )

        // Next step rises cleanly from below
        tl.to(
          nextSlide,
          {
            yPercent: 0,
            opacity: 1,
            filter: "blur(0px)",
            ease: "power2.inOut",
            duration: 0.5,
          },
          transitionStart,
        )
      }
    }, sectionRef)

    return () => {
      ctx.revert()
      scrollTriggerRef.current = null
    }
  }, [])

  const handleStepClick = (index: number) => {
    setActiveStep(index)

    const st = scrollTriggerRef.current
    if (st) {
      // Calculate exact scrub position for clicked step (0, 0.25, 0.5, 0.75, 1.0)
      const stepProgress = index / (PROCESS_STEPS.length - 1)
      const targetScroll = st.start + (st.end - st.start) * stepProgress

      if (lenis) {
        lenis.scrollTo(targetScroll, {
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })
      } else {
        window.scrollTo({
          top: targetScroll,
          behavior: "smooth",
        })
      }
    } else {
      // Fallback for reduced motion / test environments without active ScrollTrigger
      stepRefs.current.forEach((slide, i) => {
        if (!slide) return
        if (i === index) {
          slide.style.opacity = "1"
          slide.style.pointerEvents = "auto"
          slide.style.transform = "none"
          slide.style.filter = "none"
        } else {
          slide.style.opacity = "0"
          slide.style.pointerEvents = "none"
        }
      })
    }
  }

  return (
    <section
      id="process"
      ref={sectionRef}
      className="flex min-h-[min(55vw,828px)] scroll-mt-20 flex-col rounded-[5px] bg-[#030303] p-5 text-white dark:bg-white dark:text-[#030303] max-md:min-h-[550px] will-change-transform"
    >
      <CornerLabel>Less Noise. More Clarity.</CornerLabel>

      {/* Centered Step Slide Stage */}
      <div
        className="relative flex flex-1 flex-col items-center justify-center px-5 py-20 text-center min-h-[360px] md:min-h-[420px]"
        aria-live="polite"
      >
        {PROCESS_STEPS.map((item, index) => {
          const isInitialActive = activeStep === index
          return (
            <div
              key={item.title}
              ref={(el) => {
                stepRefs.current[index] = el
              }}
              className={`process-step-slide absolute inset-0 flex flex-col items-center justify-center px-4 ${
                isInitialActive
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
              style={{
                willChange: "transform, opacity, filter",
              }}
            >
              <h2 className="process-title-gradient text-[40px] leading-[46.4px] tracking-tight-display">
                {item.title}
              </h2>
              <p className="mt-3 text-[16px] tracking-[-0.54px] text-white/90 dark:text-[#030303]/90">
                {item.description}
              </p>
            </div>
          )
        })}
      </div>

      {/* Bottom Tabs with Linear Progress Line Scrub */}
      <div className="relative grid grid-cols-5 border-t border-white/20 dark:border-black/20">
        {/* Continuous Progress Bar scrubbing across all 5 steps */}
        <div className="absolute -top-[1.5px] left-0 right-0 h-[2.5px] overflow-hidden bg-white/10 dark:bg-black/10">
          <div
            ref={progressLineRef}
            className="h-full w-full origin-left scale-x-0 bg-white dark:bg-[#030303] will-change-transform"
          />
        </div>

        {PROCESS_STEPS.map(({ title }, index) => {
          const isActive = activeStep === index
          return (
            <button
              key={title}
              type="button"
              onClick={() => handleStepClick(index)}
              aria-pressed={isActive}
              className={`relative flex flex-col items-center gap-3 py-7 text-[12px] transition-opacity md:text-[16px] cursor-pointer ${
                isActive
                  ? "opacity-100 font-medium text-white dark:text-[#030303]"
                  : "opacity-40 text-white/70 hover:opacity-80 dark:text-[#030303]/70"
              }`}
            >
              <span className="text-[12px]">
                0{index + 1}
              </span>
              <span>{title}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default ProcessSection
