import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import ServicesSection from "./ServicesSection"
import { SERVICES } from "../data/content"

describe("ServicesSection", () => {
  it("renders section statement and studio metrics", () => {
    render(<ServicesSection />)

    expect(screen.getByText("What We Do, Perfectly.")).toBeDefined()
    expect(screen.getByText("8+ Years of Expertise")).toBeDefined()
    expect(screen.getByText("50+ Projects Delivered")).toBeDefined()
  })

  it("renders all defined services with their titles and images", () => {
    render(<ServicesSection />)

    SERVICES.forEach((service) => {
      expect(screen.getByText(service.name)).toBeDefined()
      expect(screen.getByAltText(service.name)).toBeDefined()
    })
  })
})
