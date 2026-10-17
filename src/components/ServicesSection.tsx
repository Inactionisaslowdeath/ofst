import { SERVICES } from "../data/content"
import { CornerLabel, RevealLine } from "./ui/MotionPrimitives"

export function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-20 mb-10 md:mb-14">
      <div className="flex flex-col justify-between rounded-[5px] bg-[#030303] p-5 text-white dark:bg-white dark:text-[#030303]">
        <div className="flex min-h-[min(65vw,991px)] flex-col justify-between max-md:min-h-[470px]">
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

        {/* 4 service cards wrapped completely inside the extended bottom */}
        <div className="-mx-5 space-y-3 pt-6 pb-2 md:pt-10 md:pb-4">
          {SERVICES.map(({ name, image }, index) => (
            <div
              key={name}
              className="grid w-full grid-cols-2 gap-2"
            >
              <div className="flex aspect-[679/450] items-center justify-center rounded-[9px] bg-[#f2f2f2] text-center text-[14.4px] tracking-[-0.54px] text-[#030303]">
                <RevealLine delay={0.06 * (index % 3)}>{name}</RevealLine>
              </div>
              <div className="flex aspect-[679/450] items-center justify-center rounded-[9px] bg-[#f2f2f2]">
                <img
                  src={`/assets/${image}`}
                  alt={name}
                  className="w-[32%] rounded-[5px] object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
