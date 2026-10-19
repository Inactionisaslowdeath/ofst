import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type Lenis from "lenis"
import { RevealLine } from "./ui/MotionPrimitives"

gsap.registerPlugin(ScrollTrigger)

export interface ContactSectionProps {
  lenis?: Lenis | null
  initialConverged?: boolean
}

export function ContactSection({
  lenis,
  initialConverged,
}: ContactSectionProps) {
  const [contactStatus, setContactStatus] = useState("")
  const sectionRef = useRef<HTMLElement | null>(null)
  const leftHandRef = useRef<HTMLImageElement | null>(null)
  const rightHandRef = useRef<HTMLImageElement | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const headingRef = useRef<HTMLHeadingElement | null>(null)

  useEffect(() => {
    const isJSDOM =
      typeof navigator !== "undefined" &&
      /jsdom/i.test(navigator.userAgent || "")
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    const section = sectionRef.current
    const leftHand = leftHandRef.current
    const rightHand = rightHandRef.current
    const card = cardRef.current
    const heading = headingRef.current
    if (!section || !leftHand || !rightHand || !card) return

    // On dedicated contact page, reduced motion, or test environments: static convergence
    if (initialConverged || reducedMotion || isJSDOM) {
      gsap.set(leftHand, { xPercent: 0 })
      gsap.set(rightHand, { xPercent: 0 })
      return
    }

    const mm = gsap.matchMedia(sectionRef)

    // Desktop only (>= 768px): Kinematically Pinned Reaching Hands
    // Section pins briefly when centered in the viewport.
    // Hands smoothly scrub inward from opposite sides.
    // On mobile (< 768px), hands are hidden and no pinning occurs.
    mm.add("(min-width: 768px)", () => {
      gsap.set(leftHand, { xPercent: -100 })
      gsap.set(rightHand, { xPercent: 100 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          pinSpacing: true,
          anticipatePin: 0,
          start: "center center",
          end: "+=500",
          scrub: 0.6,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
        },
      })

      // Bilateral hands scrub smoothly inward toward center
      tl.fromTo(
        leftHand,
        { xPercent: -100 },
        { xPercent: 0, ease: "power1.out", duration: 1 },
        0,
      )
      tl.fromTo(
        rightHand,
        { xPercent: 100 },
        { xPercent: 0, ease: "power1.out", duration: 1 },
        0,
      )
    })

    return () => mm.revert()
  }, [initialConverged])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative mb-0 scroll-mt-20 overflow-hidden rounded-[10px] border-[4px] border-[#030303] dark:border-white py-12"
    >
      <img
        ref={leftHandRef}
        src="/assets/788a4.png"
        alt="A hand reaching toward the center"
        className="pointer-events-none absolute left-0 top-3 w-[31%] hidden md:block will-change-transform [backface-visibility:hidden]"
      />
      <img
        ref={rightHandRef}
        src="/assets/3400b.png"
        alt="A hand reaching from the other side"
        className="pointer-events-none absolute right-0 top-3 w-[31%] hidden md:block will-change-transform [backface-visibility:hidden]"
      />
      <div
        ref={cardRef}
        className="relative z-10 mx-auto max-w-[500px] text-center will-change-transform"
      >
        <h2
          ref={headingRef}
          className="text-[32px] leading-[41.6px] tracking-tight-statement"
        >
          <RevealLine className="inline-block text-gradient-black-to-white">
            Let's build with intent.
          </RevealLine>
        </h2>
        <p className="mt-3 text-[16px] leading-[18.4px] tracking-[-0.54px]">
          <RevealLine delay={0.05} className="block">
            Tell us what you want to make better.
          </RevealLine>
          <RevealLine delay={0.15} className="block">
            We’ll start with a thoughtful conversation.
          </RevealLine>
        </p>
        <form
          className="space-y-5 p-5 text-left"
          onSubmit={(event) => {
            event.preventDefault()
            const values = new FormData(event.currentTarget)
            window.location.href = `mailto:hello@OFST.com?subject=${encodeURIComponent(
              `Project inquiry from ${values.get("name")}`,
            )}&body=${encodeURIComponent(
              `${values.get("message")}\n\nReply to: ${values.get("email")}`,
            )}`
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
              placeholder="Your name"
              className="mt-2 h-10 w-full rounded-[10px] bg-[#f2f2f2] px-3 text-[16px] md:text-[14px] text-[#030303] placeholder:text-[#888888] outline-offset-4"
            />
          </label>
          <label className="block text-[12px]">
            E-mail*
            <input
              required
              name="email"
              type="email"
              placeholder="you@company.com"
              className="mt-2 h-10 w-full rounded-[10px] bg-[#f2f2f2] px-3 text-[16px] md:text-[14px] text-[#030303] placeholder:text-[#888888] outline-offset-4"
            />
          </label>
          <label className="block text-[12px]">
            Message*
            <textarea
              required
              name="message"
              placeholder="Tell us what you are building, what is not working yet, and what you would like to achieve."
              rows={5}
              className="mt-2 w-full resize-y rounded-[10px] bg-[#f2f2f2] p-3 text-[16px] md:text-[14px] text-[#030303] placeholder:text-[#888888] outline-offset-4"
            />
          </label>
          <button
            type="submit"
            className="w-full cursor-pointer rounded-[10px] bg-[#030303] py-3 text-[14px] text-white transition-[transform,background-color] duration-150 active:scale-[0.98] hover:bg-[#333] dark:bg-white dark:text-[#030303] dark:hover:bg-[#e6e6e6]"
          >
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
  )
}

export default ContactSection
