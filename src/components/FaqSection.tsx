import { useState } from "react"
import { motion } from "framer-motion"
import { FAQ_QUESTIONS } from "../data/content"
import { RevealLine } from "./ui/MotionPrimitives"

export function FaqSection() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null)

  return (
    <section
      id="faq"
      className="grid gap-x-12 gap-y-[60px] py-14 md:grid-cols-2 md:py-16"
    >
      <h2 className="text-[40px] leading-[46.4px] tracking-tight-display md:col-span-2">
        <div className="block">
          <RevealLine className="inline-block text-gradient-black-to-white">
            Questions
          </RevealLine>
        </div>
        <div className="block">
          <RevealLine
            delay={0.1}
            className="inline-block text-gradient-gray-to-white"
          >
            Clear Answers.
          </RevealLine>
        </div>
      </h2>
      <div>
        {FAQ_QUESTIONS.map(({ question, answer }, index) => {
          const isOpen = openQuestion === index
          return (
            <div key={question} className="border-b border-[#f2f2f2] py-[19px]">
              <button
                type="button"
                onClick={() => setOpenQuestion(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full cursor-pointer list-none items-center justify-between gap-5 text-left text-[16px] tracking-[-0.54px] text-[#030303] dark:text-white"
              >
                <span>{question}</span>
                <motion.img
                  src="/assets/888bd.svg"
                  alt=""
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="shrink-0 transition-transform"
                />
              </button>
              {/* Composite-friendly grid-template-rows transition replacing layout-thrashing height:auto */}
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="max-w-[540px] pt-4 text-[14px] leading-6 text-[#696969] dark:text-[#a1a1aa]">
                    {answer}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex flex-col items-center text-center md:-translate-y-1">
        <div className="text-[40px] leading-[46.4px] tracking-tight-display flex flex-col items-center">
          <RevealLine className="block">
            <span className="inline-block md:inline text-gradient-black-to-white pr-1">
              Have a project&nbsp;
            </span>
            <span className="inline-block md:inline text-gradient-black-to-white pr-2">
              in mind?
            </span>
          </RevealLine>
          <RevealLine
            delay={0.1}
            className="block text-gradient-black-to-white pr-2"
          >
            Tell us about it.
          </RevealLine>
        </div>
        <a
          href="mailto:hello@OFST.com"
          className="mt-6 inline-block rounded-[10px] bg-[#f2f2f2] px-3 py-3 text-[20px] leading-[20px] tracking-[-0.54px] text-[#696969] transition-[background-color,transform] duration-150 active:scale-[0.97] hover:bg-[#e6e6e6]"
        >
          hello@OFST.com
        </a>
      </div>
    </section>
  )
}

export default FaqSection
