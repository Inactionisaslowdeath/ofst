import { RevealBlock, AdaptiveRevealParagraph } from "./ui/MotionPrimitives"

export function AboutSection() {
  return (
    <section
      id="about"
      className="grid min-h-[550px] scroll-mt-20 items-center gap-10 py-28 md:min-h-[min(52vw,991px)] md:grid-cols-[1fr_2fr] md:content-center md:items-baseline"
    >
      <RevealBlock
        delay={0.1}
        className="flex h-[30px] items-stretch gap-[3px]"
      >
        <span className="w-8 rounded-[1px] bg-[#030303] dark:bg-white" />
        <span className="w-6 rounded-[1px] bg-[#030303] dark:bg-white" />
        <span className="w-[14px] rounded-[1px] bg-[#030303] dark:bg-white" />
        {Array.from({ length: 17 }, (_, index) => (
          <span
            key={index}
            className="w-[2px] rounded-[1px] bg-[#030303] dark:bg-white"
          />
        ))}
      </RevealBlock>
      <AdaptiveRevealParagraph
        containerClassName="w-full max-w-[1040px] text-[30px] leading-[1.16] tracking-tight-statement [container-type:inline-size] md:text-[40px] md:tracking-tight-display"
        baseDelay={0.05}
        lines={[
          {
            prefix: <span className="text-[#696969]">At OFST,</span>,
            text: "we bring strategy, design, and technology together",
            desktopClassName:
              "block md:text-right md:text-[min(40px,3.75cqw)] md:whitespace-nowrap",
          },
          {
            text: "to make digital experiences clear, distinctive, and useful.",
            desktopClassName:
              "block md:text-left md:text-[min(40px,3.75cqw)] md:whitespace-nowrap",
          },
          {
            text: "We believe the best work makes every detail count.",
            desktopClassName: "block md:text-left md:text-[min(40px,3.75cqw)]",
          },
        ]}
      />
    </section>
  )
}

export default AboutSection
