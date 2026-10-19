import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggleButton } from "../ThemeToggle"
import { useScrollLock } from "../hooks/useScrollLock"

export interface StickyNavigationProps {
  heroRef?: React.RefObject<HTMLElement | null>
  onNavigateProjects?: () => void
  onNavigateHome?: () => void
  onNavigateContact?: () => void
  onNavigateAbout?: () => void
}

export function StickyNavigation({
  heroRef,
  onNavigateProjects,
  onNavigateHome,
  onNavigateContact,
  onNavigateAbout,
}: StickyNavigationProps) {
  const navRef = useRef<HTMLElement>(null)
  const [isCompact, setIsCompact] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const updateCompact = () => {
      const hero = heroRef?.current
      const compact = hero
        ? hero.getBoundingClientRect().bottom <= 80
        : window.scrollY > 80
      nav.dataset.compact = String(compact)
      setIsCompact(compact)
      if (compact) {
        setIsMobileMenuOpen(false)
      }
    }

    updateCompact()
    window.addEventListener("scroll", updateCompact, { passive: true })
    window.addEventListener("resize", updateCompact)

    return () => {
      window.removeEventListener("scroll", updateCompact)
      window.removeEventListener("resize", updateCompact)
    }
  }, [heroRef])

  // Prevent background scrolling when mobile menu is open using reference-counted scroll lock
  useScrollLock(isMobileMenuOpen)

  const handleMobileNavClick = (callback?: () => void) => {
    setIsMobileMenuOpen(false)
    if (callback) {
      callback()
    }
  }

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className="group fixed left-1/2 top-[calc(env(safe-area-inset-top,0px)+1rem)] sm:top-5 z-50 flex h-[40px] min-h-[40px] w-[min(calc(100%-32px),540px)] -translate-x-1/2 items-center justify-between gap-1.5 sm:gap-2 rounded-[10px] bg-[#f2f2f2] dark:bg-[#18181b] backdrop-blur-xl px-2.5 sm:px-3 text-[15px] text-[#030303] dark:text-[#f4f4f5] transition-[background-color,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] [contain:layout_paint] motion-reduce:transition-none data-[compact=true]:w-[217px] data-[compact=true]:bg-[#030303] data-[compact=true]:text-white dark:data-[compact=true]:bg-white dark:data-[compact=true]:text-[#030303]"
      >
        <a
          href="#home"
          aria-label="OFST home"
          onClick={(e) => {
            if (onNavigateHome) {
              e.preventDefault()
              handleMobileNavClick(onNavigateHome)
            } else {
              handleMobileNavClick()
            }
          }}
          className="flex shrink-0 items-center gap-[7px] cursor-pointer"
        >
          <img
            src="/assets/93b2b.png"
            className="size-5 shrink-0 object-contain group-data-[compact=true]:invert dark:invert dark:group-data-[compact=true]:invert-0"
            alt=""
          />
          {/* Black OFST wordmark: shown in light normal mode, or dark compact mode (where pill is white) */}
          <img
            src="/OFST-blk-trans.svg"
            alt="OFST"
            className="block h-[18px] sm:h-[20px] w-auto shrink-0 dark:hidden group-data-[compact=true]:hidden dark:group-data-[compact=true]:block"
          />
          {/* White OFST wordmark: shown in dark normal mode, or light compact mode (where pill is black) */}
          <img
            src="/OFST-wt-trans.svg"
            alt="OFST"
            className="hidden h-[18px] sm:h-[20px] w-auto shrink-0 dark:block group-data-[compact=true]:block dark:group-data-[compact=true]:hidden"
          />
        </a>

        {/* Desktop Links + Actions */}
        <div className="flex h-full shrink-0 items-center gap-2 sm:gap-3 md:gap-4">
          {["About", "Projects", "Services", "Process", "Contact"].map(
            (label) => {
              if (label === "About" && onNavigateAbout) {
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={onNavigateAbout}
                    className="text-[#030303] dark:text-[#f4f4f5] text-[13px] sm:text-[15px] transition-opacity duration-150 active:opacity-70 hover:opacity-50 group-data-[compact=true]:hidden hidden sm:inline cursor-pointer"
                  >
                    {label}
                  </button>
                )
              }
              if (label === "Projects" && onNavigateProjects) {
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={onNavigateProjects}
                    className="text-[#030303] dark:text-[#f4f4f5] text-[13px] sm:text-[15px] transition-opacity duration-150 active:opacity-70 hover:opacity-50 group-data-[compact=true]:hidden hidden sm:inline cursor-pointer"
                  >
                    {label}
                  </button>
                )
              }
              if (label === "Contact" && onNavigateContact) {
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={onNavigateContact}
                    className="order-2 sm:order-none inline-flex h-[30px] items-center justify-center rounded-[5px] bg-[#d6d6d6]/60 px-2.5 sm:px-3 text-center text-[#030303] text-[13px] sm:text-[14px] font-medium leading-none transition-[background-color,color,transform] duration-150 active:scale-[0.96] hover:bg-[#d6d6d6] hover:text-black group-data-[compact=true]:min-w-[81px] group-data-[compact=true]:h-[30px] group-data-[compact=true]:bg-[#f2f2f2] group-data-[compact=true]:text-[#030303] max-sm:group-data-[compact=false]:hidden cursor-pointer"
                  >
                    {label}
                  </button>
                )
              }
              return (
                <a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  onClick={() => {
                    if (onNavigateHome) {
                      onNavigateHome()
                    }
                  }}
                  className={
                    label === "Contact"
                      ? "order-2 sm:order-none inline-flex h-[30px] items-center justify-center rounded-[5px] bg-[#d6d6d6]/60 px-2.5 sm:px-3 text-center text-[#030303] text-[13px] sm:text-[14px] font-medium leading-none transition-[background-color,color,transform] duration-150 active:scale-[0.96] hover:bg-[#d6d6d6] hover:text-black group-data-[compact=true]:min-w-[81px] group-data-[compact=true]:h-[30px] group-data-[compact=true]:bg-[#f2f2f2] group-data-[compact=true]:text-[#030303] max-sm:group-data-[compact=false]:hidden"
                      : "text-[#030303] dark:text-[#f4f4f5] text-[13px] sm:text-[15px] transition-opacity duration-150 active:opacity-70 hover:opacity-50 group-data-[compact=true]:hidden hidden sm:inline"
                  }
                >
                  {label}
                </a>
              )
            },
          )}

          {/* Theme Toggle Button - desktop in nav pill, hidden on mobile nav pill */}
          <div className="order-1 sm:order-none shrink-0 hidden sm:flex items-center group-data-[compact=true]:hidden">
            <ThemeToggleButton
              variant="circle"
              start="top-right"
              blur={false}
            />
          </div>

          {/* Mobile-only Two-Line Hamburger Menu Toggle on far right (Only visible when not compact) */}
          {!isCompact && (
            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="order-2 flex sm:hidden relative h-8 w-[58px] items-center justify-end text-[#030303] dark:text-[#f4f4f5] cursor-pointer touch-manipulation"
            >
              <div className="relative w-[90px] h-[11px] flex flex-col justify-between items-center pointer-events-none">
                <motion.span
                  animate={
                    isMobileMenuOpen ? { rotate: 8, y: 4 } : { rotate: 0, y: 0 }
                  }
                  transition={{
                    type: "tween",
                    duration: 0.16,
                    ease: "easeOut",
                  }}
                  className="w-full h-[2px] bg-[#030303] dark:bg-[#f4f4f5] rounded-none origin-center"
                />
                <motion.span
                  animate={
                    isMobileMenuOpen
                      ? { rotate: -8, y: -4 }
                      : { rotate: 0, y: 0 }
                  }
                  transition={{
                    type: "tween",
                    duration: 0.16,
                    ease: "easeOut",
                  }}
                  className="w-full h-[2px] bg-[#030303] dark:bg-[#f4f4f5] rounded-none origin-center"
                />
              </div>
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Backdrop & Slide-Down Menu Sheet (Only active when NOT compact) */}
      <AnimatePresence>
        {!isCompact && isMobileMenuOpen && (
          <>
            {/* Soft dim backdrop behind the dropdown */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm sm:hidden"
            />

            {/* Slide-Down Container: starts exactly where the nav bar starts, with matching top rounded-[10px] corners */}
            <div className="fixed left-1/2 top-[calc(env(safe-area-inset-top,0px)+1rem)] sm:top-5 z-40 w-[min(calc(100%-32px),540px)] -translate-x-1/2 overflow-hidden rounded-[10px] pointer-events-none sm:hidden">
              <motion.div
                initial={{ transform: "translateY(-100%)" }}
                animate={{ transform: "translateY(0%)" }}
                exit={{ transform: "translateY(-100%)" }}
                transition={{
                  duration: 0.42,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="pointer-events-auto flex min-h-[75dvh] max-h-[82dvh] flex-col justify-between overflow-y-auto overscroll-contain rounded-[10px] bg-[#f2f2f2] text-[#030303] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.22)] backdrop-blur-xl px-6 pb-8 pt-4 dark:bg-[#18181b] dark:text-white"
              >
                {/* Top bar inside menu: Theme Toggle positioned at top-right, lowered by 15px */}
                <div className="flex w-full items-center justify-end pr-2 pt-[46px] h-[48px]">
                  <ThemeToggleButton
                    variant="circle"
                    start="top-right"
                    blur={false}
                  />
                </div>

                {/* Primary Nav Links revealing after sheet slides with staggered slide-down blur-to-unblur */}
                <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center py-4">
                  {[
                    { label: "Home", href: "#home", action: onNavigateHome },
                    {
                      label: "About",
                      isButton: Boolean(onNavigateAbout),
                      action:
                        onNavigateAbout ??
                        (onNavigateHome
                          ? () => {
                              onNavigateHome()
                              setTimeout(() => {
                                window.location.hash = "#about"
                              }, 50)
                            }
                          : undefined),
                    },
                    {
                      label: "Projects",
                      isButton: Boolean(onNavigateProjects),
                      action: onNavigateProjects,
                    },
                    {
                      label: "Services",
                      href: "#services",
                      action: onNavigateHome
                        ? () => {
                            onNavigateHome()
                            setTimeout(() => {
                              window.location.hash = "#services"
                            }, 50)
                          }
                        : undefined,
                    },
                    {
                      label: "Process",
                      href: "#process",
                      action: onNavigateHome
                        ? () => {
                            onNavigateHome()
                            setTimeout(() => {
                              window.location.hash = "#process"
                            }, 50)
                          }
                        : undefined,
                    },
                    {
                      label: "Contact",
                      isButton: Boolean(onNavigateContact),
                      action:
                        onNavigateContact ??
                        (onNavigateHome
                          ? () => {
                              onNavigateHome()
                              setTimeout(() => {
                                window.location.hash = "#contact"
                              }, 50)
                            }
                          : undefined),
                    },
                  ].map((item, index) => {
                    const linkDelay = 0.28 + index * 0.07
                    const className =
                      "text-[30px] font-medium tracking-tight-statement transition-transform active:scale-95 inline-block will-change-[transform,opacity,filter]"

                    return (
                      <motion.div
                        key={item.label}
                        initial={{
                          opacity: 0,
                          transform: "translateY(-18px)",
                          filter: "blur(10px)",
                        }}
                        animate={{
                          opacity: 1,
                          transform: "translateY(0px)",
                          filter: "blur(0px)",
                        }}
                        exit={{
                          opacity: 0,
                          transform: "translateY(-10px)",
                          filter: "blur(6px)",
                        }}
                        transition={{
                          duration: 0.45,
                          delay: linkDelay,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        {item.isButton || item.action ? (
                          <button
                            type="button"
                            onClick={() => handleMobileNavClick(item.action)}
                            className={`${className} cursor-pointer`}
                          >
                            {item.label}
                          </button>
                        ) : (
                          <a
                            href={item.href}
                            onClick={() => handleMobileNavClick()}
                            className={className}
                          >
                            {item.label}
                          </a>
                        )}
                      </motion.div>
                    )
                  })}
                </div>

                {/* Bottom Contact / Legal details updated to OFST */}
                <motion.div
                  initial={{
                    opacity: 0,
                    transform: "translateY(-12px)",
                    filter: "blur(8px)",
                  }}
                  animate={{
                    opacity: 1,
                    transform: "translateY(0px)",
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    transform: "translateY(-6px)",
                    filter: "blur(4px)",
                  }}
                  transition={{
                    duration: 0.45,
                    delay: 0.72,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="mt-4 flex flex-col items-center gap-4 border-t border-black/5 dark:border-white/10 pt-5 text-center text-[14px] tracking-[-0.54px]"
                >
                  <div className="space-y-1">
                    <a
                      href="mailto:hello@OFST.com"
                      className="inline-flex items-center gap-1.5 font-medium underline underline-offset-4 text-[#030303] dark:text-white hover:opacity-80"
                    >
                      <span className="inline-flex size-4 items-center justify-center rounded-full bg-[#030303] dark:bg-white text-white dark:text-[#030303] text-[10px] leading-none">
                        +
                      </span>
                      hello@OFST.com
                    </a>
                  </div>

                  <div className="space-y-0.5 text-[12px] text-[#696969] dark:text-[#a1a1aa]">
                    <a
                      href="#privacy"
                      onClick={() => handleMobileNavClick()}
                      className="block hover:underline"
                    >
                      Privacy Policy
                    </a>
                    <a
                      href="#terms"
                      onClick={() => handleMobileNavClick()}
                      className="block hover:underline"
                    >
                      Terms of Service
                    </a>
                  </div>

                  <p className="text-[11px] text-[#888888] dark:text-[#71717a]">
                    OFST® 2026. All rights reserved
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default StickyNavigation
