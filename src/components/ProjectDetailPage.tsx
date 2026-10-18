import { useEffect, useRef } from "react"
import type Lenis from "lenis"
import StickyNavigation from "./StickyNavigation"
import FooterSection from "./FooterSection"
import type { ProjectItem, ProjectDetailData } from "../data/content"

export interface ProjectDetailPageProps {
  onBack: () => void
  onNavigateHome?: () => void
  onNavigateContact?: () => void
  onNavigateAbout?: () => void
  lenis?: Lenis | null
  project?: ProjectItem | null
}

const DEFAULT_NULL_AI: ProjectDetailData = {
  title: "null.al",
  statement:
    "Stealth AI is a cutting-edge startup focused on developing\nadvanced AI solutions, aiming to differentiate itself from\ntraditional corporate aesthetics.",
  year: "2023",
  client: "Stealth AI",
  website: "nullai.tech",
  websiteUrl: "https://nullai.tech",
  whatIsAbout: [
    "Stealth AI required an identity that rejects traditional corporate",
    "aesthetics while embracing the unknown. We developed a hyper-",
    "minimalist, deconstructed type system, using AI-generated glyphs",
    "that subtly change over time. Invisible elements appear on hover,",
    "mimicking the way AI processes hidden data. This innovative",
    "approach made the brand a case study in speculative design,",
    "featured in several design exhibitions.",
  ],
  heroImage: "/assets/projects/null-ai/hero.png",
  heroAlt: "null.al industrial device",
  cards: [
    { src: "/assets/projects/null-ai/card1.png", alt: "null.al detail 1" },
    { src: "/assets/projects/null-ai/card2.png", alt: "null.al detail 2" },
    { src: "/assets/projects/null-ai/card3.png", alt: "null.al detail 3" },
    { src: "/assets/projects/null-ai/card4.png", alt: "null.al detail 4" },
  ],
}

export default function ProjectDetailPage({
  onBack,
  onNavigateHome,
  onNavigateContact,
  onNavigateAbout,
  lenis,
  project,
}: ProjectDetailPageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const detail = project?.detail ?? DEFAULT_NULL_AI

  useEffect(() => {
    document.body.style.overflow = ""
    if (lenis) {
      lenis.start()
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [lenis])

  return (
    <div
      ref={containerRef}
      className="relative z-0 min-h-screen w-full overflow-x-clip text-[var(--fg)] transition-colors duration-300"
    >
      {/* Universal Sticky Navigation matching Home Page */}
      <StickyNavigation
        onNavigateHome={onNavigateHome ?? onBack}
        onNavigateProjects={onBack}
        onNavigateContact={onNavigateContact}
        onNavigateAbout={onNavigateAbout}
      />

      {/* Main Container targeting the exact W:1920 design specs */}
      <main className="relative z-10 w-full bg-[var(--bg)] transition-colors duration-300">
        <div className="mx-auto w-full max-w-[1920px] px-5 sm:px-10 md:px-[60px] lg:px-[180px] pt-24 sm:pt-28 md:pt-[120px] pb-24 md:pb-[140px]">
          {/* Top Header Section with Back Pill & null.al on left, Metadata & intro on right */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start md:gap-16">
            {/* Left Column: Back button pill + null.ai title */}
            <div className="flex flex-col items-start gap-5">
              <button
                type="button"
                onClick={onBack}
                aria-label="Back"
                className="inline-flex w-[77px] h-[26.41px] items-center justify-center gap-1.5 rounded-[10px] bg-[#f2f2f2] text-[#030303] text-[16px] font-normal leading-none select-none touch-manipulation transition-[transform,background-color] duration-150 active:scale-[0.96] hover:bg-[#e6e6e6] dark:bg-[#18181b] dark:text-[#f4f4f5] dark:hover:bg-[#27272a] cursor-pointer"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                >
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                <span>Back</span>
              </button>

              <h1 className="text-[40px] font-medium leading-[1.1] tracking-tight-display text-[var(--fg)]">
                {detail.title}
              </h1>
            </div>

            {/* Right Column: Project statement + Year / Client / Website */}
            <div className="flex flex-col items-start md:items-start space-y-7 md:max-w-[540px] md:ml-auto">
              <p className="text-[16px] sm:text-[18px] font-normal leading-[1.3] sm:leading-[19.8px] tracking-[-0.54px] text-[var(--fg)] whitespace-normal md:whitespace-pre-line [text-wrap:pretty]">
                {detail.statement}
              </p>

              <div className="space-y-4 pt-1 text-left">
                <div>
                  <span className="block text-[15px] leading-[19.8px] tracking-[-0.54px] text-[#888888]">
                    Year
                  </span>
                  <span className="block text-[18px] leading-[19.8px] tracking-[-0.54px] text-[var(--fg)]">
                    {detail.year}
                  </span>
                </div>
                <div>
                  <span className="block text-[15px] leading-[19.8px] tracking-[-0.54px] text-[#888888]">
                    Client
                  </span>
                  <span className="block text-[18px] leading-[19.8px] tracking-[-0.54px] text-[var(--fg)]">
                    {detail.client}
                  </span>
                </div>
                <div>
                  <span className="block text-[15px] leading-[19.8px] tracking-[-0.54px] text-[#888888]">
                    Website
                  </span>
                  <a
                    href={detail.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-[18px] leading-[19.8px] tracking-[-0.54px] text-[var(--fg)] hover:underline"
                  >
                    {detail.website}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Big Hero Card: W:1560, H:1170 with corner radius of 10 */}
          <div className="mx-auto mt-16 md:mt-[110px] w-full max-w-[1560px]">
            <div className="relative w-full aspect-[1560/1170] overflow-hidden rounded-[10px] bg-[#d9d9d9]">
              <img
                src={detail.heroImage}
                alt={detail.heroAlt}
                width={1560}
                height={1170}
                decoding="async"
                fetchPriority="high"
                className="size-full object-cover"
              />
            </div>
          </div>

          {/* Middle Section: "What is about" (18px, gray) on left, 7-line body text aligned to the right (18px, leading-[19.8px], tracking-[-0.54px]) */}
          <div className="mx-auto mt-14 md:mt-[90px] flex w-full max-w-[1560px] flex-col gap-6 md:flex-row md:items-baseline md:justify-between">
            <div>
              <h2 className="text-[18px] font-normal leading-[19.8px] tracking-[-0.54px] text-[#999999] dark:text-[#a1a1aa]">
                What is about
              </h2>
            </div>
            <div className="w-full md:w-auto md:ml-auto">
              <p className="w-full max-w-[536px] text-left text-[16px] sm:text-[18px] font-normal leading-[1.3] sm:leading-[19.8px] tracking-[-0.54px] text-[var(--fg)] [text-wrap:pretty]">
                {detail.whatIsAbout.map((line, idx) => (
                  <span key={idx}>
                    {line}
                    {idx < detail.whatIsAbout.length - 1 && (
                      <>
                        <span className="inline md:hidden"> </span>
                        <br className="hidden md:inline" />
                      </>
                    )}
                  </span>
                ))}
              </p>
            </div>
          </div>

          {/* Bottom Four Cards: container with identical row and column gap (5px) */}
          <div className="mx-auto mt-16 md:mt-[120px] w-full max-w-[1568px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[5px]">
              {detail.cards.map((card, idx) => (
                <div
                  key={idx}
                  className="w-full aspect-[781.5/568.72] overflow-hidden rounded-[10px] bg-[#d9d9d9]"
                >
                  <img
                    src={card.src}
                    alt={card.alt}
                    width={782}
                    height={569}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover transition-transform duration-300 @media(hover:hover):hover:scale-[1.01]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Studio Footer with Newsletter, marquee ticker, and full Drkst/OFST branding */}
      <FooterSection
        lenis={lenis ?? null}
        onNavigateHome={onNavigateHome}
        onNavigateContact={onNavigateContact}
        onNavigateAbout={onNavigateAbout}
        onNavigateProjects={onBack}
      />

      {/* Viewport top & bottom blur bars */}
      <div aria-hidden="true" className="top-blur-gradient" />
      <div aria-hidden="true" className="bottom-blur-gradient" />
    </div>
  )
}
