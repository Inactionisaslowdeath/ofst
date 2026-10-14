import { useEffect, useRef, useState } from "react"
import type Lenis from "lenis"
import { RevealLine } from "./ui/MotionPrimitives"

export interface ContactSectionProps {
  lenis: Lenis | null
}

export function ContactSection({ lenis }: ContactSectionProps) {
  const [contactStatus, setContactStatus] = useState("")
  const sectionRef = useRef<HTMLElement | null>(null)
  const leftHandRef = useRef<HTMLImageElement | null>(null)
  const rightHandRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const section = sectionRef.current
    const leftHand = leftHandRef.current
    const rightHand = rightHandRef.current
    if (!section || !leftHand || !rightHand) return

    const updateHands = () => {
      if (!section || !leftHand || !rightHand) return
      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight

      const start = windowHeight
      const end = (windowHeight - rect.height) / 2
      const range = start - end

      if (range <= 0) return

      const progress = Math.max(0, Math.min(1, (start - rect.top) / range))
      const START_OFFSET_X = 130

      const leftX = -START_OFFSET_X * (1 - progress)
      const rightX = START_OFFSET_X * (1 - progress)

      leftHand.style.transform = `translate3d(${leftX}%, 0, 0)`
      rightHand.style.transform = `translate3d(${rightX}%, 0, 0)`
    }

    updateHands()

    if (lenis) {
      const handleLenisScroll = () => updateHands()
      lenis.on("scroll", handleLenisScroll)
      return () => {
        lenis.off("scroll", handleLenisScroll)
      }
    } else {
      const handleScroll = () => updateHands()
      window.addEventListener("scroll", handleScroll, { passive: true })
      window.addEventListener("resize", handleScroll)
      return () => {
        window.removeEventListener("scroll", handleScroll)
        window.removeEventListener("resize", handleScroll)
      }
    }
  }, [lenis])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative mb-2 scroll-mt-20 overflow-hidden rounded-[10px] border-[4px] border-[#030303] dark:border-white py-12"
    >
      <img
        ref={leftHandRef}
        src="/assets/788a4.png"
        alt="A hand reaching toward the center"
        className="pointer-events-none absolute left-0 top-3 w-[31%] max-md:hidden will-change-transform [backface-visibility:hidden]"
        style={{ transform: "translate3d(-130%, 0, 0)" }}
      />
      <img
        ref={rightHandRef}
        src="/assets/3400b.png"
        alt="A hand reaching from the other side"
        className="pointer-events-none absolute right-0 top-3 w-[31%] max-md:hidden will-change-transform [backface-visibility:hidden]"
        style={{ transform: "translate3d(130%, 0, 0)" }}
      />
      <div className="relative mx-auto max-w-[500px] text-center">
        <h2 className="text-[32px] leading-[41.6px] tracking-[-0.96px]">
          <RevealLine>Refine Your Vision</RevealLine>
        </h2>
        <p className="mt-3 text-[16px] leading-[18.4px] tracking-[-0.48px]">
          <RevealLine delay={0.05} className="block">
            Wherever you are.
          </RevealLine>
          <RevealLine delay={0.15} className="block">
            Today, tomorrow—whenever.
          </RevealLine>
          <RevealLine delay={0.25} className="block">
            Reach Out.
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
              placeholder="Rayan Solis"
              className="mt-2 h-10 w-full rounded-[10px] bg-[#f2f2f2] px-3 text-[14px] text-[#030303] placeholder:text-[#888888] outline-offset-4"
            />
          </label>
          <label className="block text-[12px]">
            E-mail*
            <input
              required
              name="email"
              type="email"
              placeholder="Hello@gmail.com"
              className="mt-2 h-10 w-full rounded-[10px] bg-[#f2f2f2] px-3 text-[14px] text-[#030303] placeholder:text-[#888888] outline-offset-4"
            />
          </label>
          <label className="block text-[12px]">
            Message*
            <textarea
              required
              name="message"
              placeholder="Your message"
              rows={5}
              className="mt-2 w-full resize-y rounded-[10px] bg-[#f2f2f2] p-3 text-[14px] text-[#030303] placeholder:text-[#888888] outline-offset-4"
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
