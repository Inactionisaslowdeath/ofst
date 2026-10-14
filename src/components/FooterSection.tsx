import { useEffect, useRef, useState } from "react"
import type Lenis from "lenis"
import { RevealLine } from "./ui/MotionPrimitives"

export interface FooterSectionProps {
  lenis: Lenis | null
}

export function FooterSection({ lenis }: FooterSectionProps) {
  const [subscribed, setSubscribed] = useState(false)
  const footerContainerRef = useRef<HTMLDivElement | null>(null)
  const footerBottomRef = useRef<HTMLDivElement | null>(null)
  const newsletterStickyRef = useRef<HTMLDivElement | null>(null)
  const marqueeRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (footerBottomRef.current)
        footerBottomRef.current.style.transform = "none"
      if (newsletterStickyRef.current)
        newsletterStickyRef.current.style.transform = "none"
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

      const newsletterHeight = newsletter.offsetHeight
      const bottomHeight = bottom.offsetHeight
      const revealDistance = bottomHeight

      if (rect.top > windowHeight) {
        bottom.style.transform = "translate3d(0, -100%, 0)"
        return
      }

      const startPin = windowHeight - newsletterHeight
      const progress = Math.max(
        0,
        Math.min(1, (startPin - rect.top) / revealDistance),
      )
      const footerY = -100 * (1 - progress)
      bottom.style.transform = `translate3d(0, ${footerY.toFixed(2)}%, 0)`
    }

    updateFooter()

    // Pause marquee when off-screen to save frame budget and GPU memory
    const marqueeEl = marqueeRef.current
    let observer: IntersectionObserver | null = null
    if (marqueeEl && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          marqueeEl.style.animationPlayState = entry.isIntersecting
            ? "running"
            : "paused"
        },
        { threshold: 0 },
      )
      observer.observe(marqueeEl)
    }

    if (lenis) {
      const handleLenis = () => updateFooter()
      lenis.on("scroll", handleLenis)
      return () => {
        lenis.off("scroll", handleLenis)
        observer?.disconnect()
      }
    } else {
      const handleScroll = () => updateFooter()
      window.addEventListener("scroll", handleScroll, { passive: true })
      window.addEventListener("resize", handleScroll)
      return () => {
        window.removeEventListener("scroll", handleScroll)
        window.removeEventListener("resize", handleScroll)
        observer?.disconnect()
      }
    }
  }, [lenis])

  return (
    <div ref={footerContainerRef} className="relative z-10 w-full">
      {/* Sticky Newsletter & Ticker Curtain */}
      <div
        ref={newsletterStickyRef}
        className="relative z-20 mx-2 overflow-hidden bg-[#030303] px-5 pb-8 text-white will-change-transform"
      >
        <div className="h-44 bg-[repeating-linear-gradient(90deg,#ffffff66_0px,#ffffff66_2px,transparent_2px,transparent_24px)] [mask-image:linear-gradient(black_0%,transparent_100%)] md:h-[280px]" />
        <div className="mx-auto grid max-w-[920px] items-center gap-8 py-12 md:grid-cols-[1fr_1.2fr_1fr]">
          <img
            src="/assets/ba62e.png"
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
                window.location.href = `mailto:hello@OFST.com?subject=Newsletter%20subscription&body=${encodeURIComponent(
                  `Please subscribe ${values.get("subscriber")} to your newsletter.`,
                )}`
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
              <button
                type="submit"
                className="absolute right-1 top-1 rounded-[8px] bg-[#030303] px-4 py-2 text-[14px] cursor-pointer transition-[transform,background-color] duration-150 active:scale-95 hover:bg-[#222]"
              >
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
            src="/assets/e9fc8.png"
            alt="Newsletter editorial portrait"
            className="hidden aspect-[283/258] rounded-[10px] object-cover md:block"
          />
        </div>
        <div className="mb-4 flex h-10 items-center overflow-hidden rounded-[10px] bg-white text-[14px] leading-[18.4px] tracking-[-0.42px] text-[#030303]">
          <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">
            <div
              ref={marqueeRef}
              className="flex animate-marquee shrink-0 items-center whitespace-nowrap"
            >
              {[0, 1].map((copyIndex) => (
                <div
                  key={copyIndex}
                  aria-hidden={copyIndex === 1 ? true : undefined}
                  className="flex shrink-0 items-center"
                >
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="flex shrink-0 items-center gap-3 pr-3"
                    >
                      <span>
                        We build digital experiences with clarity and intent.
                      </span>
                      <span
                        aria-hidden="true"
                        className="h-7 w-[5px] rounded-full bg-[#d6d6d6]"
                      />
                      <span>
                        Our work exists in between Strategy, design, and
                        development working as one.
                      </span>
                      <span
                        aria-hidden="true"
                        className="h-7 w-[5px] rounded-full bg-[#d6d6d6]"
                      />
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
                    <span
                      aria-hidden="true"
                      className="flex h-[19px] w-[34px] shrink-0 items-center justify-center rounded-full border border-[#030303] transition-transform duration-150 group-hover:scale-105 active:scale-95"
                    >
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
            <p className="order-2 text-center sm:order-1 sm:text-left">
              OFST® 2026. All rights reserved
            </p>
            <p className="order-3 hidden text-center text-[#888] sm:order-2 sm:block">
              Independent by Design
            </p>
            <a
              href="#home"
              className="order-1 text-right hover:underline sm:order-3 sm:text-right"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default FooterSection
