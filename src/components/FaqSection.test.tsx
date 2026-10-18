import { describe, it, expect } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import FaqSection from "./FaqSection"
import { FAQ_QUESTIONS } from "../data/content"

describe("FaqSection", () => {
  it("renders the Questions Clear Answers heading and inquiry email link", () => {
    render(<FaqSection />)

    expect(
      screen.getByRole("heading", { name: /questions clear answers/i }),
    ).toBeDefined()
    expect(screen.getByRole("link", { name: "hello@OFST.com" })).toBeDefined()
  })

  it("renders all questions and toggles answer visibility on click", () => {
    render(<FaqSection />)

    const firstItem = FAQ_QUESTIONS[0]
    const button = screen.getByRole("button", {
      name: new RegExp(firstItem.question, "i"),
    })

    expect(button.getAttribute("aria-expanded")).toBe("false")

    // Click to open
    fireEvent.click(button)
    expect(button.getAttribute("aria-expanded")).toBe("true")
    expect(screen.getByText(firstItem.answer)).toBeDefined()

    // Click to close
    fireEvent.click(button)
    expect(button.getAttribute("aria-expanded")).toBe("false")
  })
})
