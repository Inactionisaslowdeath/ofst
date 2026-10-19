import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { TestimonialsSection } from "./TestimonialsSection"

describe("TestimonialsSection", () => {
  it("renders statement heading and creative collaborator portraits", () => {
    render(<TestimonialsSection />)

    expect(screen.getByText(/good work\. clear thinking\./i)).toBeDefined()
    const portraits = screen.getAllByAltText(/creative collaborator/i)
    expect(portraits.length).toBeGreaterThan(0)
  })

  it("renders all testimonial cards with author names, titles, and quotes", () => {
    render(<TestimonialsSection />)

    expect(screen.getByText("David Kim")).toBeDefined()
    expect(screen.getByText("Brand Strategist")).toBeDefined()
    expect(
      screen.getByText(
        /bold\. quiet\. brilliant\. their work speaks without shouting\./i,
      ),
    ).toBeDefined()

    expect(screen.getByText("Amira Solis")).toBeDefined()
    expect(screen.getByText("UX Lead at Field")).toBeDefined()
    expect(
      screen.getByText(
        /working with ofst felt like collaborating with a design lab\./i,
      ),
    ).toBeDefined()

    expect(screen.getByText("Lena Morris")).toBeDefined()
    expect(screen.getByText("Creative Director")).toBeDefined()
    expect(screen.getByText(/minimal, but rich\./i)).toBeDefined()
  })
})
