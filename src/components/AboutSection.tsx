import { AdaptiveRevealParagraph, KineticBarcode } from "./ui/MotionPrimitives"

export function AboutSection() {
  return (
    <section
      id="about"
      className="grid min-h-[400px] scroll-mt-20 items-center gap-8 py-16 sm:gap-10 sm:py-24 md:min-h-[min(52vw,991px)] md:grid-cols-[1fr_2fr] md:content-center md:items-baseline md:py-28"
    >
      <KineticBarcode />
      <AdaptiveRevealParagraph
        containerClassName="w-full max-w-[1040px] text-[30px] leading-[1.16] tracking-tight-statement [container-type:inline-size] md:text-[40px] md:tracking-tight-display"
        lines={[
          {
            prefix: (
              <span className="font-medium text-[#696969] dark:text-[#a1a1aa]">
                At OFST,
              </span>
            ),
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
