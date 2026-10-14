import { useState, useEffect } from "react"
import Lenis from "lenis"
import { frame, cancelFrame } from "framer-motion"

export function useSmoothScroll() {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    const initLenis = () => {
      if (reducedMotion.matches) {
        setLenis(null)
        return
      }

      const instance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        prevent: (element) => Boolean(element.closest('[role="dialog"]')),
      })

      const updateLenis = ({ timestamp }: { timestamp: number }) => {
        instance.raf(timestamp)
      }
      frame.update(updateLenis, true)

      setLenis(instance)
      if (document.body.style.overflow === "hidden") instance.stop()

      return () => {
        cancelFrame(updateLenis)
        instance.destroy()
        setLenis(null)
      }
    }

    const cleanup = initLenis()
    const handleReducedMotionChange = () => {
      cleanup?.()
      initLenis()
    }

    reducedMotion.addEventListener("change", handleReducedMotionChange)
    return () => {
      cleanup?.()
      reducedMotion.removeEventListener("change", handleReducedMotionChange)
    }
  }, [])

  return lenis
}
