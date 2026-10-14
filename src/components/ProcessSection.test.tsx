import { describe, it, expect } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { ProcessSection } from "./ProcessSection"

describe("ProcessSection", () => {
  it("renders process heading and 5 methodology step buttons", () => {
    render(<ProcessSection />)

    expect(screen.getByText(/less noise\. more clarity\./i)).toBeDefined()
    expect(screen.getByRole("button", { name: /listen/i })).toBeDefined()
    expect(screen.getByRole("button", { name: /explore/i })).toBeDefined()
    expect(screen.getByRole("button", { name: /refine/i })).toBeDefined()
    expect(screen.getByRole("button", { name: /build/i })).toBeDefined()
    expect(screen.getByRole("button", { name: /reflect/i })).toBeDefined()
  })

  it("updates active step description when user selects a different step button", () => {
    render(<ProcessSection />)

    const exploreButton = screen.getByRole("button", { name: /explore/i })
    fireEvent.click(exploreButton)

    expect(exploreButton.getAttribute("aria-pressed")).toBe("true")
    expect(screen.getByText(/we look beyond the obvious/i)).toBeDefined()
  })
})
