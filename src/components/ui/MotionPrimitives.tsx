import { useRef, useState } from "react"
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
  const isBlock = className.includes("block")
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
      className={`${
        isBlock ? "reveal-line-block block" : "inline-block"
      } ${className}`}
    >
      {children}
    </motion.span>
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
    <div className="flex items-center justify-between text-[16px] tracking-[-0.48px]">
      <span>+</span>
      <span>{children}</span>
      <span>+</span>
    </div>
  )
}
