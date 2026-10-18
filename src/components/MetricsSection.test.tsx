import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import MetricsSection from "./MetricsSection"

describe("MetricsSection", () => {
  it("renders the Why OFST heading and engagement graphic with accessible label", () => {
    render(<MetricsSection />)

    expect(screen.getByRole("heading", { level: 2 })).toBeDefined()
    expect(screen.getByText(/why ofst/i)).toBeDefined()

    expect(
      screen.getByRole("img", {
        name: "Engagement rises steadily from February to June",
      }),
    ).toBeDefined()
  })

  it("renders metric cards and client satisfaction callout", () => {
    render(<MetricsSection />)

    expect(screen.getByText("Engagement")).toBeDefined()
    expect(screen.getByText("Over Time")).toBeDefined()
    expect(screen.getByText("All Time")).toBeDefined()
    expect(screen.getByText("This Month")).toBeDefined()
    expect(screen.getByText("Satisfied Clients")).toBeDefined()
  })
})
