import { useEffect, useRef, useState } from "react"
import { animate, scroll } from "motion"
import { motion, AnimatePresence } from "framer-motion"
import Lenis from "lenis"
import "lenis/dist/lenis.css"
import { ThemeToggleButton } from "./ThemeToggle"

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
      initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
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


const projects = [
  { name: "void®", image: "e3bbf.png" },
  { name: "offset studio", image: "cbc79.png" },
  { name: "null.al", image: "35ff7.png" },
  { name: "monolith™", image: "56261.png" },
]
const services = [
  ["Brand Identity", "2f511.png"],
  ["websites", "a6a98.png"],
  ["product design", "f996d.png"],
  ["Editorial & Print Design", "6d91a.png"],
]
const steps = [
  ["Listen", "We begin in silence. Understanding comes before creation."],
  ["Explore", "We look beyond the obvious. Possibilities become direction."],
  ["Refine", "We remove the unnecessary. Every detail has a purpose."],
  ["Build", "We turn intention into experience. Thoughtfully, precisely."],
  ["Reflect", "We step back, listen again, and make room to evolve."],
]
const questions = [
  [
    "Why ‘Less But More’?",
    "Because powerful design doesn't need to shout, it needs to resonate. We remove the noise so the essential can speak.",
  ],
  [
    "What kind of projects do you take on?",
    "We work across brand identity, websites, digital products, and editorial design. Each project starts with your vision.",
  ],
  [
    "How long does a typical project take?",
    "Timelines depend on the scope. We agree on a clear schedule together before the project begins.",
  ],
  [
    "What's your process like?",
    "Listen, explore, refine, build, and reflect. A collaborative process, with clarity at every step.",
  ],
  [
    "Do you offer ongoing support?",
    "Yes. We can continue supporting and refining your brand and digital experiences after launch.",
  ],
]
const portraitColumns = [
  { images: ["b949a.png", "bb312.png"], offset: "pt-[112%]" },
  { images: ["628d1.png", "58684.png"], offset: "" },
  { images: ["e6fb8.png"], offset: "pt-[59%]" },
  { images: ["2c925.png"], offset: "" },
  { images: ["96930.png"], offset: "pt-[59%]" },
  { images: ["24653.png"], offset: "" },
  { images: ["5a6ae.png"], offset: "pt-[59%]" },
  { images: ["cf64c.png", "7420b.png"], offset: "" },
  { images: ["70965.png", "822ba.png"], offset: "pt-[112%]" },
]

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
  const [subscribed, setSubscribed] = useState(false)
  const [contactStatus, setContactStatus] = useState("")
  const lenisRef = useRef<Lenis | null>(null)



  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updateScrolling = () => {
      lenisRef.current?.destroy()
      lenisRef.current = null
      if (reducedMotion.matches) return
      const lenis = new Lenis({
        autoRaf: true,
        anchors: true,
        duration: 1.1,
        smoothWheel: true,
        prevent: (element) => Boolean(element.closest('[role="dialog"]')),
      })
      lenisRef.current = lenis
      if (document.body.style.overflow === "hidden") lenis.stop()
    }
    updateScrolling()
    reducedMotion.addEventListener("change", updateScrolling)
    return () => {
      reducedMotion.removeEventListener("change", updateScrolling)
      lenisRef.current?.destroy()
      lenisRef.current = null
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

  return (
    <div id="home" className="min-h-screen bg-[var(--bg)] text-[var(--fg)] transition-colors duration-300">
      <main className="mx-auto w-full max-w-[1560px] px-5 md:px-10">
        <section className="relative flex aspect-[1520/991] min-h-[580px] items-center justify-center overflow-hidden md:min-h-0">
          <img
            src={asset("a623b.png")}
            alt="A monochrome studio identity card suspended from a silver lanyard"
            className="absolute inset-0 h-full w-full object-contain max-md:object-cover"
          />
          <nav
            aria-label="Main navigation"
            ref={(navigation) => {
              if (!navigation) return;
              const hero = navigation.parentElement;
              if (!hero) return;
              const updateCompact = () => {
                navigation.dataset.compact = String(hero.getBoundingClientRect().bottom <= 0);
              };
              updateCompact();
              const observer = new IntersectionObserver(updateCompact, { threshold: 0 });
              observer.observe(hero);
              const clock = navigation.querySelector("time");
              const updateClock = () => {
                if (clock) {
                  const now = new Date();
                  clock.dateTime = now.toISOString();
                  clock.textContent = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
                }
              };
              updateClock();
              const timer = window.setInterval(updateClock, 1000);
              return () => {
                observer.disconnect();
                window.clearInterval(timer);
              };
            }}
            className="group fixed left-1/2 top-5 z-40 flex h-[40.91px] min-h-[40.91px] w-[min(calc(100%-40px),915px)] -translate-x-1/2 items-center justify-between gap-2 rounded-[10px] bg-[#f2f2f2]/95 px-[10px] text-[15px] text-[#030303] backdrop-blur-xl transition-[width,background-color,color] duration-300 motion-reduce:transition-none data-[compact=true]:w-[217px] data-[compact=true]:bg-[#030303] data-[compact=true]:text-white dark:data-[compact=true]:bg-white dark:data-[compact=true]:text-[#030303]"
          >
            <a href="#home" aria-label="OFST" className="flex shrink-0 items-center gap-[7px]">
              <img
                src={asset("93b2b.png")}
                className="size-5 shrink-0 object-contain group-data-[compact=true]:invert dark:group-data-[compact=true]:invert-0"
                alt=""
              />
              {/* In light mode: full navbar shows blk logo; compact mode hides blk logo and shows wt logo */}
              {/* In dark mode: full navbar shows blk logo; compact mode shows blk logo on white background */}
              <img
                src="/OFST-blk-trans.svg"
                alt="OFST"
                className="block h-[20px] w-auto shrink-0 group-data-[compact=true]:hidden dark:group-data-[compact=true]:block"
              />
              <img
                src="/OFST-wt-trans.svg"
                alt="OFST"
                className="hidden h-[20px] w-auto shrink-0 group-data-[compact=true]:block dark:group-data-[compact=true]:hidden"
              />
            </a>
            <div className="flex shrink-0 items-center gap-4">
              <div className="hidden shrink-0 items-center gap-1 group-data-[compact=true]:hidden lg:flex">
                <div className="hidden h-7 w-[260px] items-center overflow-hidden rounded-[10px] bg-white px-2.5 text-[14px] xl:flex">
                  <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_14%,black_86%,transparent_100%)]">
                    <div className="animate-marquee whitespace-nowrap">
                      <span className="flex items-center gap-2 pr-2">
                        <span className="text-[#999]">design is a conversation.</span>
                        <span className="text-[#999]">/</span>
                        <span className="text-black">let's talk.</span>
                        <span className="text-[#999]">/</span>
                      </span>
                      <span className="flex items-center gap-2 pr-2" aria-hidden="true">
                        <span className="text-[#999]">design is a conversation.</span>
                        <span className="text-[#999]">/</span>
                        <span className="text-black">let's talk.</span>
                        <span className="text-[#999]">/</span>
                      </span>
                    </div>
                  </div>
                </div>
                <span aria-hidden="true" className="hidden h-7 w-[5px] rounded-[10px] bg-[#d6d6d6] xl:block" />
                <span className="flex h-7 shrink-0 items-center gap-[5px] rounded-[10px] bg-white px-[10px] text-[14px] text-black">
                  <time>
                  {new Date().toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                  </time>
                  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5h4" /></svg>
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-3 md:gap-4">
                {["About", "Projects", "Services", "Process", "Contact"].map(
                  (label) => (
                    <a
                      key={label}
                      href={`#${label.toLowerCase()}`}
                      className={
                        label === "Contact"
                          ? "inline-flex h-[30px] items-center justify-center rounded-[5px] px-3 text-center text-[#030303] transition-colors hover:bg-[#d6d6d6] hover:text-black group-data-[compact=true]:min-w-[81px] group-data-[compact=true]:bg-[#f2f2f2] group-data-[compact=true]:text-[#030303] dark:group-data-[compact=true]:bg-[#030303] dark:group-data-[compact=true]:text-white max-[450px]:text-[12px]"
                          : "text-[#030303] transition-opacity hover:opacity-50 group-data-[compact=true]:hidden max-[450px]:text-[12px]"
                      }
                    >
                      {label}
                    </a>
                  ),
                )}
              </div>
            </div>
          </nav>
          <div className="pointer-events-none relative flex flex-col items-center text-center text-white">
            <h1 className="flex justify-center">
              <img
                src="/OFST-wt-trans.svg"
                alt="OFST"
                className="h-[46px] w-auto max-w-[220px]"
              />
            </h1>
            <p className="mt-2 text-[16px] tracking-[-0.48px]">
              less but more.
            </p>
          </div>

          {/* Theme toggle in right corner of Hero section */}
          <div className="absolute right-5 top-5 z-40 flex items-center">
            <ThemeToggleButton
              variant="circle"
              start="top-right"
              blur={false}
            />
          </div>
        </section>

        <div className="grid grid-cols-4 items-center gap-3 rounded-[10px] bg-[#f2f2f2] px-5 py-6">
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

        <section id="projects" className="scroll-mt-20 pt-10">
          <h2 className="mb-5 text-[40px] leading-[46.4px] tracking-[-2px]">
            <RevealLine delay={0.05} className="block">Proof of Less</RevealLine>
            <RevealLine delay={0.15} className="block text-[#696969]">But More.</RevealLine>
          </h2>
          <div className="grid min-h-[500px] grid-cols-1 items-end gap-2 rounded-[10px] bg-[#030303] px-4 pb-4 pt-[10%] text-white dark:bg-white dark:text-[#030303] md:min-h-[min(65vw,991px)] md:grid-cols-2">
            <button onClick={() => setProject(0)} className="group text-left">
              <img
                src={asset(projects[0].image)}
                alt="void brand identity — black packaging and a red bottle"
                className="aspect-[738/781] w-full rounded-[5px] object-cover transition-opacity group-hover:opacity-80"
              />
              <span className="mt-2 block text-[12px] text-white dark:text-[#030303]">
                {projects[0].name}
              </span>
            </button>
            <div className="grid grid-cols-3 gap-2">
              {projects.slice(1).map((item, index) => (
                <button
                  onClick={() => setProject(index + 1)}
                  key={item.name}
                  className="group text-left"
                >
                  <img
                    src={asset(item.image)}
                    alt={`${item.name} design project`}
                    className="aspect-[239/253] w-full rounded-[5px] object-cover transition-opacity group-hover:opacity-80"
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
          <div className="grid grid-cols-3 gap-5 py-20 md:py-28">
            {[
              { val: 8, suffix: "+", label: "Crafting Experiences" },
              { val: 50, suffix: "+", label: "Projects Delivered" },
              { val: 20, suffix: "+", label: "Clients Worldwide" },
            ].map(({ val, suffix, label }, index) => (
              <div key={label} className="text-center">
                <p className="text-[55px] font-semibold leading-[1.65] tracking-[-5px] md:text-[90px] md:tracking-[-10px]">
                  <Counter target={val} suffix={suffix} />
                </p>
                <p className="mt-3 text-[12px] tracking-[-0.4px] md:text-[20px]">
                  <RevealLine delay={0.15 + index * 0.08}>{label}</RevealLine>
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="scroll-mt-20">
          <div className="flex min-h-[min(65vw,991px)] flex-col justify-between rounded-[5px] bg-[#030303] p-5 text-white dark:bg-white dark:text-[#030303] max-md:min-h-[470px]">
            <CornerLabel>What We Do, Perfectly.</CornerLabel>
            <img
              src={asset("12844.png")}
              alt="Studio symbol"
              className="mx-auto size-5 translate-y-[22px] object-contain dark:invert max-md:translate-y-[19px]"
            />
            <div>
              <div className="mb-5 flex -translate-y-[calc(min(65vw,991px)/2-76px)] justify-between text-[12px] max-md:-translate-y-[162px] md:text-[16px]">
                <span>8+ Years of Expertise</span>
                <span>50+ Projects Delivered</span>
              </div>
              <CornerLabel> </CornerLabel>
            </div>
          </div>
          <div className="space-y-3 py-10 md:py-14">
            {services.map(([label, image]) => (
              <div
                key={label}
                className="mx-auto grid w-full max-w-[1368px] grid-cols-2 gap-2"
              >
                <div className="flex aspect-[679/450] items-center justify-center rounded-[9px] border border-[#f2f2f2] text-center text-[14.4px] tracking-[-0.432px]">
                  {label}
                </div>
                <div className="flex items-center justify-center rounded-[9px] bg-[#f2f2f2]">
                  <img
                    src={asset(image)}
                    alt={label}
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
                  {steps[step][0].split("").map((char, i) => (
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
                  {steps[step][1]}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="relative grid grid-cols-5 border-t border-white/20 dark:border-black/20">
            {steps.map(([label], index) => (
              <button
                key={label}
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
                        setStep((current) => (current + 1) % steps.length)
                      }}
                      className="h-full w-full origin-left bg-white dark:bg-[#030303]"
                    />
                  ) : null}
                </div>
                <span className="text-[12px]">0{index + 1}</span>
                {label}
              </button>
            ))}
          </div>
        </section>

        <section className="py-24">
          <div className="relative mx-auto mb-12 aspect-[820/330] w-full max-w-[820px]">
            <div className="grid grid-cols-9 items-start gap-[1%]">
              {portraitColumns.map(({ images, offset }, colIndex) => {
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
            ].map(([name, title, quote, image]) => (
              <figure key={name} className="flex flex-col gap-[9px]">
                <figcaption
                  className={`flex min-h-[64px] items-center gap-[10px] rounded-[5px] bg-[#f2f2f2] p-3 text-[#030303] ${
                    name === "Amira Solis" ? "order-2" : ""
                  }`}
                >
                  <img
                    src={asset(image)}
                    alt={name}
                    className="h-10 w-[51px] rounded-[5px] object-cover"
                  />
                  <div>
                    <p className="text-[16px] leading-[19.2px] tracking-[-0.48px] text-[#030303]">
                      {name}
                    </p>
                    <p className="mt-[5px] text-[12px] leading-[14.4px] tracking-[-0.24px] text-[#696969]">
                      {title}
                    </p>
                  </div>
                </figcaption>
                <blockquote className="flex min-h-[100px] items-center justify-center rounded-[5px] bg-[#f2f2f2] p-3 text-center text-[16px] leading-[18.4px] tracking-[-0.48px] text-[#030303]">
                  {quote}
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
              <div className="col-span-2 flex aspect-[888/530] min-h-[400px] flex-col items-center justify-center gap-9 rounded-[10px] bg-[#f2f2f2] p-6 text-[#030303] md:min-h-0 md:gap-[clamp(20px,3vw,45px)]">
                <h3 className="text-center text-[32px] leading-[41.6px] tracking-[-0.96px] text-[#030303]">
                  <RevealLine className="block text-[#030303]">Engagement</RevealLine>
                  <RevealLine delay={0.1} className="block text-[#696969]">Over Time</RevealLine>
                </h3>
                <div className="w-full max-w-[315px]">
                  <div
                    role="img"
                    aria-label="Engagement rises steadily from February to June"
                    className="flex h-[155px] items-end justify-between gap-1"
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
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-[#030303]">{label}</p>
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
                  Delivering
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
                  Satisfied Clients
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
            {questions.map(([question, answer]) => (
              <details
                key={question}
                className="group border-b border-[#f2f2f2] py-[19px]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[16px] tracking-[-0.48px]">
                  {question}
                  <img
                    src={asset("888bd.svg")}
                    alt=""
                    className="transition-transform group-open:rotate-45"
                  />
                </summary>
                <p className="max-w-[540px] pt-5 text-[14px] leading-6 text-[#696969]">
                  {answer}
                </p>
              </details>
            ))}
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
          ref={(section) => {
            if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
            const leftHand = section.querySelector<HTMLImageElement>('[data-scroll-hand="left"]');
            const rightHand = section.querySelector<HTMLImageElement>('[data-scroll-hand="right"]');
            if (!leftHand || !rightHand) return;
            const leftAnimation = animate(leftHand, { x: ["-70%", "0%"] }, { duration: 1, ease: "linear" });
            const rightAnimation = animate(rightHand, { x: ["70%", "0%"] }, { duration: 1, ease: "linear" });
            const options = { target: section, offset: ["start end", "center center"] as ["start end", "center center"] };
            const stopLeftScroll = scroll(leftAnimation, options);
            const stopRightScroll = scroll(rightAnimation, options);
            return () => {
              stopLeftScroll();
              stopRightScroll();
              leftAnimation.cancel();
              rightAnimation.cancel();
            };
          }}
          className="relative mb-2 scroll-mt-20 overflow-hidden rounded-[10px] border-[4px] border-[#030303] dark:border-white py-12"
        >
          <img
            data-scroll-hand="left"
            src={asset("788a4.png")}
            alt="A hand reaching toward the center"
            className="absolute left-0 top-3 w-[31%] max-md:hidden"
          />
          <img
            data-scroll-hand="right"
            src={asset("3400b.png")}
            alt="A hand reaching from the other side"
            className="absolute right-0 top-3 w-[31%] max-md:hidden"
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
              <button className="w-full rounded-[10px] bg-[#030303] py-3 text-[14px] text-white transition-colors hover:bg-[#333] dark:bg-white dark:text-[#030303] dark:hover:bg-[#e6e6e6]">
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

      <footer className="mx-2 rounded-[10px] bg-[#030303] px-5 pb-8 text-white">
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
        <div className="mb-8 flex h-10 items-center justify-center overflow-hidden rounded-[10px] bg-white text-[14px] leading-[18.4px] tracking-[-0.42px] text-[#030303]">
          <div className="flex shrink-0 items-center gap-3 whitespace-nowrap">
            {[0, 1, 2].map((index) => (
              <div key={index} aria-hidden={index !== 1 ? true : undefined} className="flex items-center gap-3">
                <span>We craft digital spaces where contrast creates conversation.</span>
                <span aria-hidden="true" className="h-7 w-[5px] rounded-full bg-[#d6d6d6]" />
                <span>Our work exists in the tension between simplicity and statement.</span>
                <span aria-hidden="true" className="h-7 w-[5px] rounded-full bg-[#d6d6d6]" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-full justify-center py-[5%]">
          <img
            src="/OFST-wt-trans.svg"
            alt="OFST"
            className="h-auto w-full max-w-[850px] object-contain"
          />
        </div>
        <div className="grid gap-2 md:grid-cols-2">
          {[
            ["Home", "About", "Projects", "Contact"],
            ["X.com", "LinkedIn", "YouTube", "layers"],
          ].map((links, index) => (
            <div
              key={index}
              className="space-y-[5px] rounded-[10px] bg-white p-2 text-[#030303]"
            >
              {links.map((label) => (
                <a
                  key={label}
                  href={
                    index === 0
                      ? `#${label.toLowerCase()}`
                      : {
                          "X.com": "https://x.com",
                          LinkedIn: "https://linkedin.com",
                          YouTube: "https://youtube.com",
                          layers: "https://layers.to",
                        }[label]
                  }
                  target={index === 1 ? "_blank" : undefined}
                  rel={index === 1 ? "noreferrer" : undefined}
                  className="flex min-h-[35px] items-center justify-between gap-3 rounded-[10px] bg-[#f2f2f2] px-2 py-[7px] text-[16px] leading-[19px] tracking-[-0.48px] transition-colors hover:bg-[#e6e6e6]"
                >
                  {label}
                  <span aria-hidden="true" className="flex h-[19px] w-[34px] shrink-0 items-center justify-center rounded-full border border-[#030303]">
                    <img src={asset("a86b1.svg")} alt="" />
                  </span>
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-7 flex flex-wrap justify-between gap-4 text-[12px]">
          <p>OFST® 2026. All rights reserved</p>
          <p>Made in Framer By Danny</p>
          <a href="#home" className="hover:underline">
            Back to top ↑
          </a>
        </div>
      </footer>

      {/* Viewport bottom blur bar */}
      <div aria-hidden="true" className="bottom-blur-gradient" />

      {project !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-5 backdrop-blur-sm"
          onClick={() => setProject(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={projects[project].name}
            className="relative max-h-[90dvh] max-w-[760px] overflow-auto rounded-[10px] bg-[#030303] p-4 text-white"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              autoFocus
              onClick={() => setProject(null)}
              onKeyDown={(event) => {
                if (event.key === "Escape") setProject(null)
              }}
              aria-label="Close project"
              className="absolute right-6 top-6 rounded-full bg-black px-3 py-1 text-[24px]"
            >
              ×
            </button>
            <img
              src={asset(projects[project].image)}
              alt={projects[project].name}
              className="max-h-[75dvh] w-full object-contain"
            />
            <h2 className="pt-4 text-[20px]">{projects[project].name}</h2>
          </div>
        </div>
      )}
    </div>
  )
}
