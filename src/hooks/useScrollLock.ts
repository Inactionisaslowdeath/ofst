import { useEffect } from "react"

let lockCount = 0

/**
 * Custom hook to lock and unlock body scrolling safely across concurrent components.
 * Uses reference counting so multiple modals or menus do not inadvertently unlock body scroll.
 */
export function useScrollLock(lock: boolean = true) {
  useEffect(() => {
    if (typeof window === "undefined" || !lock) return

    lockCount++
    if (lockCount === 1) {
      document.body.style.overflow = "hidden"
    }

    return () => {
      lockCount = Math.max(0, lockCount - 1)
      if (lockCount === 0) {
        document.body.style.overflow = ""
      }
    }
  }, [lock])
}

/**
 * Force-resets the scroll lock counter (e.g. during page unmount or transition).
 */
export function unlockBodyScroll() {
  if (typeof window === "undefined") return
  lockCount = 0
  document.body.style.overflow = ""
}

export default useScrollLock
