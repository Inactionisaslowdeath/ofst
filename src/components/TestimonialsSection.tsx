import { motion } from "framer-motion"
import { PORTRAIT_COLUMNS } from "../data/content"
import { RevealLine } from "./ui/MotionPrimitives"

export function TestimonialsSection() {
  return (
    <section className="py-24">
      <div className="relative mx-auto mb-12 aspect-[820/330] w-full max-w-[820px]">
        <div className="grid grid-cols-9 items-start gap-[1%]">
          {PORTRAIT_COLUMNS.map(({ images, offset }, colIndex) => {
            const delay =
              colIndex === 3 || colIndex === 5
                ? 0
                : colIndex === 1 || colIndex === 4 || colIndex === 7
                  ? 0.05
                  : colIndex === 2 || colIndex === 6
                    ? 0.1
                    : 0.16

            return (
              <motion.div
                key={images[0]}
                initial={{ opacity: 0, y: 80, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{
                  duration: 0.9,
                  delay,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`flex min-w-0 flex-col gap-1 sm:gap-[10px] ${offset}`}
              >
                {images.map((image) => (
                  <img
                    key={image}
                    src={`/assets/${image}`}
                    alt="Creative collaborator"
                    className="aspect-[83/102] w-full rounded-[5px] object-cover"
                  />
                ))}
              </motion.div>
            )
          })}
        </div>
        <h2 className="absolute inset-x-0 top-[82%] sm:top-[85%] text-center text-[clamp(24px,4.5vw,48px)] leading-[1.12] tracking-tight-display font-medium sm:font-normal">
          <RevealLine
            delay={0.28}
            className="inline-block text-gradient-black-to-white"
          >
            Good work. Clear thinking.
          </RevealLine>
        </h2>
      </div>
      <div className="mx-auto grid max-w-[920px] gap-[10px] md:grid-cols-3">
        {[
          [
            "David Kim",
            "Brand Strategist",
            "“Bold. Quiet. Brilliant. Their work speaks without shouting.”",
            "7a40c.png",
          ],
          [
            "Amira Solis",
            "UX Lead at Field",
            "“Working with OFST felt like collaborating with a design lab. Visionary yet grounded.”",
            "e1f8b.png",
          ],
          [
            "Lena Morris",
            "Creative Director",
            "“Minimal, but rich.”",
            "6f409.png",
          ],
        ].map(([name, title, quote, image], index) => (
          <figure key={name} className="flex flex-col gap-[9px]">
            <figcaption
              className={`flex h-[64px] min-h-[64px] max-h-[64px] items-center gap-[14px] overflow-hidden rounded-[5px] bg-[#f2f2f2] p-0 text-[#030303] ${
                name === "Amira Solis" ? "md:order-2" : ""
              }`}
            >
              <div className="h-[64px] w-[64px] shrink-0 overflow-hidden rounded-[5px] bg-neutral-300">
                <img
                  src={`/assets/${image}`}
                  alt={name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="flex flex-col justify-center py-2 pr-3">
                <p className="text-[16px] leading-[19.2px] tracking-[-0.54px] text-[#030303]">
                  <RevealLine delay={0.1 + index * 0.08}>{name}</RevealLine>
                </p>
                <p className="mt-[3px] text-[12px] leading-[14.4px] tracking-[-0.54px] text-[#696969]">
                  <RevealLine delay={0.16 + index * 0.08}>{title}</RevealLine>
                </p>
              </div>
            </figcaption>
            <blockquote className="flex min-h-[100px] items-center justify-center rounded-[5px] bg-[#f2f2f2] p-3 text-center text-[16px] leading-[18.4px] tracking-[-0.54px] text-[#030303]">
              <RevealLine delay={0.22 + index * 0.08}>{quote}</RevealLine>
            </blockquote>
          </figure>
        ))}
      </div>
    </section>
  )
}

export default TestimonialsSection
