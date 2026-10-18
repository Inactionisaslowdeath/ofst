import { useEffect, useRef, useState } from "react"
import type Lenis from "lenis"
import { RevealLine } from "./ui/MotionPrimitives"

export interface FooterSectionProps {
  lenis: Lenis | null
  onNavigateContact?: () => void
  onNavigateHome?: () => void
  onNavigateProjects?: () => void
  onNavigateAbout?: () => void
}

export function FooterSection({
  lenis,
  onNavigateContact,
  onNavigateHome,
  onNavigateProjects,
  onNavigateAbout,
}: FooterSectionProps) {
  const [subscribed, setSubscribed] = useState(false)
  const marqueeRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const marqueeEl = marqueeRef.current
    if (!marqueeEl || !("IntersectionObserver" in window)) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        marqueeEl.style.animationPlayState = entry.isIntersecting
          ? "running"
          : "paused"
      },
      { threshold: 0 },
    )
    observer.observe(marqueeEl)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Opaque cover layer: it scrolls over the sticky footer underlay with seamless edge */}
      <div className="relative z-10 w-full bg-[var(--bg)] px-2 -mt-[1px] pt-[1px] transition-colors duration-300">
        <div className="overflow-hidden rounded-t-[10px] bg-[#030303] px-5 pb-8 text-white">
          <div className="h-44 bg-[repeating-linear-gradient(90deg,#ffffff66_0px,#ffffff66_2px,transparent_2px,transparent_24px)] [mask-image:linear-gradient(black_0%,transparent_100%)] md:h-[280px]" />
          <div className="mx-auto grid max-w-[920px] items-center gap-8 py-12 md:grid-cols-[1fr_1.2fr_1fr]">
            <img
              src="/assets/ba62e.png"
              alt="Newsletter editorial portrait"
              className="hidden aspect-[283/258] rounded-[10px] object-cover md:block"
            />
            <div className="text-center">
              <h2 className="text-[32px] font-medium leading-[41.6px] tracking-[-0.96px]">
                <RevealLine className="block text-gradient-white-to-black">
                  Join Our Weekly
                </RevealLine>
                <RevealLine
                  delay={0.1}
                  className="block text-gradient-white-to-black"
                >
                  Newsletter!
                </RevealLine>
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
          <div className="mb-4 flex h-10 items-center overflow-hidden rounded-[10px] bg-white text-[14px] leading-[18.4px] tracking-[-0.54px] text-[#030303]">
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
      </div>

      {/* Native sticky underlay: no transform or scroll handler required. */}
      <footer className="sticky bottom-0 -z-10 flex h-[90svh] w-full flex-col overflow-hidden">
        <div className="mx-2 flex h-full flex-col justify-between bg-[#030303] px-5 pb-8 pt-10 text-white">
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
                    onClick={(e) => {
                      if (label === "About" && onNavigateAbout) {
                        e.preventDefault()
                        onNavigateAbout()
                      } else if (label === "Contact" && onNavigateContact) {
                        e.preventDefault()
                        onNavigateContact()
                      } else if (label === "Home" && onNavigateHome) {
                        e.preventDefault()
                        onNavigateHome()
                      } else if (label === "Work" && onNavigateProjects) {
                        e.preventDefault()
                        onNavigateProjects()
                      }
                    }}
                    className="group flex min-h-[35px] items-center justify-between gap-3 rounded-[10px] bg-[#f2f2f2] px-2 py-[7px] text-[16px] leading-[19px] tracking-[-0.54px] transition-[background-color,transform] duration-150 active:scale-[0.98] hover:bg-[#e6e6e6] cursor-pointer"
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
              onClick={(e) => {
                e.preventDefault()
                if (lenis) {
                  lenis.scrollTo(0)
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
              }}
              className="order-1 text-right hover:underline sm:order-3 sm:text-right cursor-pointer"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default FooterSection
