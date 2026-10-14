import { useEffect, useRef, useState } from "react"
import { animate } from "motion"
import { motion, AnimatePresence, frame, cancelFrame } from "framer-motion"
import Lenis from "lenis"
import "lenis/dist/lenis.css"
import ParallaxGallery from "./components/ParallaxGallery"
import StickyNavigation from "./components/StickyNavigation"
import ProjectShowcase from "./components/ProjectShowcase"
import { PROJECTS, SERVICES, PROCESS_STEPS, FAQ_QUESTIONS, PORTRAIT_COLUMNS } from "./data/content"

const asset = (name: string) => `/assets/${name}`

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

function RevealBlock({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function Counter({
  target,
  suffix = "",
}: {
  target: number
  suffix?: string
}) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useRef(false)

  return (
    <motion.span
      ref={ref}
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




function CornerLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between text-[16px] tracking-[-0.48px]">
      <span>+</span>
      <span>{children}</span>
      <span>+</span>
    </div>
  )
}

export default function App() {
  const [step, setStep] = useState(0)
  const [project, setProject] = useState<number | null>(null)
  const [openQuestion, setOpenQuestion] = useState<number | null>(null)
  const [subscribed, setSubscribed] = useState(false)
  const [contactStatus, setContactStatus] = useState("")
  const heroRef = useRef<HTMLElement | null>(null)
  const heroFadeRef = useRef<HTMLDivElement | null>(null)
  const contactSectionRef = useRef<HTMLElement | null>(null)
  const leftHandRef = useRef<HTMLImageElement | null>(null)
  const rightHandRef = useRef<HTMLImageElement | null>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null)
  const footerContainerRef = useRef<HTMLDivElement | null>(null)
  const footerBottomRef = useRef<HTMLDivElement | null>(null)
  const newsletterStickyRef = useRef<HTMLDivElement | null>(null)

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
        const progress = Math.max(0, Math.min(1, (rect.bottom - (windowHeight - 120)) / 120))
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

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    const updateScrolling = () => {
      lenisRef.current?.destroy()
      lenisRef.current = null
      setLenisInstance(null)

      if (reducedMotion.matches) return

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        prevent: (element) => Boolean(element.closest('[role="dialog"]')),
      })

      const updateLenis = ({ timestamp }: { timestamp: number }) => {
        lenis.raf(timestamp)
      }
      frame.update(updateLenis, true)

      lenisRef.current = lenis
      setLenisInstance(lenis)
      if (document.body.style.overflow === "hidden") lenis.stop()

      return () => {
        cancelFrame(updateLenis)
        lenis.destroy()
        lenisRef.current = null
        setLenisInstance(null)
      }
    }

    const cleanup = updateScrolling()
    reducedMotion.addEventListener("change", updateScrolling)
    return () => {
      cleanup?.()
      reducedMotion.removeEventListener("change", updateScrolling)
    }
  }, [])

  useEffect(() => {
    if (project === null) return
    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    lenisRef.current?.stop()
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
      lenisRef.current?.start()
      document.removeEventListener("keydown", handleKey)
      previousFocus?.focus()
    }
  }, [project])

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const section = contactSectionRef.current
    const leftHand = leftHandRef.current
    const rightHand = rightHandRef.current
    if (!section || !leftHand || !rightHand) return

    let rAF = 0
    let cachedTop = 0
    let cachedHeight = 0

    const measure = () => {
      if (!section) return
      const rect = section.getBoundingClientRect()
      cachedTop = rect.top + window.scrollY
      cachedHeight = rect.height
    }

    const onResize = () => {
      cancelAnimationFrame(rAF)
      rAF = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener("resize", onResize)

    const updateHands = () => {
      if (!section || !leftHand || !rightHand) return
      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Start: top enters viewport bottom (rect.top <= windowHeight)
      // End: center of section hits center of viewport
      const start = windowHeight
      const end = (windowHeight - rect.height) / 2
      const range = start - end

      if (range <= 0) return

      // Progress: 0 when rect.top = start (just entering bottom), 1 when rect.top <= end
      const progress = Math.max(0, Math.min(1, (start - rect.top) / range))

      // Horizontal start offset in % (tweak this value to adjust horizontal start position)
      // e.g. 70 = default (-70% to 0%), 100 = start completely hidden off-screen, 40 = start further in
      const START_OFFSET_X = 130

      const leftX = -START_OFFSET_X * (1 - progress)
      const rightX = START_OFFSET_X * (1 - progress)

      leftHand.style.transform = `translate3d(${leftX}%, 0, 0)`
      rightHand.style.transform = `translate3d(${rightX}%, 0, 0)`
    }

    updateHands()

    if (lenisInstance) {
      const handleLenisScroll = () => {
        updateHands()
      }
      lenisInstance.on("scroll", handleLenisScroll)
      return () => {
        lenisInstance.off("scroll", handleLenisScroll)
      }
    } else {
      const handleScroll = () => {
        updateHands()
      }
      window.addEventListener("scroll", handleScroll, { passive: true })
      window.addEventListener("resize", handleScroll)
      return () => {
        window.removeEventListener("scroll", handleScroll)
        window.removeEventListener("resize", handleScroll)
      }
    }
  }, [lenisInstance])

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (footerBottomRef.current) footerBottomRef.current.style.transform = "none"
      if (newsletterStickyRef.current) newsletterStickyRef.current.style.transform = "none"
      return
    }

    const container = footerContainerRef.current
    const bottom = footerBottomRef.current
    const newsletter = newsletterStickyRef.current
    if (!container || !bottom || !newsletter) return

    const updateFooter = () => {
      if (!container || !bottom || !newsletter) return
      const rect = container.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Distance available for the sticky reveal animation
      // When newsletter reaches the top of viewport (rect.top <= 0), it stays pinned while user scrolls through the reveal distance
      const newsletterHeight = newsletter.offsetHeight
      const bottomHeight = bottom.offsetHeight
      const revealDistance = bottomHeight

      // Before container reaches viewport bottom
      if (rect.top > windowHeight) {
        bottom.style.transform = "translate3d(0, -100%, 0)"
        return
      }

      // If newsletter has reached the top of the screen (or comfortable pin point)
      // We calculate scroll progress through the reveal phase
      const startPin = windowHeight - newsletterHeight
      const progress = Math.max(0, Math.min(1, (startPin - rect.top) / revealDistance))

      // Footer glides from completely tucked underneath (-100%) to fully visible (0%)
      const footerY = -100 * (1 - progress)
      bottom.style.transform = `translate3d(0, ${footerY.toFixed(2)}%, 0)`
    }

    updateFooter()

    if (lenisInstance) {
      const handleLenis = () => updateFooter()
      lenisInstance.on("scroll", handleLenis)
      return () => {
        lenisInstance.off("scroll", handleLenis)
      }
    } else {
      const handleScroll = () => updateFooter()
      window.addEventListener("scroll", handleScroll, { passive: true })
      window.addEventListener("resize", handleScroll)
      return () => {
        window.removeEventListener("scroll", handleScroll)
        window.removeEventListener("resize", handleScroll)
      }
    }
  }, [lenisInstance])

  return (
    <div id="home" className="min-h-screen w-full max-w-full overflow-x-hidden bg-[var(--bg)] text-[var(--fg)] transition-colors duration-300">
      <main className="mx-auto w-full max-w-[1560px] px-4 sm:px-5 md:px-10">
        {/* Hero Section with Parallax Effect */}
        <section
          id="hero"
          ref={heroRef}
          className="relative w-full"
        >
          {/* Main Navigation */}
          <StickyNavigation heroRef={heroRef} />

          {/* Hero Parallax Scroll Gallery */}
          <ParallaxGallery lenis={lenisInstance} />
        </section>

        <div className="relative z-30 -mt-6 sm:-mt-10 md:-mt-12 grid grid-cols-4 items-center gap-3 rounded-[10px] bg-[#f2f2f2] px-5 py-6">
          {["ad99d.svg", "f0c0b.svg", "01080.svg", "4344b.svg"].map((image) => (
            <div key={image} className="flex justify-center overflow-hidden">
              <img
                src={asset(image)}
                alt="Partner studio"
                className="max-w-full"
              />
            </div>
          ))}
        </div>

        <section
          id="about"
          className="grid min-h-[550px] scroll-mt-20 items-center gap-10 py-28 md:min-h-[min(52vw,991px)] md:grid-cols-[1fr_2fr] md:content-center md:items-baseline"
        >
          <RevealBlock delay={0.1} className="flex h-[30px] items-stretch gap-[3px]">
            <span className="w-8 rounded-[1px] bg-[#030303] dark:bg-white" />
            <span className="w-6 rounded-[1px] bg-[#030303] dark:bg-white" />
            <span className="w-[14px] rounded-[1px] bg-[#030303] dark:bg-white" />
            {Array.from({ length: 17 }, (_, index) => (
              <span key={index} className="w-[2px] rounded-[1px] bg-[#030303] dark:bg-white" />
            ))}
          </RevealBlock>
          <p className="w-full max-w-[1040px] text-[30px] leading-[1.16] tracking-[-1.5px] [container-type:inline-size] md:text-[40px] md:tracking-[-2px]">
            <RevealLine delay={0.05} className="md:block md:text-right md:text-[min(40px,3.75cqw)] md:whitespace-nowrap"><span className="text-[#696969]">At OFST</span> we embrace the tension between minimalism and</RevealLine>{" "}
            <RevealLine delay={0.15} className="md:block md:text-left md:text-[min(40px,3.75cqw)] md:whitespace-nowrap">impact. We believe that powerful design doesn't need to shout, it</RevealLine>{" "}
            <RevealLine delay={0.25} className="md:block md:text-left md:text-[min(40px,3.75cqw)]">needs to resonate.</RevealLine>
          </p>
        </section>

        {/* Projects Section */}
        <ProjectShowcase
          projects={PROJECTS}
          activeProject={project}
          setActiveProject={setProject}
        />

        <section id="services" className="scroll-mt-20">
          <div className="flex min-h-[min(65vw,991px)] flex-col justify-between rounded-[5px] bg-[#030303] p-5 text-white dark:bg-white dark:text-[#030303] max-md:min-h-[470px]">
            <CornerLabel>
              <RevealLine>What We Do, Perfectly.</RevealLine>
            </CornerLabel>
            <img
              src={asset("12844.png")}
              alt="Studio symbol"
              className="mx-auto size-5 translate-y-[22px] object-contain dark:invert max-md:translate-y-[19px]"
            />
            <div>
              <div className="mb-5 flex -translate-y-[calc(min(65vw,991px)/2-76px)] justify-between text-[12px] max-md:-translate-y-[162px] md:text-[16px]">
                <RevealLine delay={0.1}>8+ Years of Expertise</RevealLine>
                <RevealLine delay={0.2}>50+ Projects Delivered</RevealLine>
              </div>
              <CornerLabel> </CornerLabel>
            </div>
          </div>
          <div className="space-y-3 py-10 md:py-14">
            {SERVICES.map(({ name, image }, index) => (
              <div
                key={name}
                className="mx-auto grid w-full max-w-[1368px] grid-cols-2 gap-2"
              >
                <div className="flex aspect-[679/450] items-center justify-center rounded-[9px] border border-[#f2f2f2] text-center text-[14.4px] tracking-[-0.432px]">
                  <RevealLine delay={0.06 * (index % 3)}>{name}</RevealLine>
                </div>
                <div className="flex items-center justify-center rounded-[9px] bg-[#f2f2f2]">
                  <img
                    src={asset(image)}
                    alt={name}
                    className="w-[32%] rounded-[5px] object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="process"
          className="flex min-h-[min(55vw,828px)] scroll-mt-20 flex-col rounded-[5px] bg-[#030303] p-5 text-white dark:bg-white dark:text-[#030303] max-md:min-h-[550px]"
        >
          <CornerLabel>Less Noise. More Clarity.</CornerLabel>
          <div
            className="flex flex-1 flex-col items-center justify-center px-5 py-20 text-center"
            aria-live="polite"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                className="flex flex-col items-center"
              >
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
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
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
                onClick={() => setStep(index)}
                aria-pressed={step === index}
                className={`relative flex flex-col items-center gap-3 py-7 text-[12px] transition-opacity md:text-[16px] ${
                  step === index ? "opacity-100" : "opacity-40 hover:opacity-80"
                }`}
              >
                {/* Loading line indicator write on the line directly above the step button */}
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

        <section className="py-24">
          <div className="relative mx-auto mb-12 aspect-[820/330] w-full max-w-[820px]">
            <div className="grid grid-cols-9 items-start gap-[1%]">
              {PORTRAIT_COLUMNS.map(({ images, offset }, colIndex) => {
                // Tight millisecond stagger sequence:
                // Group 1 (leaders): row 4 & 6 -> 0ms
                // Group 2: row 2, 5 & 8 -> 50ms
                // Group 3: row 3 & 7 -> 100ms
                // Group 4 (settles as others settle): row 1 & 9 -> 160ms
                const delay =
                  colIndex === 3 || colIndex === 5
                    ? 0
                    : colIndex === 1 || colIndex === 4 || colIndex === 7
                      ? 0.05
                      : colIndex === 2 || colIndex === 6
                        ? 0.1
                        : 0.16;

                return (
                  <motion.div
                    key={images[0]}
                    initial={{ opacity: 0, y: 80, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                    transition={{
                      duration: 0.9,
                      delay,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`flex min-w-0 flex-col gap-1 sm:gap-[10px] ${offset}`}
                  >
                    {images.map((image) => (
                      <img
                        key={image}
                        src={asset(image)}
                        alt="Creative collaborator"
                        className="aspect-[83/102] w-full rounded-[5px] object-cover"
                      />
                    ))}
                  </motion.div>
                );
              })}
            </div>
            <h2 className="absolute inset-x-0 top-[87%] text-center text-[clamp(14px,4vw,40px)] leading-[1.16] tracking-[-0.05em]">
              <RevealLine delay={0.28}>Less Fluff, Real Words.</RevealLine>
            </h2>
          </div>
          <div className="mx-auto grid max-w-[920px] gap-[10px] md:grid-cols-3">
            {[
              [
                "David Kim",
                "Brand Strategist",
                "“Bold. Quiet. Brilliant. Their work speaks without shouting.”",
                "7a40c.png",
              ],
              [
                "Amira Solis",
                "UX Lead at Field",
                "“Working with OFST felt like collaborating with a design lab. Visionary yet grounded.”",
                "e1f8b.png",
              ],
              [
                "Lena Morris",
                "Creative Director",
                "“Minimal, but rich.”",
                "6f409.png",
              ],
            ].map(([name, title, quote, image], index) => (
              <figure key={name} className="flex flex-col gap-[9px]">
                <figcaption
                  className={`flex h-[64px] min-h-[64px] max-h-[64px] items-center gap-[14px] overflow-hidden rounded-[5px] bg-[#f2f2f2] p-0 text-[#030303] ${
                    name === "Amira Solis" ? "md:order-2" : ""
                  }`}
                >
                  <div className="h-[64px] w-[64px] shrink-0 overflow-hidden rounded-[5px] bg-neutral-300">
                    <img
                      src={asset(image)}
                      alt={name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="flex flex-col justify-center py-2 pr-3">
                    <p className="text-[16px] leading-[19.2px] tracking-[-0.48px] text-[#030303]">
                      <RevealLine delay={0.1 + index * 0.08}>{name}</RevealLine>
                    </p>
                    <p className="mt-[3px] text-[12px] leading-[14.4px] tracking-[-0.24px] text-[#696969]">
                      <RevealLine delay={0.16 + index * 0.08}>{title}</RevealLine>
                    </p>
                  </div>
                </figcaption>
                <blockquote className="flex min-h-[100px] items-center justify-center rounded-[5px] bg-[#f2f2f2] p-3 text-center text-[16px] leading-[18.4px] tracking-[-0.48px] text-[#030303]">
                  <RevealLine delay={0.22 + index * 0.08}>{quote}</RevealLine>
                </blockquote>
              </figure>
            ))}
          </div>
        </section>

        <section className="py-16 md:py-24">
          <h2 className="mb-14 text-center text-[30px] leading-[1.16] tracking-[-1.5px] md:text-[40px] md:leading-[46.4px] md:tracking-[-2px]">
            <RevealLine>Why OFST and not any other design studio?</RevealLine>
          </h2>
          <div className="mx-auto grid max-w-[1480px] gap-5 xl:grid-cols-[1.55fr_1fr]">
            <div className="grid min-w-0 grid-cols-2 content-start gap-5">
              <img
                src={asset("6fc31.png")}
                alt="A sculptural monochrome studio object"
                className="aspect-[434/340] w-full rounded-[10px] object-cover"
              />
              <div className="relative flex aspect-[434/340] flex-col items-center overflow-hidden rounded-[10px] border border-[#f2f2f2] bg-white text-[clamp(10px,1.1vw,16px)] text-[#030303]">
                <div className="flex flex-col items-center gap-[10px] py-2">
                  {[
                    ["Emerging", "07", "bg-[#ed8500]"],
                    ["Resolved", "11", "bg-[#32d900]"],
                    ["Shadows", "09", "bg-[#f00020]"],
                    ["Untouched", "12", "bg-[#696969]"],
                    ["In Motion", "15", "bg-[#0080ff]"],
                    ["Emerging", "07", "bg-[#ed8500]"],
                    ["Resolved", "11", "bg-[#32d900]"],
                  ].map(([label, number, color], index) => (
                    <div
                      key={`${label}-${index}`}
                      className="flex shrink-0 items-center gap-2 rounded-[12px] bg-white px-3 py-[5px] text-[#030303] shadow-[0_3px_20px_0_rgba(0,0,0,0.04)]"
                    >
                      <span
                        className={`size-[7px] shrink-0 rounded-full ${color}`}
                      />
                      <span className="whitespace-nowrap text-[#030303]">{label}</span>
                      <span className="flex size-[30px] items-center justify-center rounded-[10px] bg-[#f2f2f2] text-[12px] text-[#030303]">
                        {number}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-2 flex aspect-auto sm:aspect-[888/530] min-h-0 w-full max-w-full flex-col items-center justify-center gap-6 sm:gap-9 rounded-[10px] bg-[#f2f2f2] p-4 sm:p-6 text-[#030303] md:gap-[clamp(20px,3vw,45px)] overflow-hidden">
                <h3 className="text-center text-[24px] sm:text-[32px] leading-tight sm:leading-[41.6px] tracking-[-0.96px] text-[#030303]">
                  <RevealLine className="block text-[#030303]">Engagement</RevealLine>
                  <RevealLine delay={0.1} className="block text-[#696969]">Over Time</RevealLine>
                </h3>
                <div className="w-full max-w-[315px] px-2 sm:px-0">
                  <div
                    role="img"
                    aria-label="Engagement rises steadily from February to June"
                    className="flex h-[110px] sm:h-[155px] items-end justify-between gap-[2px] sm:gap-1"
                  >
                    {[
                      "h-[12%]",
                      "h-[14%]",
                      "h-[16%]",
                      "h-[18%]",
                      "h-[27%]",
                      "h-[46%]",
                      "h-[48%]",
                      "h-[55%]",
                      "h-[63%]",
                      "h-[62%]",
                      "h-[61%]",
                      "h-[61%]",
                      "h-[62%]",
                      "h-[64%]",
                      "h-[69%]",
                      "h-[69%]",
                      "h-[79%]",
                      "h-[76%]",
                      "h-[76%]",
                      "h-[82%]",
                      "h-[82%]",
                      "h-[87%]",
                      "h-[91%]",
                      "h-[96%]",
                      "h-[96%]",
                      "h-full",
                    ].map((height, index) => (
                      <div
                        key={index}
                        className={`w-[2px] shrink-0 bg-[#929292] ${height}`}
                      />
                    ))}
                  </div>
                  <div className="mt-4 flex justify-between text-[10px] text-[#696969]">
                    {["Feb", "Mar", "Apr", "May", "Jun"].map((month) => (
                      <span key={month}>{month}</span>
                    ))}
                  </div>
                </div>
                <div className="flex w-full max-w-[270px] justify-between gap-8 text-[16px] text-[#030303]">
                  {[
                    { label: "All Time", value: 900 },
                    { label: "This Month", value: 300 },
                  ].map(({ label, value }, index) => (
                    <div key={label}>
                      <p className="text-[#030303]">
                        <RevealLine delay={0.08 * index}>{label}</RevealLine>
                      </p>
                      <p className="mt-2 text-[32px] leading-[41.6px] tracking-[-0.96px] text-[#030303]">
                        <Counter target={value} />
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex min-w-0 flex-col gap-5">
              <div className="flex aspect-[572/260] items-center justify-center rounded-[10px] border border-[#f2f2f2] bg-white">
                <div className="flex items-center gap-3 rounded-[12px] bg-[#f2f2f2] px-5 py-3 text-[16px] text-[#030303]">
                  <img src={asset("a9f8b.svg")} alt="" />
                  <RevealLine>Delivering</RevealLine>
                </div>
              </div>
              <img
                src={asset("ad136.png")}
                alt="Minimal sculptural portrait"
                className="aspect-[572/509] w-full rounded-[10px] object-cover"
              />
              <div className="flex min-h-[82px] flex-1 items-center gap-2 rounded-[10px] bg-[#f2f2f2] px-5 py-5 text-[#030303]">
                <div className="flex shrink-0 -space-x-2">
                  {["3afa8.png", "8f3c7.png", "52487.png", "5560b.png"].map(
                    (image) => (
                      <img
                        key={image}
                        src={asset(image)}
                        alt="Client"
                        className="size-8 rounded-full border-2 border-white object-cover"
                      />
                    ),
                  )}
                </div>
                <p className="text-[14px] tracking-[-0.42px] text-[#030303] lg:text-[16px]">
                  <Counter target={100} suffix="+ " />
                  <RevealLine delay={0.1}>Satisfied Clients</RevealLine>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-x-12 gap-y-[60px] py-14 md:grid-cols-2 md:py-16">
            <h2 className="text-[40px] leading-[46.4px] tracking-[-2px] md:col-span-2">
              <RevealLine className="block">Questions..</RevealLine>
              <RevealLine delay={0.1} className="block text-[#696969]">Straight Answers.</RevealLine>
            </h2>
          <div>
            {FAQ_QUESTIONS.map(({ question, answer }, index) => {
              const isOpen = openQuestion === index
              return (
                <div
                  key={question}
                  className="border-b border-[#f2f2f2] py-[19px]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenQuestion(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full cursor-pointer list-none items-center justify-between gap-5 text-left text-[16px] tracking-[-0.48px] text-[#030303] dark:text-white"
                  >
                    <span>{question}</span>
                    <motion.img
                      src={asset("888bd.svg")}
                      alt=""
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="shrink-0 transition-transform"
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.25, ease: "easeInOut" },
                        }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[540px] pt-4 text-[14px] leading-6 text-[#696969] dark:text-[#a1a1aa]">
                          {answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
          <div className="flex flex-col items-center text-center md:-translate-y-1">
            <p className="text-[40px] leading-[46.4px] tracking-[-2px]">
              <RevealLine className="block">For any Questions,</RevealLine>
              <RevealLine delay={0.1} className="block">Reach us</RevealLine>
            </p>
            <a
              href="mailto:hello@OFST.com"
              className="mt-6 inline-block rounded-[10px] bg-[#f2f2f2] px-3 py-3 text-[20px] leading-[20px] tracking-[-0.8px] text-[#696969] transition-colors hover:bg-[#e6e6e6]"
            >
              hello@OFST.com
            </a>
          </div>
        </section>

        <section
          id="contact"
          ref={contactSectionRef}
          className="relative mb-2 scroll-mt-20 overflow-hidden rounded-[10px] border-[4px] border-[#030303] dark:border-white py-12"
        >
          <img
            ref={leftHandRef}
            src={asset("788a4.png")}
            alt="A hand reaching toward the center"
            className="pointer-events-none absolute left-0 top-3 w-[31%] max-md:hidden will-change-transform [backface-visibility:hidden]"
            style={{ transform: "translate3d(-130%, 0, 0)" }}
          />
          <img
            ref={rightHandRef}
            src={asset("3400b.png")}
            alt="A hand reaching from the other side"
            className="pointer-events-none absolute right-0 top-3 w-[31%] max-md:hidden will-change-transform [backface-visibility:hidden]"
            style={{ transform: "translate3d(130%, 0, 0)" }}
          />
          <div className="relative mx-auto max-w-[500px] text-center">
            <h2 className="text-[32px] leading-[41.6px] tracking-[-0.96px]">
              <RevealLine>Refine Your Vision</RevealLine>
            </h2>
            <p className="mt-3 text-[16px] leading-[18.4px] tracking-[-0.48px]">
              <RevealLine delay={0.05} className="block">Wherever you are.</RevealLine>
              <RevealLine delay={0.15} className="block">Today, tomorrow—whenever.</RevealLine>
              <RevealLine delay={0.25} className="block">Reach Out.</RevealLine>
            </p>
            <form
              className="space-y-5 p-5 text-left"
              onSubmit={(event) => {
                event.preventDefault()
                const values = new FormData(event.currentTarget)
                window.location.href = `mailto:hello@OFST.com?subject=${encodeURIComponent(`Project inquiry from ${values.get("name")}`)}&body=${encodeURIComponent(`${values.get("message")}\n\nReply to: ${values.get("email")}`)}`
                setContactStatus(
                  "Your email app will open with your message ready to send.",
                )
              }}
            >
              <label className="block text-[12px]">
                Your Name*
                <input
                  required
                  name="name"
                  placeholder="Rayan Solis"
                  className="mt-2 h-10 w-full rounded-[10px] bg-[#f2f2f2] px-3 text-[14px] text-[#030303] placeholder:text-[#888888] outline-offset-4"
                />
              </label>
              <label className="block text-[12px]">
                E-mail*
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="Hello@gmail.com"
                  className="mt-2 h-10 w-full rounded-[10px] bg-[#f2f2f2] px-3 text-[14px] text-[#030303] placeholder:text-[#888888] outline-offset-4"
                />
              </label>
              <label className="block text-[12px]">
                Message*
                <textarea
                  required
                  name="message"
                  placeholder="Your message"
                  rows={5}
                  className="mt-2 w-full resize-y rounded-[10px] bg-[#f2f2f2] p-3 text-[14px] text-[#030303] placeholder:text-[#888888] outline-offset-4"
                />
              </label>
              <button
                type="submit"
                className="w-full cursor-pointer rounded-[10px] bg-[#030303] py-3 text-[14px] text-white transition-[transform,background-color] duration-150 active:scale-[0.98] hover:bg-[#333] dark:bg-white dark:text-[#030303] dark:hover:bg-[#e6e6e6]"
              >
                Submit
              </button>
              <p
                role="status"
                className="text-center text-[18px] font-medium leading-[21px] tracking-[-0.54px] text-[#030303] dark:text-white"
              >
                {contactStatus ||
                  "We keep it simple, fill out the form and we will get back at you."}
              </p>
            </form>
          </div>
        </section>
      </main>

      {/* Newsletter & Footer Sticky Reveal Wrapper */}
      <div
        ref={footerContainerRef}
        className="relative z-10 w-full"
      >
        {/* Sticky Newsletter & Ticker Curtain (pins to viewport top while user scrolls through the reveal height) */}
        <div
          ref={newsletterStickyRef}
          className="relative z-20 mx-2 overflow-hidden bg-[#030303] px-5 pb-8 text-white will-change-transform"
        >
          <div className="h-44 bg-[repeating-linear-gradient(90deg,#ffffff66_0px,#ffffff66_2px,transparent_2px,transparent_24px)] [mask-image:linear-gradient(black_0%,transparent_100%)] md:h-[280px]" />
          <div className="mx-auto grid max-w-[920px] items-center gap-8 py-12 md:grid-cols-[1fr_1.2fr_1fr]">
            <img
              src={asset("ba62e.png")}
              alt="Newsletter editorial portrait"
              className="hidden aspect-[283/258] rounded-[10px] object-cover md:block"
            />
            <div className="text-center">
              <h2 className="text-[32px] leading-[41.6px] tracking-[-0.96px]">
                <RevealLine>Join Our Weekly Newsletter!</RevealLine>
              </h2>
              <form
                className="relative mt-5"
                onSubmit={(event) => {
                  event.preventDefault()
                  const values = new FormData(event.currentTarget)
                  window.location.href = `mailto:hello@OFST.com?subject=Newsletter%20subscription&body=${encodeURIComponent(`Please subscribe ${values.get("subscriber")} to your newsletter.`)}`
                  setSubscribed(true)
                }}
              >
                <input
                  type="email"
                  required
                  name="subscriber"
                  aria-label="Newsletter email address"
                  placeholder="Enter your email"
                  className="h-11 w-full rounded-[10px] bg-white pl-3 pr-28 text-[14px] text-black"
                />
                <button className="absolute right-1 top-1 rounded-[8px] bg-[#030303] px-4 py-2 text-[14px]">
                  Subscribe
                </button>
              </form>
              {subscribed && (
                <p role="status" className="mt-3 text-[12px]">
                  Send the subscription request in your email app.
                </p>
              )}
            </div>
            <img
              src={asset("e9fc8.png")}
              alt="Newsletter editorial portrait"
              className="hidden aspect-[283/258] rounded-[10px] object-cover md:block"
            />
          </div>
          <div className="mb-4 flex h-10 items-center overflow-hidden rounded-[10px] bg-white text-[14px] leading-[18.4px] tracking-[-0.42px] text-[#030303]">
            <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">
              <div className="flex animate-marquee shrink-0 items-center whitespace-nowrap">
                {[0, 1].map((copyIndex) => (
                  <div key={copyIndex} aria-hidden={copyIndex === 1 ? true : undefined} className="flex shrink-0 items-center">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="flex shrink-0 items-center gap-3 pr-3">
                        <span>We craft digital spaces where contrast creates conversation.</span>
                        <span aria-hidden="true" className="h-7 w-[5px] rounded-full bg-[#d6d6d6]" />
                        <span>Our work exists in the tension between simplicity and statement.</span>
                        <span aria-hidden="true" className="h-7 w-[5px] rounded-full bg-[#d6d6d6]" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Revealed Footer Bottom: OFST logo and directory links */}
        <footer className="relative z-10 w-full overflow-hidden bg-transparent">
          <div
            ref={footerBottomRef}
            className="mx-2 flex min-h-[min(650px,90vh)] flex-col justify-between bg-[#030303] px-5 pb-8 pt-10 text-white will-change-transform [backface-visibility:hidden]"
          >
            <div className="flex flex-1 items-center justify-center py-6 sm:py-10">
              <img
                src="/OFST-wt-trans.svg"
                alt="OFST"
                className="h-auto w-full max-w-[850px] object-contain transition-transform duration-300"
              />
            </div>
            <div className="grid gap-2 md:grid-cols-2">
              {[
                ["Home", "About", "Work", "Services"],
                ["Process", "Contact", "Privacy", "Terms"],
              ].map((links, index) => (
                <div
                  key={index}
                  className="space-y-[5px] rounded-[10px] bg-white p-2 text-[#030303]"
                >
                  {links.map((label) => (
                    <a
                      key={label}
                      href={`#${label.toLowerCase()}`}
                      className="group flex min-h-[35px] items-center justify-between gap-3 rounded-[10px] bg-[#f2f2f2] px-2 py-[7px] text-[16px] leading-[19px] tracking-[-0.48px] transition-[background-color,transform] duration-150 active:scale-[0.98] hover:bg-[#e6e6e6]"
                    >
                      {label}
                      <span aria-hidden="true" className="flex h-[19px] w-[34px] shrink-0 items-center justify-center rounded-full border border-[#030303] transition-transform duration-150 group-hover:scale-105 active:scale-95">
                        <svg
                          width="10.5"
                          height="10.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="size-3 text-[#030303]"
                        >
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </span>
                    </a>
                  ))}
                </div>
              ))}
            </div>
            <div className="relative mt-7 flex flex-col gap-2 text-[12px] sm:grid sm:grid-cols-3 sm:items-center">
              <p className="order-2 text-center sm:order-1 sm:text-left">OFST® 2026. All rights reserved</p>
              <p className="order-3 hidden text-center text-[#888] sm:order-2 sm:block">Independent by Design</p>
              <a href="#home" className="order-1 text-right hover:underline sm:order-3 sm:text-right">
                Back to top ↑
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* Hero section bottom fade overlay */}
      <div ref={heroFadeRef} aria-hidden="true" className="hero-bottom-fade" />

      {/* Viewport top & bottom blur bars */}
      <div aria-hidden="true" className="top-blur-gradient" />
      <div aria-hidden="true" className="bottom-blur-gradient" />
    </div>
  )
}
