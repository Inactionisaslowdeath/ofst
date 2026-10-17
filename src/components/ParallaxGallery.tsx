import { motion, useMotionValue, useTransform } from "framer-motion"
import { forwardRef, useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type Lenis from "lenis"

gsap.registerPlugin(ScrollTrigger)

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
  const columns = useRef<Array<HTMLDivElement | null>>([])
  const [dimension, setDimension] = useState({ width: 0, height: 0 })
  const [usesMobileScrollTrigger, setUsesMobileScrollTrigger] = useState(false)
  const scrollYProgress = useMotionValue(0)

  const { height } = dimension
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25])
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: coarse)")
    const updateScrollOwner = () => setUsesMobileScrollTrigger(mediaQuery.matches)

    updateScrollOwner()
    mediaQuery.addEventListener("change", updateScrollOwner)
    return () => mediaQuery.removeEventListener("change", updateScrollOwner)
  }, [])

  useEffect(() => {
    if (usesMobileScrollTrigger) return

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
  }, [usesMobileScrollTrigger])

  useEffect(() => {
    if (usesMobileScrollTrigger) {
      scrollYProgress.set(0)
      return
    }

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
      const elementTop =
        cachedTop ||
        (gallery.current
          ? gallery.current.getBoundingClientRect().top + window.scrollY
          : 0)
      const elementHeight =
        cachedHeight || (gallery.current ? gallery.current.offsetHeight : 0)

      const start = elementTop - viewportHeight
      const end = elementTop + elementHeight
      const total = end - start

      if (total <= 0) return
      const progress = Math.max(0, Math.min(1, (scrollY - start) / total))
      scrollYProgress.set(progress)
    }

    measureBounds()
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
  }, [lenis, scrollYProgress, usesMobileScrollTrigger])

  useEffect(() => {
    if (!usesMobileScrollTrigger || !gallery.current) return

    const visibleColumns = columns.current.slice(0, 2).filter(
      (column): column is HTMLDivElement => column !== null,
    )
    if (visibleColumns.length !== 2) return

    ScrollTrigger.config({ ignoreMobileResize: true })
    ScrollTrigger.normalizeScroll(true)

    const context = gsap.context(() => {
      gsap.fromTo(
        visibleColumns[0],
        { yPercent: 0 },
        {
          yPercent: 114.3,
          ease: "none",
          scrollTrigger: {
            trigger: gallery.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      )
      gsap.fromTo(
        visibleColumns[1],
        { yPercent: 0 },
        {
          yPercent: 188.6,
          ease: "none",
          scrollTrigger: {
            trigger: gallery.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      )
    }, gallery)

    ScrollTrigger.refresh(true)

    return () => {
      context.revert()
      ScrollTrigger.normalizeScroll(false)
      ScrollTrigger.config({ ignoreMobileResize: false })
    }
  }, [usesMobileScrollTrigger])

  return (
    <div className="relative w-screen left-1/2 -translate-x-1/2 overflow-x-hidden">
      <div
        ref={gallery}
        className="relative box-border flex h-[175svh] min-h-[1050px] w-screen gap-[2vw] overflow-hidden bg-white px-[2vw] pt-[2vw] pb-0 dark:bg-[#09090b] sm:min-h-[1200px] md:h-[175dvh]"
      >
        <GalleryColumn
          ref={(element) => {
            columns.current[0] = element
          }}
          images={[IMAGES[0], IMAGES[1], IMAGES[2], IMAGES[12]]}
          y={y}
          usesMobileScrollTrigger={usesMobileScrollTrigger}
        />
        <GalleryColumn
          ref={(element) => {
            columns.current[1] = element
          }}
          images={[IMAGES[3], IMAGES[4], IMAGES[5], IMAGES[10]]}
          y={y2}
          usesMobileScrollTrigger={usesMobileScrollTrigger}
        />
        <GalleryColumn
          ref={(element) => {
            columns.current[2] = element
          }}
          images={[IMAGES[6], IMAGES[7], IMAGES[8]]}
          y={y3}
          usesMobileScrollTrigger={usesMobileScrollTrigger}
          className="hidden sm:flex"
        />
        <GalleryColumn
          ref={(element) => {
            columns.current[3] = element
          }}
          images={[IMAGES[9], IMAGES[10], IMAGES[11]]}
          y={y4}
          usesMobileScrollTrigger={usesMobileScrollTrigger}
          className="hidden md:flex"
        />

        <div aria-hidden="true" className="hero-gallery-fade" />
      </div>
    </div>
  )
}

interface GalleryColumnProps {
  images: string[]
  y: import("framer-motion").MotionValue<number>
  usesMobileScrollTrigger: boolean
  className?: string
}

const GalleryColumn = forwardRef<HTMLDivElement, GalleryColumnProps>(
  function GalleryColumn(
    { images, y, usesMobileScrollTrigger, className = "" },
    ref,
  ) {
    return (
      <motion.div
        ref={ref}
        className={`relative -top-[45%] flex h-full flex-1 w-full flex-col gap-[2vw] first:top-[-45%] [&:nth-child(2)]:top-[-75%] [&:nth-child(3)]:top-[-45%] [&:nth-child(4)]:top-[-75%] will-change-transform [backface-visibility:hidden] ${className}`}
        style={usesMobileScrollTrigger ? undefined : ({ y } as any)}
      >
      {images.map((src, i) => (
        <div
          key={i}
          className={`relative w-full shrink-0 overflow-hidden rounded-[10px] aspect-[2/3] min-h-[260px] sm:aspect-[2/3] sm:min-h-[380px] ${
            i === 3 ? "flex sm:hidden" : ""
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
})

export default ParallaxGallery
