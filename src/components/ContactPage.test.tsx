import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import ContactPage from "./ContactPage"

describe("ContactPage", () => {
  it("renders exact Home page Contact section with Let's build with intent and bilateral reaching hands", () => {
    render(
      <ContactPage onNavigateHome={vi.fn()} onNavigateProjects={vi.fn()} />,
    )

    expect(screen.getByText(/let's build with intent/i)).toBeDefined()
    expect(
      screen.getByText(/tell us what you want to make better/i),
    ).toBeDefined()
    expect(
      screen.getByText(/we’ll start with a thoughtful conversation/i),
    ).toBeDefined()

    const leftHand = screen.getByAltText(/a hand reaching toward the center/i)
    const rightHand = screen.getByAltText(
      /a hand reaching from the other side/i,
    )
    expect(leftHand).toBeDefined()
    expect(rightHand).toBeDefined()
  })

  it("renders form inputs with required validation and submit button", () => {
    render(
      <ContactPage onNavigateHome={vi.fn()} onNavigateProjects={vi.fn()} />,
    )

    expect(screen.getByPlaceholderText(/your name/i)).toBeDefined()
    expect(screen.getByPlaceholderText(/you@company\.com/i)).toBeDefined()
    expect(
      screen.getByPlaceholderText(/tell us what you are building/i),
    ).toBeDefined()
    expect(screen.getByRole("button", { name: /submit/i })).toBeDefined()
  })

  it("submits the form and displays confirmation status message", () => {
    render(
      <ContactPage onNavigateHome={vi.fn()} onNavigateProjects={vi.fn()} />,
    )

    const nameInput = screen.getByPlaceholderText(/your name/i)
    const emailInput = screen.getByPlaceholderText(/you@company\.com/i)
    const messageInput = screen.getByPlaceholderText(
      /tell us what you are building/i,
    )
    const submitBtn = screen.getByRole("button", { name: /submit/i })

    fireEvent.change(nameInput, { target: { value: "Floren Bolls" } })
    fireEvent.change(emailInput, { target: { value: "hello@great.com" } })
    fireEvent.change(messageInput, {
      target: { value: "Looking for high-impact brand direction." },
    })

    fireEvent.click(submitBtn)

    expect(screen.getByRole("status").textContent).toMatch(
      /email app will open/i,
    )
  })

  it("renders the studio FAQ section and Newsletter/Footer", () => {
    render(
      <ContactPage onNavigateHome={vi.fn()} onNavigateProjects={vi.fn()} />,
    )

    // FAQ section presence
    expect(screen.getByText(/^questions$/i)).toBeDefined()
    expect(screen.getByText(/clear answers\./i)).toBeDefined()

    // Newsletter & Footer presence
    expect(screen.getByText(/join our weekly/i)).toBeDefined()
    expect(screen.getByText(/newsletter!/i)).toBeDefined()
  })

  it("calls onNavigateHome and onNavigateProjects callbacks from navigation", () => {
    const onNavigateHome = vi.fn()
    const onNavigateProjects = vi.fn()

    render(
      <ContactPage
        onNavigateHome={onNavigateHome}
        onNavigateProjects={onNavigateProjects}
      />,
    )

    const homeBrand = screen.getByLabelText(/ofst home/i)
    fireEvent.click(homeBrand)
    expect(onNavigateHome).toHaveBeenCalled()

    const projectsNav = screen.getByRole("button", { name: "Projects" })
    fireEvent.click(projectsNav)
    expect(onNavigateProjects).toHaveBeenCalled()
  })
})
