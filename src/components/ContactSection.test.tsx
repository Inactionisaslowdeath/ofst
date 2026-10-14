import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { ContactSection } from "./ContactSection"

describe("ContactSection", () => {
  it("renders form inputs with required validation and submit button", () => {
    render(<ContactSection lenis={null} />)

    expect(screen.getByText(/let's build with intent/i)).toBeDefined()
    expect(screen.getByPlaceholderText(/your name/i)).toBeDefined()
    expect(screen.getByPlaceholderText(/you@company\.com/i)).toBeDefined()
    expect(
      screen.getByPlaceholderText(/tell us what you are building/i),
    ).toBeDefined()
    expect(screen.getByRole("button", { name: /submit/i })).toBeDefined()
  })

  it("submits the form and displays confirmation status message", () => {
    render(<ContactSection lenis={null} />)

    const nameInput = screen.getByPlaceholderText(/your name/i)
    const emailInput = screen.getByPlaceholderText(/you@company\.com/i)
    const messageInput = screen.getByPlaceholderText(
      /tell us what you are building/i,
    )
    const submitBtn = screen.getByRole("button", { name: /submit/i })

    fireEvent.change(nameInput, { target: { value: "Rayan Solis" } })
    fireEvent.change(emailInput, { target: { value: "rayan@example.com" } })
    fireEvent.change(messageInput, {
      target: { value: "Let us collaborate on our new brand identity." },
    })

    fireEvent.click(submitBtn)

    expect(screen.getByRole("status").textContent).toMatch(
      /email app will open/i,
    )
  })
})
