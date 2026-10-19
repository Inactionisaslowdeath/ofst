import { renderHook } from "@testing-library/react"
import { describe, expect, it, beforeEach } from "vitest"
import { useScrollLock, unlockBodyScroll } from "./useScrollLock"

describe("useScrollLock", () => {
  beforeEach(() => {
    unlockBodyScroll()
  })

  it("locks body scroll when active and unlocks on unmount", () => {
    expect(document.body.style.overflow).toBe("")

    const { unmount } = renderHook(() => useScrollLock(true))
    expect(document.body.style.overflow).toBe("hidden")

    unmount()
    expect(document.body.style.overflow).toBe("")
  })

  it("handles reference-counted nesting correctly", () => {
    const { unmount: unmount1 } = renderHook(() => useScrollLock(true))
    const { unmount: unmount2 } = renderHook(() => useScrollLock(true))

    expect(document.body.style.overflow).toBe("hidden")

    unmount1()
    // Still locked because second hook is still active
    expect(document.body.style.overflow).toBe("hidden")

    unmount2()
    // Now fully unlocked
    expect(document.body.style.overflow).toBe("")
  })

  it("unlockBodyScroll resets the overflow style unconditionally", () => {
    renderHook(() => useScrollLock(true))
    expect(document.body.style.overflow).toBe("hidden")

    unlockBodyScroll()
    expect(document.body.style.overflow).toBe("")
  })
})
