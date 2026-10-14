import { motion, useMotionValue, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import type Lenis from "lenis"

const IMAGES = [
  "/images/lummi/img15.png",
  "/images/lummi/img21.png",
  "/images/lummi/img3.png",
  "/images/lummi/img4.png",
  "/images/lummi/img5.png",
  "/images/lummi/img6.png",
  "/images/lummi/img7.png",
  "/images/lummi/img8.png",
  "/images/lummi/img24.png",
  "/images/lummi/img10.png",
  "/images/lummi/img11.png",
  "/images/lummi/img12.png",
  "/images/lummi/img13.png",
]

export interface ParallaxGalleryProps {
  lenis?: Lenis | null
}

export function ParallaxGallery({ lenis }: ParallaxGalleryProps) {
  const gallery = useRef<HTMLDivElement>(null)
  const [dimension, setDimension] = useState({ width: 0, height: 0 })
  const scrollYProgress = useMotionValue(0)

  const { height } = dimension
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25])
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3])

  useEffect(() => {
    let rAF = 0
    const resize = () => {
      cancelAnimationFrame(rAF)
      rAF = requestAnimationFrame(() => {
        setDimension({ width: window.innerWidth, height: window.innerHeight })
      })
    }

    window.addEventListener("resize", resize)
    resize()

    return () => {
      cancelAnimationFrame(rAF)
      window.removeEventListener("resize", resize)
    }
  }, [])

  useEffect(() => {
    let cachedTop = 0
    let cachedHeight = 0
    let rAF = 0

    const measureBounds = () => {
      if (!gallery.current) return
      const rect = gallery.current.getBoundingClientRect()
      cachedTop = rect.top + window.scrollY
      cachedHeight = rect.height
    }

    const onResize = () => {
      cancelAnimationFrame(rAF)
      rAF = requestAnimationFrame(measureBounds)
    }

    measureBounds()
    window.addEventListener("resize", onResize)

    const updateProgress = (currentScroll?: number) => {
      const scrollY = currentScroll ?? window.scrollY
      const viewportHeight = window.innerHeight
      const elementTop = cachedTop || (gallery.current ? gallery.current.getBoundingClientRect().top + window.scrollY : 0)
      const elementHeight = cachedHeight || (gallery.current ? gallery.current.offsetHeight : 0)

      const start = elementTop - viewportHeight
      const end = elementTop + elementHeight
      const total = end - start

      if (total <= 0) return
      const progress = Math.max(0, Math.min(1, (scrollY - start) / total))
      scrollYProgress.set(progress)
    }

    updateProgress()

    if (lenis) {
      const handleScroll = (e: { scroll: number }) => {
        updateProgress(e.scroll)
      }
      lenis.on("scroll", handleScroll)
      return () => {
        lenis.off("scroll", handleScroll)
        cancelAnimationFrame(rAF)
        window.removeEventListener("resize", onResize)
      }
    } else {
      const handleNativeScroll = () => {
        updateProgress()
      }
      window.addEventListener("scroll", handleNativeScroll, { passive: true })
      return () => {
        window.removeEventListener("scroll", handleNativeScroll)
        cancelAnimationFrame(rAF)
        window.removeEventListener("resize", onResize)
      }
    }
  }, [lenis, scrollYProgress])

  return (
    <div className="relative w-screen left-1/2 -translate-x-1/2 overflow-x-hidden">
      <div
        ref={gallery}
        className="relative box-border flex h-[175vh] w-screen gap-[2vw] overflow-hidden bg-white dark:bg-[#09090b] px-[2vw] pt-[2vw] pb-0"
      >
        <GalleryColumn images={[IMAGES[0], IMAGES[1], IMAGES[2], IMAGES[12]]} y={y} />
        <GalleryColumn images={[IMAGES[3], IMAGES[4], IMAGES[5], IMAGES[10]]} y={y2} />
        <GalleryColumn images={[IMAGES[6], IMAGES[7], IMAGES[8]]} y={y3} className="hidden sm:flex" />
        <GalleryColumn images={[IMAGES[9], IMAGES[10], IMAGES[11]]} y={y4} className="hidden md:flex" />

        <div aria-hidden="true" className="hero-gallery-fade" />
      </div>
    </div>
  )
}

function GalleryColumn({
  images,
  y,
  className = "",
}: {
  images: string[]
  y: import("framer-motion").MotionValue<number>
  className?: string
}) {
  return (
    <motion.div
      className={`relative -top-[45%] flex h-full flex-1 w-full flex-col gap-[2vw] first:top-[-45%] [&:nth-child(2)]:top-[-75%] [&:nth-child(3)]:top-[-45%] [&:nth-child(4)]:top-[-75%] will-change-transform [backface-visibility:hidden] ${className}`}
      style={{ y }}
    >
      {images.map((src, i) => (
        <div
          key={i}
          className={`relative w-full overflow-hidden rounded-[10px] ${
            i === 3 ? "flex sm:hidden h-[calc(25%-70px)]" : "h-[calc(25%-70px)] sm:h-full"
          }`}
        >
          <img
            src={src}
            alt="Showcase gallery item"
            className="pointer-events-none h-full w-full rounded-[10px] object-cover"
          />
        </div>
      ))}
    </motion.div>
  )
}

export default ParallaxGallery
