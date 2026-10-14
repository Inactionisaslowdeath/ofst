import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { StickyNavigation } from "./StickyNavigation"

describe("StickyNavigation", () => {
  it("renders brand logo and all primary section anchors", () => {
    const heroRef = { current: document.createElement("div") }
    render(<StickyNavigation heroRef={heroRef} />)

    expect(
      screen.getByRole("navigation", { name: /main navigation/i }),
    ).toBeDefined()
    expect(screen.getByRole("link", { name: /about/i })).toBeDefined()
    expect(screen.getByRole("link", { name: /projects/i })).toBeDefined()
    expect(screen.getByRole("link", { name: /services/i })).toBeDefined()
    expect(screen.getByRole("link", { name: /process/i })).toBeDefined()
    expect(screen.getByRole("link", { name: /contact/i })).toBeDefined()
  })

  it("sets compact mode when hero bottom is scrolled past threshold", () => {
    const heroEl = document.createElement("div")
    // Mock getBoundingClientRect
    heroEl.getBoundingClientRect = () => ({
      bottom: 50,
      top: -500,
      left: 0,
      right: 1000,
      width: 1000,
      height: 550,
      x: 0,
      y: -500,
      toJSON: () => {},
    })

    const heroRef = { current: heroEl }
    render(<StickyNavigation heroRef={heroRef} />)

    const nav = screen.getByRole("navigation", { name: /main navigation/i })
    expect(nav.getAttribute("data-compact")).toBe("true")
  })
})
