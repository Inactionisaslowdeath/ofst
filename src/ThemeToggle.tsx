import { motion } from "framer-motion"
import { useCallback, useSyncExternalStore } from "react"

const subscribeToTheme = (callback: () => void) => {
  if (typeof window === "undefined") return () => {}
  const observer = new MutationObserver(callback)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  })
  return () => observer.disconnect()
}

const getThemeSnapshot = () => {
  if (typeof window === "undefined") return false
  return document.documentElement.classList.contains("dark")
}

const getThemeServerSnapshot = () => false

export type AnimationVariant = "circle" | "rectangle" | "circle-blur" | "polygon" | "gif"
export type AnimationStart = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center" | "top-center" | "bottom-center" | "bottom-up" | "top-down" | "left-right" | "right-left"

interface Animation {
  name: string
  css: string
}

const getClipPathPosition = (position: AnimationStart): string => {
  switch (position) {
    case "top-left":
      return "0% 0%"
    case "top-right":
      return "100% 0%"
    case "bottom-left":
      return "0% 100%"
    case "bottom-right":
      return "100% 100%"
    case "top-center":
    case "top-down":
      return "50% 0%"
    case "bottom-center":
    case "bottom-up":
      return "50% 100%"
    case "left-right":
      return "0% 50%"
    case "right-left":
      return "100% 50%"
    case "center":
      return "50% 50%"
    default: {
      const _exhaustiveCheck: never = position
      return _exhaustiveCheck
    }
  }
}

export const createAnimation = (
  _variant: AnimationVariant = "circle",
  start: AnimationStart = "top-right",
  blur = false,
): Animation => {
  const clipPosition = getClipPathPosition(start)

  return {
    name: `circle-${start}${blur ? "-blur" : ""}`,
    css: `
      ::view-transition-group(root) {
        animation-duration: 0.8s;
        animation-timing-function: var(--expo-out);
      }
            
      ::view-transition-new(root) {
        animation-name: reveal-light-${start}${blur ? "-blur" : ""};
        ${blur ? "filter: blur(2px);" : ""}
      }

      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation: none;
        z-index: -1;
      }
      .dark::view-transition-new(root) {
        animation-name: reveal-dark-${start}${blur ? "-blur" : ""};
        ${blur ? "filter: blur(2px);" : ""}
      }

      @keyframes reveal-dark-${start}${blur ? "-blur" : ""} {
        from {
          clip-path: circle(0% at ${clipPosition});
          ${blur ? "filter: blur(8px);" : ""}
        }
        ${blur ? "50% { filter: blur(4px); }" : ""}
        to {
          clip-path: circle(150.0% at ${clipPosition});
          ${blur ? "filter: blur(0px);" : ""}
        }
      }

      @keyframes reveal-light-${start}${blur ? "-blur" : ""} {
        from {
          clip-path: circle(0% at ${clipPosition});
          ${blur ? "filter: blur(8px);" : ""}
        }
        ${blur ? "50% { filter: blur(4px); }" : ""}
        to {
          clip-path: circle(150.0% at ${clipPosition});
          ${blur ? "filter: blur(0px);" : ""}
        }
      }
    `,
  }
}

export const useThemeToggle = ({
  variant = "circle",
  start = "top-right",
  blur = false,
}: {
  variant?: AnimationVariant
  start?: AnimationStart
  blur?: boolean
  gifUrl?: string
} = {}) => {
  const isDark = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getThemeServerSnapshot,
  )

  const styleId = "theme-transition-styles"

  const updateStyles = useCallback((css: string) => {
    if (typeof window === "undefined") return

    let styleElement = document.getElementById(styleId) as HTMLStyleElement
    if (!styleElement) {
      styleElement = document.createElement("style")
      styleElement.id = styleId
      document.head.appendChild(styleElement)
    }

    styleElement.textContent = css
  }, [])

  const toggleTheme = useCallback(() => {
    const nextIsDark = !document.documentElement.classList.contains("dark")
    const animation = createAnimation(variant, start, blur)
    updateStyles(animation.css)

    const switchTheme = () => {
      if (nextIsDark) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }

    const doc = document as { startViewTransition?: (cb: () => void) => void }
    if (!doc.startViewTransition) {
      switchTheme()
      return
    }

    doc.startViewTransition(switchTheme)
  }, [variant, start, blur, updateStyles])

  return {
    isDark,
    toggleTheme,
  }
}

export const ThemeToggleButton = ({
  className = "",
  variant = "circle",
  start = "top-right",
  blur = false,
}: {
  className?: string
  variant?: AnimationVariant
  start?: AnimationStart
  blur?: boolean
  gifUrl?: string
}) => {
  const { isDark, toggleTheme } = useThemeToggle({
    variant,
    start,
    blur,
  })

  return (
    <button
      type="button"
      className={`size-8 cursor-pointer bg-transparent p-1 transition-[transform,opacity] duration-150 ease-out active:scale-[0.92] flex items-center justify-center border-0 shadow-none text-current hover:opacity-70 ${className}`}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        fill="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        className="size-full"
        animate={{ rotate: isDark ? 40 : 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        {isDark ? (
          /* Classic Half / Crescent Moon */
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            fill="currentColor"
          />
        ) : (
          /* Sun with radiating beams */
          <>
            <circle cx="12" cy="12" r="5" fill="currentColor" />
            <g stroke="currentColor" strokeWidth="2" fill="none">
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </g>
          </>
        )}
      </motion.svg>
    </button>
  )
}

export default ThemeToggleButton
