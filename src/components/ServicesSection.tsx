import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SERVICES } from "../data/content"
import { CornerLabel, RevealLine } from "./ui/MotionPrimitives"

gsap.registerPlugin(ScrollTrigger)

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isJSDOM =
      typeof navigator !== "undefined" &&
      /jsdom/i.test(navigator.userAgent || "")
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    if (isJSDOM || reducedMotion || !containerRef.current) return

    const mm = gsap.matchMedia(containerRef)

    // Mobile viewports (< 768px): cards enter uncompressed and smoothly compress as they reach the upper zone
    mm.add("(max-width: 767px)", () => {
      const cards =
        cardsContainerRef.current?.querySelectorAll<HTMLElement>(
          ".service-card",
        )
      cards?.forEach((card, index) => {
        gsap.fromTo(card, { scale: 1, y: 0 }, {
          scale: 0.94,
          y: index * -14,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 38%",
            end: "top 14%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        })

        const imgInner = card.querySelector<HTMLElement>(
          ".service-card-image-inner",
        )
        if (imgInner) {
          gsap.fromTo(imgInner, { yPercent: -12 }, {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          })
        }
      })
    })

    // Desktop viewports (>= 768px): preserves exact desktop timing
    mm.add("(min-width: 768px)", () => {
      const cards =
        cardsContainerRef.current?.querySelectorAll<HTMLElement>(
          ".service-card",
        )
      cards?.forEach((card) => {
        gsap.fromTo(card, { scale: 1 }, {
          scale: 0.94,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 65%",
            end: "top 20%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        })

        const imgInner = card.querySelector<HTMLElement>(
          ".service-card-image-inner",
        )
        if (imgInner) {
          gsap.fromTo(imgInner, { yPercent: -12 }, {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          })
        }
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative scroll-mt-20 pb-10 md:pb-14"
    >
      {/* Pinned "What We Do, Perfectly." Black Container Card - pins at 72px on mobile and 80px on desktop matching ProcessSection */}
      <div
        ref={headerRef}
        className="sticky top-[72px] md:top-20 z-0 flex min-h-[min(65vw,991px)] max-md:min-h-[470px] flex-col justify-between rounded-[5px] bg-[#030303] p-5 text-white dark:bg-white dark:text-[#030303]"
      >
        <CornerLabel>
          <RevealLine>What We Do, Perfectly.</RevealLine>
        </CornerLabel>
        <img
          src="/assets/12844.png"
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

      {/* 4 service cards: reduced gap, unified on mobile, 2-column on desktop */}
      <div
        ref={cardsContainerRef}
        className="relative z-10 space-y-1.5 rounded-[5px] bg-[#030303] pt-6 pb-2 dark:bg-white md:space-y-3 md:pt-10 md:pb-4"
      >
        {SERVICES.map(({ name, image }, index) => (
          <div
            key={name}
            className="service-card will-change-transform"
            style={{ transformOrigin: "center center" }}
          >
            {/* On mobile: single unified editorial card container. On desktop: exact 2-column grid */}
            <div className="flex flex-col rounded-[12px] bg-[#f2f2f2] p-5 text-[#030303] md:grid md:grid-cols-2 md:gap-2 md:rounded-none md:bg-transparent md:p-0">
              {/* Header / Name area */}
              <div className="flex items-center justify-between md:aspect-[679/450] md:justify-center md:rounded-[9px] md:bg-[#f2f2f2] md:p-0">
                <span className="text-[12px] tracking-[-0.36px] text-[#888888] md:hidden">
                  0{index + 1}
                </span>
                <span className="text-[16px] font-medium tracking-[-0.54px] md:text-[14.4px] md:font-normal">
                  <RevealLine delay={0.06 * (index % 3)}>{name}</RevealLine>
                </span>
                <span className="text-[12px] tracking-[-0.36px] text-[#888888] md:hidden">
                  OFST
                </span>
              </div>

              {/* Artwork stage with counter-scroll parallax */}
              <div className="relative mt-4 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[8px] bg-[#e8e8e8]/60 md:mt-0 md:aspect-[679/450] md:rounded-[9px] md:bg-[#f2f2f2]">
                <div className="service-card-image-inner flex size-full items-center justify-center will-change-transform">
                  <img
                    src={`/assets/${image}`}
                    alt={name}
                    className="max-h-[75%] max-w-[55%] rounded-[5px] object-contain md:max-h-none md:max-w-none md:w-[32%]"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ServicesSection
