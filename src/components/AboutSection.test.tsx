import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import AboutSection from "./AboutSection"

describe("AboutSection", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    )
  })

  it("renders the studio manifesto text with scrub words", () => {
    render(<AboutSection />)

    expect(
      screen.getAllByText("At OFST,", { exact: false }).length,
    ).toBeGreaterThan(0)
    expect(
      screen.getAllByText("strategy,", { exact: false }).length,
    ).toBeGreaterThan(0)
    expect(
      screen.getAllByText("digital", { exact: false }).length,
    ).toBeGreaterThan(0)
    expect(
      screen.getAllByText((_, el) => {
        if (!el) return false
        const hasText = /to make digital experiences clear/i.test(
          el.textContent ?? "",
        )
        const childrenDont = Array.from(el.children).every(
          (c) =>
            !/to make digital experiences clear/i.test(c.textContent ?? ""),
        )
        return hasText && childrenDont
      }).length,
    ).toBeGreaterThan(0)
  })

  it("renders the barcode bars", () => {
    const { container } = render(<AboutSection />)
    const bars = container.querySelectorAll(".barcode-bar")
    expect(bars.length).toBe(20) // 3 accent bars + 17 thin bars
  })
})
