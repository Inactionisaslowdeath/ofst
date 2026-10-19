import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import {
  RevealLine,
  RevealBlock,
  Counter,
  CornerLabel,
  KineticBarcode,
  AdaptiveRevealParagraph,
} from "./MotionPrimitives"

describe("MotionPrimitives", () => {
  it("renders RevealLine with children and custom class", () => {
    render(<RevealLine className="custom-line">Studio Mission</RevealLine>)
    expect(screen.getByText("Studio Mission")).toBeInTheDocument()
  })

  it("renders RevealBlock with children", () => {
    render(<RevealBlock className="custom-block">Block Content</RevealBlock>)
    expect(screen.getByText("Block Content")).toBeInTheDocument()
  })

  it("renders Counter with target and suffix", () => {
    render(<Counter target={100} suffix="%" />)
    expect(screen.getByText(/%/)).toBeInTheDocument()
  })

  it("renders CornerLabel with plus delimiters and children", () => {
    render(<CornerLabel>Capabilities</CornerLabel>)
    expect(screen.getByText("Capabilities")).toBeInTheDocument()
    const plusSigns = screen.getAllByText("+")
    expect(plusSigns.length).toBe(2)
  })

  it("renders KineticBarcode with accessible hidden attribute", () => {
    const { container } = render(<KineticBarcode />)
    const barcode = container.querySelector("[aria-hidden='true']")
    expect(barcode).toBeInTheDocument()
    const bars = container.querySelectorAll(".barcode-bar")
    expect(bars.length).toBeGreaterThan(0)
  })

  it("renders AdaptiveRevealParagraph lines", () => {
    const lines = [
      { text: "First line of manifesto" },
      { text: "Second line of manifesto" },
    ]
    const { container } = render(<AdaptiveRevealParagraph lines={lines} />)
    expect(container.textContent).toContain("First line of manifesto")
    expect(container.textContent).toContain("Second line of manifesto")
  })
})
