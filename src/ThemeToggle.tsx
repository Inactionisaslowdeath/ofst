import { motion } from "framer-motion"
import { useCallback, useEffect, useState } from "react"

export type AnimationVariant = "circle" | "rectangle" | "circle-blur" | "polygon" | "gif"
export type AnimationStart =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center"
  | "top-center"
  | "bottom-center"
  | "bottom-up"
  | "top-down"
  | "left-right"
  | "right-left"

interface Animation {
  name: string
  css: string
}

const getClipPathPosition = (position: AnimationStart) => {
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
      return "50% 0%"
    case "bottom-center":
      return "50% 100%"
    default:
      return "50% 50%"
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
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false
    return document.documentElement.classList.contains("dark")
  })

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }
    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    return () => observer.disconnect()
  }, [])

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
    const nextIsDark = !isDark
    const animation = createAnimation(variant, start, blur)
    updateStyles(animation.css)

    const switchTheme = () => {
      if (nextIsDark) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
      setIsDark(nextIsDark)
    }

    const doc = document as { startViewTransition?: (cb: () => void) => void }
    if (!doc.startViewTransition) {
      switchTheme()
      return
    }

    doc.startViewTransition(switchTheme)
  }, [variant, start, blur, updateStyles, isDark])

  return {
    isDark,
    setIsDark,
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
      className={`size-8 cursor-pointer bg-transparent p-1 transition-all duration-300 active:scale-95 flex items-center justify-center border-0 shadow-none text-current hover:opacity-70 ${className}`}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        fill="currentColor"
        strokeLinecap="round"
        viewBox="0 0 32 32"
        className="size-full"
      >
        <clipPath id="theme-toggle-clip">
          <motion.path
            animate={{ y: isDark ? 10 : 0, x: isDark ? -12 : 0 }}
            transition={{ ease: "easeInOut", duration: 0.35 }}
            d="M0-5h30a1 1 0 0 0 9 13v24H0Z"
          />
        </clipPath>
        <g clipPath="url(#theme-toggle-clip)">
          <motion.circle
            animate={{ r: isDark ? 10 : 8 }}
            transition={{ ease: "easeInOut", duration: 0.35 }}
            cx="16"
            cy="16"
          />
          <motion.g
            animate={{
              rotate: isDark ? -100 : 0,
              scale: isDark ? 0.5 : 1,
              opacity: isDark ? 0 : 1,
            }}
            transition={{ ease: "easeInOut", duration: 0.35 }}
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M16 5.5v-4" />
            <path d="M16 30.5v-4" />
            <path d="M1.5 16h4" />
            <path d="M26.5 16h4" />
            <path d="m23.4 8.6 2.8-2.8" />
            <path d="m5.7 26.3 2.9-2.9" />
            <path d="m5.8 5.8 2.8 2.8" />
            <path d="m23.4 23.4 2.9 2.9" />
          </motion.g>
        </g>
      </svg>
    </button>
  )
}

export default ThemeToggleButton
