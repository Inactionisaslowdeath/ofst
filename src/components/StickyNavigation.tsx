import { useEffect, useRef } from "react"
import { ThemeToggleButton } from "../ThemeToggle"

export interface StickyNavigationProps {
  heroRef: React.RefObject<HTMLElement | null>
}

export function StickyNavigation({ heroRef }: StickyNavigationProps) {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const updateCompact = () => {
      const hero = heroRef.current
      if (!hero) return
      nav.dataset.compact = String(hero.getBoundingClientRect().bottom <= 80)
    }

    updateCompact()
    window.addEventListener("scroll", updateCompact, { passive: true })
    window.addEventListener("resize", updateCompact)

    return () => {
      window.removeEventListener("scroll", updateCompact)
      window.removeEventListener("resize", updateCompact)
    }
  }, [heroRef])

  return (
    <nav
      ref={navRef}
      aria-label="Main navigation"
      className="group fixed left-1/2 top-4 sm:top-5 z-40 flex h-[40px] min-h-[40px] w-[min(calc(100%-32px),540px)] -translate-x-1/2 items-center justify-between gap-1.5 sm:gap-2 rounded-[10px] bg-[#f2f2f2]/95 px-2.5 sm:px-3 text-[15px] text-[#030303] backdrop-blur-xl transition-[width,background-color,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none data-[compact=true]:w-[217px] data-[compact=true]:bg-[#030303] data-[compact=true]:text-white dark:data-[compact=true]:bg-white dark:data-[compact=true]:text-[#030303]"
    >
      <a href="#home" aria-label="OFST" className="flex shrink-0 items-center gap-[7px]">
        <img
          src="/assets/93b2b.png"
          className="size-5 shrink-0 object-contain group-data-[compact=true]:invert dark:group-data-[compact=true]:invert-0"
          alt=""
        />
        <img
          src="/OFST-blk-trans.svg"
          alt="OFST"
          className="block h-[18px] sm:h-[20px] w-auto shrink-0 group-data-[compact=true]:hidden dark:group-data-[compact=true]:block"
        />
        <img
          src="/OFST-wt-trans.svg"
          alt="OFST"
          className="hidden h-[18px] sm:h-[20px] w-auto shrink-0 group-data-[compact=true]:block dark:group-data-[compact=true]:hidden"
        />
      </a>
      <div className="flex h-full shrink-0 items-center gap-2 sm:gap-3 md:gap-4">
        {["About", "Projects", "Services", "Process", "Contact"].map((label) => (
          <a
            key={label}
            href={`#${label.toLowerCase()}`}
            className={
              label === "Contact"
                ? "order-2 sm:order-none inline-flex h-[30px] items-center justify-center rounded-[5px] bg-[#d6d6d6]/60 px-2.5 sm:px-3 text-center text-[#030303] text-[13px] sm:text-[14px] leading-none transition-[background-color,color,transform] duration-150 active:scale-[0.96] hover:bg-[#d6d6d6] hover:text-black group-data-[compact=true]:min-w-[81px] group-data-[compact=true]:h-[30px] group-data-[compact=true]:bg-[#f2f2f2] group-data-[compact=true]:text-[#030303]"
                : "text-[#030303] text-[13px] sm:text-[15px] transition-opacity duration-150 active:opacity-70 hover:opacity-50 group-data-[compact=true]:hidden hidden sm:inline"
            }
          >
            {label}
          </a>
        ))}
        <div className="order-1 sm:order-none shrink-0 flex items-center group-data-[compact=true]:hidden">
          <ThemeToggleButton variant="circle" start="top-right" blur={false} />
        </div>
      </div>
    </nav>
  )
}

export default StickyNavigation
