import { Counter, RevealLine } from "./ui/MotionPrimitives"

export function MetricsSection() {
  return (
    <section className="py-16 md:py-24">
      <h2 className="mb-14 text-center text-[30px] leading-[1.16] tracking-[-1.5px] md:text-[40px] md:leading-[46.4px] md:tracking-[-2px]">
        <RevealLine>Why OFST and not any other design studio?</RevealLine>
      </h2>
      <div className="mx-auto grid max-w-[1480px] gap-5 xl:grid-cols-[1.55fr_1fr]">
        <div className="grid min-w-0 grid-cols-2 content-start gap-5">
          <img
            src="/assets/6fc31.png"
            alt="A sculptural monochrome studio object"
            className="aspect-[434/340] w-full rounded-[10px] object-cover"
          />
          <div className="relative flex aspect-[434/340] flex-col items-center overflow-hidden rounded-[10px] border border-[#f2f2f2] bg-white text-[clamp(10px,1.1vw,16px)] text-[#030303]">
            <div className="flex flex-col items-center gap-[10px] py-2">
              {[
                ["Emerging", "07", "bg-[#ed8500]"],
                ["Resolved", "11", "bg-[#32d900]"],
                ["Shadows", "09", "bg-[#f00020]"],
                ["Untouched", "12", "bg-[#696969]"],
                ["In Motion", "15", "bg-[#0080ff]"],
                ["Emerging", "07", "bg-[#ed8500]"],
                ["Resolved", "11", "bg-[#32d900]"],
              ].map(([label, number, color], index) => (
                <div
                  key={`${label}-${index}`}
                  className="flex shrink-0 items-center gap-2 rounded-[12px] bg-white px-3 py-[5px] text-[#030303] shadow-[0_3px_20px_0_rgba(0,0,0,0.04)]"
                >
                  <span
                    className={`size-[7px] shrink-0 rounded-full ${color}`}
                  />
                  <span className="whitespace-nowrap text-[#030303]">
                    {label}
                  </span>
                  <span className="flex size-[30px] items-center justify-center rounded-[10px] bg-[#f2f2f2] text-[12px] text-[#030303]">
                    {number}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-2 flex aspect-auto sm:aspect-[888/530] min-h-0 w-full max-w-full flex-col items-center justify-center gap-6 sm:gap-9 rounded-[10px] bg-[#f2f2f2] p-4 sm:p-6 text-[#030303] md:gap-[clamp(20px,3vw,45px)] overflow-hidden">
            <h3 className="text-center text-[24px] sm:text-[32px] leading-tight sm:leading-[41.6px] tracking-[-0.96px] text-[#030303]">
              <RevealLine className="block text-[#030303]">
                Engagement
              </RevealLine>
              <RevealLine delay={0.1} className="block text-[#696969]">
                Over Time
              </RevealLine>
            </h3>
            <div className="w-full max-w-[315px] px-2 sm:px-0">
              <div
                role="img"
                aria-label="Engagement rises steadily from February to June"
                className="flex h-[110px] sm:h-[155px] items-end justify-between gap-[2px] sm:gap-1"
              >
                {[
                  "h-[12%]",
                  "h-[14%]",
                  "h-[16%]",
                  "h-[18%]",
                  "h-[27%]",
                  "h-[46%]",
                  "h-[48%]",
                  "h-[55%]",
                  "h-[63%]",
                  "h-[62%]",
                  "h-[61%]",
                  "h-[61%]",
                  "h-[62%]",
                  "h-[64%]",
                  "h-[69%]",
                  "h-[69%]",
                  "h-[79%]",
                  "h-[76%]",
                  "h-[76%]",
                  "h-[82%]",
                  "h-[82%]",
                  "h-[87%]",
                  "h-[91%]",
                  "h-[96%]",
                  "h-[96%]",
                  "h-full",
                ].map((height, index) => (
                  <div
                    key={index}
                    className={`w-[2px] shrink-0 bg-[#929292] ${height}`}
                  />
                ))}
              </div>
              <div className="mt-4 flex justify-between text-[10px] text-[#696969]">
                {["Feb", "Mar", "Apr", "May", "Jun"].map((month) => (
                  <span key={month}>{month}</span>
                ))}
              </div>
            </div>
            <div className="flex w-full max-w-[270px] justify-between gap-8 text-[16px] text-[#030303]">
              {[
                { label: "All Time", value: 900 },
                { label: "This Month", value: 300 },
              ].map(({ label, value }, index) => (
                <div key={label}>
                  <p className="text-[#030303]">
                    <RevealLine delay={0.08 * index}>{label}</RevealLine>
                  </p>
                  <p className="mt-2 text-[32px] leading-[41.6px] tracking-[-0.96px] text-[#030303]">
                    <Counter target={value} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex min-w-0 flex-col gap-5">
          <div className="flex aspect-[572/260] items-center justify-center rounded-[10px] border border-[#f2f2f2] bg-white">
            <div className="flex items-center gap-3 rounded-[12px] bg-[#f2f2f2] px-5 py-3 text-[16px] text-[#030303]">
              <img src="/assets/a9f8b.svg" alt="" />
              <RevealLine>Delivering</RevealLine>
            </div>
          </div>
          <img
            src="/assets/ad136.png"
            alt="Minimal sculptural portrait"
            className="aspect-[572/509] w-full rounded-[10px] object-cover"
          />
          <div className="flex min-h-[82px] flex-1 items-center gap-2 rounded-[10px] bg-[#f2f2f2] px-5 py-5 text-[#030303]">
            <div className="flex shrink-0 -space-x-2">
              {["3afa8.png", "8f3c7.png", "52487.png", "5560b.png"].map(
                (image) => (
                  <img
                    key={image}
                    src={`/assets/${image}`}
                    alt="Client"
                    className="size-8 rounded-full border-2 border-white object-cover"
                  />
                ),
              )}
            </div>
            <p className="text-[14px] tracking-[-0.42px] text-[#030303] lg:text-[16px]">
              <Counter target={100} suffix="+ " />
              <RevealLine delay={0.1}>Satisfied Clients</RevealLine>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MetricsSection
