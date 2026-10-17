import { useEffect, useLayoutEffect, useRef, useState } from "react"
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

export interface AdaptiveLineItem {
  prefix?: React.ReactNode
  text: string
  desktopClassName: string
}

export interface AdaptiveRevealParagraphProps {
  lines: AdaptiveLineItem[]
  containerClassName?: string
  baseDelay?: number
}

export function AdaptiveRevealParagraph({
  lines,
  containerClassName = "",
  baseDelay = 0.05,
}: AdaptiveRevealParagraphProps) {
  const containerRef = useRef<HTMLParagraphElement>(null)
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [lineIndices, setLineIndices] = useState<number[]>([])
  const [isMeasured, setIsMeasured] = useState(false)

  // Flatten all words with metadata
  const flattenedWords = lines.flatMap((line, lineIdx) => {
    const rawWords = line.text.trim().split(/\s+/)
    return rawWords.map((word, wordIdx) => ({
      word,
      lineIdx,
      isFirstInLine: wordIdx === 0,
      prefix: wordIdx === 0 ? line.prefix : undefined,
    }))
  })

  // Measure line breaks on mobile viewports
  useLayoutEffect(() => {
    const measureLines = () => {
      // On desktop (md: >= 768px), we use the static desktop markup
      if (window.innerWidth >= 768) {
        setIsMeasured(false)
        return
      }

      const elements = wordRefs.current.filter(Boolean) as HTMLSpanElement[]
      if (elements.length === 0) return

      let currentTop = -1
      let currentLine = 0
      const assignedLines: number[] = []

      elements.forEach((el) => {
        const top = Math.round(el.offsetTop)
        if (currentTop === -1) {
          currentTop = top
        } else if (Math.abs(top - currentTop) > 6) {
          // New visual line encountered
          currentTop = top
          currentLine += 1
        }
        assignedLines.push(currentLine)
      })

      setLineIndices(assignedLines)
      setIsMeasured(true)
    }

    measureLines()

    const container = containerRef.current
    let observer: ResizeObserver | null = null
    if (container && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => measureLines())
      observer.observe(container)
    }

    window.addEventListener("resize", measureLines)
    return () => {
      window.removeEventListener("resize", measureLines)
      if (observer) observer.disconnect()
    }
  }, [lines])

  return (
    <>
      {/* Desktop view: exact static desktop lines with precise delay and classes */}
      <p className={`hidden md:block ${containerClassName}`}>
        {lines.map((item, index) => (
          <RevealLine
            key={index}
            delay={baseDelay + index * 0.1}
            className={item.desktopClassName}
          >
            {item.prefix}
            {item.prefix ? " " : ""}
            {item.text}
          </RevealLine>
        ))}
      </p>

      {/* Mobile view: continuous wrapping with per-line staggered blur + translate reveal */}
      <p ref={containerRef} className={`block md:hidden ${containerClassName}`}>
        {flattenedWords.map((item, idx) => {
          const lineNum = lineIndices[idx] ?? 0
          const wordDelay = baseDelay + lineNum * 0.12

          return (
            <motion.span
              key={idx}
              ref={(el) => {
                wordRefs.current[idx] = el
              }}
              initial={{
                opacity: 0,
                transform: "translateY(28px)",
                filter: "blur(10px)",
              }}
              whileInView={{
                opacity: 1,
                transform: "translateY(0px)",
                filter: "blur(0px)",
              }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{
                duration: 0.8,
                delay: isMeasured ? wordDelay : baseDelay,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block will-change-[transform,opacity]"
            >
              {item.prefix && <>{item.prefix} </>}
              {item.word}
              {/* Natural spacing between inline-block words */}
              <span>&nbsp;</span>
            </motion.span>
          )
        })}
      </p>
    </>
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
