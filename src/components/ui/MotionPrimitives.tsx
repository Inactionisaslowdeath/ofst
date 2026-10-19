import { useEffect, useRef, useState } from "react"
import { motion, animate } from "framer-motion"

export interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function RevealLine({
  children,
  className = "",
  delay = 0,
}: RevealProps) {
  // Check if display is specified directly without responsive prefix
  const hasBlock = /(^|\s)block(\s|$)/.test(className)
  const hasInline = /(^|\s)inline(\s|$)/.test(className)
  const defaultDisplay = hasBlock
    ? "block"
    : hasInline
      ? "inline"
      : "inline-block"
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
      className={`${defaultDisplay} ${className}`}
    >
      {children}
    </motion.span>
  )
}

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export interface AdaptiveLineItem {
  prefix?: React.ReactNode
  text: string
  desktopClassName?: string
}

export interface AdaptiveRevealParagraphProps {
  lines: AdaptiveLineItem[]
  containerClassName?: string
  baseDelay?: number
}

export function AdaptiveRevealParagraph({
  lines,
  containerClassName = "",
}: AdaptiveRevealParagraphProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const desktopRef = useRef<HTMLDivElement>(null)
  const mobileRef = useRef<HTMLParagraphElement>(null)

  // Flatten words for mobile fluid paragraph
  const flattenedWords = lines.flatMap((line, lineIdx) => {
    const rawWords = line.text.trim().split(/\s+/)
    return rawWords.map((word, wordIdx) => ({
      word,
      lineIdx,
      isFirstInLine: wordIdx === 0,
      prefix: wordIdx === 0 ? line.prefix : undefined,
    }))
  })

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    if (reducedMotion || !containerRef.current) return

    const mm = gsap.matchMedia(containerRef)

    // Desktop: >= 768px
    mm.add("(min-width: 768px)", () => {
      const words = desktopRef.current?.querySelectorAll(".scrub-word")
      if (words && words.length > 0) {
        gsap.fromTo(
          words,
          {
            opacity: 0.15,
            y: 5,
            filter: "blur(3.5px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              end: "bottom 38%",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          },
        )
      }
    })

    // Mobile: < 768px
    mm.add("(max-width: 767px)", () => {
      const words = mobileRef.current?.querySelectorAll(".scrub-word")
      if (words && words.length > 0) {
        gsap.fromTo(
          words,
          {
            opacity: 0.15,
            y: 5,
            filter: "blur(3.5px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              end: "bottom 40%",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          },
        )
      }
    })

    return () => mm.revert()
  }, [lines])

  return (
    <div ref={containerRef} className="select-none">
      {/* Desktop view: exact static desktop lines with desktopClassName */}
      <div ref={desktopRef} className={`hidden md:block ${containerClassName}`}>
        {lines.map((item, index) => {
          const words = item.text.trim().split(/\s+/)
          return (
            <p key={index} className={item.desktopClassName}>
              {item.prefix && (
                <span className="scrub-word mr-[0.28em] inline-block">
                  {item.prefix}{" "}
                </span>
              )}
              {words.map((word, wIdx) => (
                <span
                  key={wIdx}
                  className="scrub-word mr-[0.28em] inline-block"
                >
                  {word}{" "}
                </span>
              ))}
            </p>
          )
        })}
      </div>

      {/* Mobile view: continuous fluid paragraph containing all flattened words */}
      <p ref={mobileRef} className={`block md:hidden ${containerClassName}`}>
        {flattenedWords.map((item, idx) => (
          <span key={idx} className="scrub-word mr-[0.28em] inline-block">
            {item.prefix && <>{item.prefix} </>}
            {item.word}{" "}
          </span>
        ))}
      </p>
    </div>
  )
}

export function KineticBarcode({ className = "" }: { className?: string }) {
  const barcodeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    if (reducedMotion || !barcodeRef.current) return

    const ctx = gsap.context(() => {
      const bars = barcodeRef.current?.querySelectorAll(".barcode-bar")
      if (bars && bars.length > 0) {
        gsap.fromTo(bars, { scaleY: 0.15, opacity: 0.25 }, {
          scaleY: 1,
          opacity: 1,
          stagger: 0.03,
          ease: "power1.out",
          scrollTrigger: {
            trigger: barcodeRef.current,
            start: "top 85%",
            end: "center 60%",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        })
      }
    }, barcodeRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={barcodeRef}
      aria-hidden="true"
      className={`flex h-[30px] items-stretch gap-[3px] ${className}`}
    >
      <span className="barcode-bar w-8 origin-bottom rounded-[1px] bg-[#030303] dark:bg-white" />
      <span className="barcode-bar w-6 origin-bottom rounded-[1px] bg-[#030303] dark:bg-white" />
      <span className="barcode-bar w-[14px] origin-bottom rounded-[1px] bg-[#030303] dark:bg-white" />
      {Array.from({ length: 17 }, (_, index) => (
        <span
          key={index}
          className="barcode-bar w-[2px] origin-bottom rounded-[1px] bg-[#030303] dark:bg-white"
        />
      ))}
    </div>
  )
}

export function RevealBlock({
  children,
  className = "",
  delay = 0,
}: RevealProps) {
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

export interface CounterProps {
  target: number
  suffix?: string
  className?: string
}

export function Counter({ target, suffix = "", className = "" }: CounterProps) {
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
      className={`inline-block tabular-nums ${className}`}
    >
      {displayValue}
      {suffix}
    </motion.span>
  )
}

export function CornerLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between text-[16px] tracking-[-0.54px]">
      <span>+</span>
      <span>{children}</span>
      <span>+</span>
    </div>
  )
}
