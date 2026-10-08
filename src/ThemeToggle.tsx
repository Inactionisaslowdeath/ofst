import { motion } from "framer-motion"
import { GripHorizontal } from "lucide-react"
import React, { useCallback, useEffect, useState } from "react"

export type AnimationVariant =
  | "circle"
  | "rectangle"
  | "gif"
  | "polygon"
  | "circle-blur"

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

const getPositionCoords = (position: AnimationStart) => {
  switch (position) {
    case "top-left":
      return { cx: "0", cy: "0" }
    case "top-right":
      return { cx: "40", cy: "0" }
    case "bottom-left":
      return { cx: "0", cy: "40" }
    case "bottom-right":
      return { cx: "40", cy: "40" }
    case "top-center":
      return { cx: "20", cy: "0" }
    case "bottom-center":
      return { cx: "20", cy: "40" }
    case "bottom-up":
    case "top-down":
    case "left-right":
    case "right-left":
      return { cx: "20", cy: "20" }
  }
}

const generateSVG = (variant: AnimationVariant, start: AnimationStart) => {
  if (variant === "circle-blur") {
    if (start === "center") {
      return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="20" cy="20" r="18" fill="white" filter="url(%23blur)"/></svg>`
    }
    const positionCoords = getPositionCoords(start)
    if (!positionCoords) {
      throw new Error(`Invalid start position: ${start}`)
    }
    const { cx, cy } = positionCoords
    return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="${cx}" cy="${cy}" r="18" fill="white" filter="url(%23blur)"/></svg>`
  }

  if (start === "center") return ""

  if (variant === "rectangle") return ""

  const positionCoords = getPositionCoords(start)
  if (!positionCoords) {
    throw new Error(`Invalid start position: ${start}`)
  }
  const { cx, cy } = positionCoords

  if (variant === "circle") {
    return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="${cx}" cy="${cy}" r="20" fill="white"/></svg>`
  }

  return ""
}

const getTransformOrigin = (start: AnimationStart) => {
  switch (start) {
    case "top-left":
      return "top left"
    case "top-right":
      return "top right"
    case "bottom-left":
      return "bottom left"
    case "bottom-right":
      return "bottom right"
    case "top-center":
      return "top center"
    case "bottom-center":
      return "bottom center"
    case "bottom-up":
    case "top-down":
    case "left-right":
    case "right-left":
      return "center"
  }
}

export const createAnimation = (
  variant: AnimationVariant,
  start: AnimationStart = "center",
  blur = false,
  url?: string,
): Animation => {
  const svg = generateSVG(variant, start)
  const transformOrigin = getTransformOrigin(start)

  if (variant === "rectangle") {
    const getClipPath = (direction: AnimationStart) => {
      switch (direction) {
        case "bottom-up":
          return {
            from: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }
        case "top-down":
          return {
            from: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }
        case "left-right":
          return {
            from: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }
        case "right-left":
          return {
            from: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }
        case "top-left":
          return {
            from: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }
        case "top-right":
          return {
            from: "polygon(100% 0%, 100% 0%, 100% 0%, 100% 0%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }
        case "bottom-left":
          return {
            from: "polygon(0% 100%, 0% 100%, 0% 100%, 0% 100%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }
        case "bottom-right":
          return {
            from: "polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }
        default:
          return {
            from: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }
      }
    }

    const clipPath = getClipPath(start)

    return {
      name: `${variant}-${start}${blur ? "-blur" : ""}`,
      css: `
       ::view-transition-group(root) {
        animation-duration: 0.7s;
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
          clip-path: ${clipPath.from};
          ${blur ? "filter: blur(8px);" : ""}
        }
        ${blur ? "50% { filter: blur(4px); }" : ""}
        to {
          clip-path: ${clipPath.to};
          ${blur ? "filter: blur(0px);" : ""}
        }
      }

      @keyframes reveal-light-${start}${blur ? "-blur" : ""} {
        from {
          clip-path: ${clipPath.from};
          ${blur ? "filter: blur(8px);" : ""}
        }
        ${blur ? "50% { filter: blur(4px); }" : ""}
        to {
          clip-path: ${clipPath.to};
          ${blur ? "filter: blur(0px);" : ""}
        }
      }
      `,
    }
  }

  if (variant === "circle" && start === "center") {
    return {
      name: `${variant}-${start}${blur ? "-blur" : ""}`,
      css: `
       ::view-transition-group(root) {
        animation-duration: 0.7s;
        animation-timing-function: var(--expo-out);
      }
            
      ::view-transition-new(root) {
        animation-name: reveal-light${blur ? "-blur" : ""};
        ${blur ? "filter: blur(2px);" : ""}
      }

      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation: none;
        z-index: -1;
      }
      .dark::view-transition-new(root) {
        animation-name: reveal-dark${blur ? "-blur" : ""};
        ${blur ? "filter: blur(2px);" : ""}
      }

      @keyframes reveal-dark${blur ? "-blur" : ""} {
        from {
          clip-path: circle(0% at 50% 50%);
          ${blur ? "filter: blur(8px);" : ""}
        }
        ${blur ? "50% { filter: blur(4px); }" : ""}
        to {
          clip-path: circle(100.0% at 50% 50%);
          ${blur ? "filter: blur(0px);" : ""}
        }
      }

      @keyframes reveal-light${blur ? "-blur" : ""} {
        from {
           clip-path: circle(0% at 50% 50%);
           ${blur ? "filter: blur(8px);" : ""}
        }
        ${blur ? "50% { filter: blur(4px); }" : ""}
        to {
          clip-path: circle(100.0% at 50% 50%);
          ${blur ? "filter: blur(0px);" : ""}
        }
      }
      `,
    }
  }

  if (variant === "gif") {
    return {
      name: `${variant}-${start}`,
      css: `
      ::view-transition-group(root) {
  animation-timing-function: var(--expo-in);
}

::view-transition-new(root) {
  mask: url('${url}') center / 0 no-repeat;
  animation: scale 3s;
}

::view-transition-old(root),
.dark::view-transition-old(root) {
  animation: scale 3s;
}

@keyframes scale {
  0% {
    mask-size: 0;
  }
  10% {
    mask-size: 50vmax;
  }
  90% {
    mask-size: 50vmax;
  }
  100% {
    mask-size: 2000vmax;
  }
}`,
    }
  }

  if (variant === "circle-blur") {
    if (start === "center") {
      return {
        name: `${variant}-${start}`,
        css: `
        ::view-transition-group(root) {
          animation-timing-function: var(--expo-out);
        }

        ::view-transition-new(root) {
          mask: url('${svg}') center / 0 no-repeat;
          mask-origin: content-box;
          animation: scale 1s;
          transform-origin: center;
        }

        ::view-transition-old(root),
        .dark::view-transition-old(root) {
          animation: scale 1s;
          transform-origin: center;
          z-index: -1;
        }

        @keyframes scale {
          to {
            mask-size: 350vmax;
          }
        }
        `,
      }
    }

    return {
      name: `${variant}-${start}`,
      css: `
      ::view-transition-group(root) {
        animation-timing-function: var(--expo-out);
      }

      ::view-transition-new(root) {
        mask: url('${svg}') ${start.replace("-", " ")} / 0 no-repeat;
        mask-origin: content-box;
        animation: scale 1s;
        transform-origin: ${transformOrigin};
      }

      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation: scale 1s;
        transform-origin: ${transformOrigin};
        z-index: -1;
      }

      @keyframes scale {
        to {
          mask-size: 350vmax;
        }
      }
      `,
    }
  }

  if (variant === "polygon") {
    const getPolygonClipPaths = (position: AnimationStart) => {
      switch (position) {
        case "top-left":
          return {
            darkFrom: "polygon(50% -71%, -50% 71%, -50% 71%, 50% -71%)",
            darkTo: "polygon(50% -71%, -50% 71%, 50% 171%, 171% 50%)",
            lightFrom: "polygon(171% 50%, 50% 171%, 50% 171%, 171% 50%)",
            lightTo: "polygon(171% 50%, 50% 171%, -50% 71%, 50% -71%)",
          }
        case "top-right":
          return {
            darkFrom: "polygon(150% -71%, 250% 71%, 250% 71%, 150% -71%)",
            darkTo: "polygon(150% -71%, 250% 71%, 50% 171%, -71% 50%)",
            lightFrom: "polygon(-71% 50%, 50% 171%, 50% 171%, -71% 50%)",
            lightTo: "polygon(-71% 50%, 50% 171%, 250% 71%, 150% -71%)",
          }
        default:
          return {
            darkFrom: "polygon(50% -71%, -50% 71%, -50% 71%, 50% -71%)",
            darkTo: "polygon(50% -71%, -50% 71%, 50% 171%, 171% 50%)",
            lightFrom: "polygon(171% 50%, 50% 171%, 50% 171%, 171% 50%)",
            lightTo: "polygon(171% 50%, 50% 171%, -50% 71%, 50% -71%)",
          }
      }
    }

    const clipPaths = getPolygonClipPaths(start)

    return {
      name: `${variant}-${start}${blur ? "-blur" : ""}`,
      css: `
      ::view-transition-group(root) {
        animation-duration: 0.7s;
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
          clip-path: ${clipPaths.darkFrom};
          ${blur ? "filter: blur(8px);" : ""}
        }
        ${blur ? "50% { filter: blur(4px); }" : ""}
        to {
          clip-path: ${clipPaths.darkTo};
          ${blur ? "filter: blur(0px);" : ""}
        }
      }

      @keyframes reveal-light-${start}${blur ? "-blur" : ""} {
        from {
          clip-path: ${clipPaths.lightFrom};
          ${blur ? "filter: blur(8px);" : ""}
        }
        ${blur ? "50% { filter: blur(4px); }" : ""}
        to {
          clip-path: ${clipPaths.lightTo};
          ${blur ? "filter: blur(0px);" : ""}
        }
      }
      `,
    }
  }

  if (variant === "circle" && start !== "center") {
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

    const clipPosition = getClipPathPosition(start)

    return {
      name: `${variant}-${start}${blur ? "-blur" : ""}`,
      css: `
       ::view-transition-group(root) {
        animation-duration: 1s;
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

  return {
    name: `${variant}-${start}${blur ? "-blur" : ""}`,
    css: `
      ::view-transition-group(root) {
        animation-timing-function: var(--expo-in);
      }
      ::view-transition-new(root) {
        mask: url('${svg}') ${start.replace("-", " ")} / 0 no-repeat;
        mask-origin: content-box;
        animation: scale-${start}${blur ? "-blur" : ""} 1s;
        transform-origin: ${transformOrigin};
        ${blur ? "filter: blur(2px);" : ""}
      }
      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation: scale-${start}${blur ? "-blur" : ""} 1s;
        transform-origin: ${transformOrigin};
        z-index: -1;
      }
      @keyframes scale-${start}${blur ? "-blur" : ""} {
        from {
          ${blur ? "filter: blur(8px);" : ""}
        }
        ${blur ? "50% { filter: blur(4px); }" : ""}
        to {
          mask-size: 2000vmax;
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
  gifUrl = "",
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

    const animation = createAnimation(variant, start, blur, gifUrl)
    updateStyles(animation.css)

    const switchTheme = () => {
      if (nextIsDark) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
      setIsDark(nextIsDark)
    }

    const doc = document as any
    if (!doc.startViewTransition) {
      switchTheme()
      return
    }

    doc.startViewTransition(switchTheme)
  }, [variant, start, blur, gifUrl, updateStyles, isDark])

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
  gifUrl = "",
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
    gifUrl,
  })

  return (
    <button
      type="button"
      className={`h-[40.91px] w-[40.91px] cursor-pointer rounded-[10px] p-2.5 transition-all duration-300 active:scale-95 flex items-center justify-center border-0 shadow-none ${
        isDark ? "bg-white text-black" : "bg-[#f2f2f2] text-black"
      } ${className}`}
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
        <clipPath id="skiper-btn-2">
          <motion.path
            animate={{ y: isDark ? 10 : 0, x: isDark ? -12 : 0 }}
            transition={{ ease: "easeInOut", duration: 0.35 }}
            d="M0-5h30a1 1 0 0 0 9 13v24H0Z"
          />
        </clipPath>
        <g clipPath="url(#skiper-btn-2)">
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

export const Options = ({
  variant,
  start,
  blur,
  gifType,
  gifUrl,
  setVariant,
  setStart,
  setBlur,
  setGifType,
  setGifUrl,
}: {
  variant: AnimationVariant
  start: AnimationStart
  blur: boolean
  gifType: "1" | "2" | "3" | "custom"
  gifUrl: string
  setVariant: (variant: AnimationVariant) => void
  setStart: (start: AnimationStart) => void
  setBlur: (blur: boolean) => void
  setGifType: (type: "1" | "2" | "3" | "custom") => void
  setGifUrl: (url: string) => void
}) => {
  return (
    <motion.div
      drag
      dragMomentum={false}
      className="absolute right-5 top-20 z-50 flex w-[245px] flex-col gap-3 rounded-3xl border border-white/20 bg-black/80 p-3 text-white backdrop-blur-md shadow-2xl"
    >
      <div className="flex items-center justify-between">
        <span className="size-4 cursor-grab active:cursor-grabbing">
          <GripHorizontal className="size-4 opacity-50" />
        </span>

        <p className="flex items-center justify-center gap-1 rounded-lg px-2 py-1 text-sm opacity-50">
          Options
        </p>
      </div>

      <div className="flex flex-col text-xs">
        <div className="mt-1 flex justify-between py-1">
          <p className="w-16 whitespace-nowrap opacity-50">variant :</p>
          <div className="flex flex-wrap items-center justify-end gap-1">
            {(["circle", "rectangle", "gif", "polygon", "circle-blur"] as const).map(
              (v) => (
                <button
                  key={v}
                  onClick={() => setVariant(v)}
                  className={`cursor-pointer px-1 rounded transition-opacity ${
                    variant === v
                      ? "opacity-100 font-semibold bg-white/20"
                      : "opacity-50 hover:opacity-100"
                  }`}
                >
                  {v}
                </button>
              ),
            )}
          </div>
        </div>

        <div className="mt-1 flex justify-between py-1">
          <p className="w-16 whitespace-nowrap opacity-50">blur :</p>
          <div className="flex flex-wrap items-center justify-end gap-1">
            <button
              onClick={() => setBlur(false)}
              className={`cursor-pointer px-1 rounded transition-opacity ${
                !blur
                  ? "opacity-100 font-semibold bg-white/20"
                  : "opacity-50 hover:opacity-100"
              }`}
            >
              off
            </button>
            <button
              onClick={() => setBlur(true)}
              className={`cursor-pointer px-1 rounded transition-opacity ${
                blur
                  ? "opacity-100 font-semibold bg-white/20"
                  : "opacity-50 hover:opacity-100"
              }`}
            >
              on
            </button>
          </div>
        </div>

        {(variant === "circle" ||
          variant === "rectangle" ||
          variant === "polygon" ||
          variant === "circle-blur") && (
          <div className="mt-1 flex justify-between py-1">
            <p className="w-16 whitespace-nowrap opacity-50">start :</p>
            <div className="flex flex-wrap items-center justify-end gap-1">
              {(variant === "circle" || variant === "circle-blur") && (
                <button
                  onClick={() => setStart("center")}
                  className={`cursor-pointer px-1 rounded transition-opacity ${
                    start === "center"
                      ? "opacity-100 font-semibold bg-white/20"
                      : "opacity-50 hover:opacity-100"
                  }`}
                >
                  center
                </button>
              )}

              {variant === "rectangle" && (
                <>
                  {(["bottom-up", "top-down", "left-right", "right-left"] as const).map(
                    (dir) => (
                      <button
                        key={dir}
                        onClick={() => setStart(dir)}
                        className={`cursor-pointer px-1 rounded transition-opacity ${
                          start === dir
                            ? "opacity-100 font-semibold bg-white/20"
                            : "opacity-50 hover:opacity-100"
                        }`}
                      >
                        {dir}
                      </button>
                    ),
                  )}
                </>
              )}

              {(variant === "circle" ||
                variant === "polygon" ||
                variant === "circle-blur") && (
                <>
                  {(["top-left", "top-right"] as const).map((corner) => (
                    <button
                      key={corner}
                      onClick={() => setStart(corner)}
                      className={`cursor-pointer px-1 rounded transition-opacity ${
                        start === corner
                          ? "opacity-100 font-semibold bg-white/20"
                          : "opacity-50 hover:opacity-100"
                      }`}
                    >
                      {corner}
                    </button>
                  ))}
                  {variant !== "polygon" && (
                    <>
                      {(["bottom-left", "bottom-right"] as const).map((corner) => (
                        <button
                          key={corner}
                          onClick={() => setStart(corner)}
                          className={`cursor-pointer px-1 rounded transition-opacity ${
                            start === corner
                              ? "opacity-100 font-semibold bg-white/20"
                              : "opacity-50 hover:opacity-100"
                          }`}
                        >
                          {corner}
                        </button>
                      ))}
                    </>
                  )}
                </>
              )}

              {(variant === "circle" || variant === "circle-blur") && (
                <>
                  {(["top-center", "bottom-center"] as const).map((pos) => (
                    <button
                      key={pos}
                      onClick={() => setStart(pos)}
                      className={`cursor-pointer px-1 rounded transition-opacity ${
                        start === pos
                          ? "opacity-100 font-semibold bg-white/20"
                          : "opacity-50 hover:opacity-100"
                      }`}
                    >
                      {pos}
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>
        )}

        {variant === "gif" && (
          <div className="mt-1 flex justify-between py-1">
            <p className="w-16 opacity-50">gif type :</p>
            <div className="flex flex-wrap items-center justify-end gap-1">
              <button
                onClick={() => {
                  setGifType("1")
                  setGifUrl(
                    "https://media.giphy.com/media/KBbr4hHl9DSahKvInO/giphy.gif?cid=790b76112m5eeeydoe7et0cr3j3ekb1erunxozyshuhxx2vl&ep=v1_stickers_search&rid=giphy.gif&ct=s",
                  )
                }}
                className={`cursor-pointer px-1 rounded transition-opacity ${
                  gifType === "1"
                    ? "opacity-100 font-semibold bg-white/20"
                    : "opacity-50 hover:opacity-100"
                }`}
              >
                1
              </button>
              <button
                onClick={() => {
                  setGifType("2")
                  setGifUrl(
                    "https://media.giphy.com/media/5PncuvcXbBuIZcSiQo/giphy.gif?cid=ecf05e47j7vdjtytp3fu84rslaivdun4zvfhej6wlvl6qqsz&ep=v1_stickers_search&rid=giphy.gif&ct=s",
                  )
                }}
                className={`cursor-pointer px-1 rounded transition-opacity ${
                  gifType === "2"
                    ? "opacity-100 font-semibold bg-white/20"
                    : "opacity-50 hover:opacity-100"
                }`}
              >
                2
              </button>
              <button
                onClick={() => {
                  setGifType("3")
                  setGifUrl(
                    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3JwcXdzcHd5MW92NWprZXVpcTBtNXM5cG9obWh0N3I4NzFpaDE3byZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/WgsVx6C4N8tjy/giphy.gif",
                  )
                }}
                className={`cursor-pointer px-1 rounded transition-opacity ${
                  gifType === "3"
                    ? "opacity-100 font-semibold bg-white/20"
                    : "opacity-50 hover:opacity-100"
                }`}
              >
                3
              </button>
              <button
                onClick={() => setGifType("custom")}
                className={`cursor-pointer px-1 rounded transition-opacity ${
                  gifType === "custom"
                    ? "opacity-100 font-semibold bg-white/20"
                    : "opacity-50 hover:opacity-100"
                }`}
              >
                custom
              </button>
            </div>
          </div>
        )}

        {variant === "gif" && gifType === "custom" && (
          <div className="mt-1 flex flex-col gap-1 py-1">
            <p className="opacity-50">gif url :</p>
            <input
              type="text"
              value={gifUrl}
              onChange={(e) => setGifUrl(e.target.value)}
              placeholder="Enter GIF URL"
              className="w-full rounded-lg bg-white/10 px-2 py-1 text-xs focus:outline-none"
            />
          </div>
        )}
      </div>
    </motion.div>
  )
}
