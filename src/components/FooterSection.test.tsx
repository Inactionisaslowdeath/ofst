import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import FooterSection from "./FooterSection"

describe("FooterSection", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("renders newsletter heading, email input, and submit button", () => {
    render(<FooterSection lenis={null} />)

    expect(screen.getByRole("heading", { level: 2 })).toBeDefined()
    expect(screen.getByText(/join our weekly/i)).toBeDefined()
    expect(screen.getByText(/newsletter/i)).toBeDefined()
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeDefined()
    expect(screen.getByRole("button", { name: /subscribe/i })).toBeDefined()
  })

  it("submits the newsletter form and displays status feedback", () => {
    render(<FooterSection lenis={null} />)

    const input = screen.getByPlaceholderText(/enter your email/i)
    fireEvent.change(input, { target: { value: "test@example.com" } })

    const form = input.closest("form")!
    fireEvent.submit(form)

    expect(
      screen.getByText(/send the subscription request in your email app/i),
    ).toBeDefined()
  })

  it("renders directory links and triggers navigation callbacks on click", () => {
    const onNavigateAbout = vi.fn()
    const onNavigateContact = vi.fn()
    const onNavigateHome = vi.fn()
    const onNavigateProjects = vi.fn()

    render(
      <FooterSection
        lenis={null}
        onNavigateAbout={onNavigateAbout}
        onNavigateContact={onNavigateContact}
        onNavigateHome={onNavigateHome}
        onNavigateProjects={onNavigateProjects}
      />,
    )

    const aboutLink = screen.getByRole("link", { name: /about/i })
    fireEvent.click(aboutLink)
    expect(onNavigateAbout).toHaveBeenCalledTimes(1)

    const contactLink = screen.getByRole("link", { name: /contact/i })
    fireEvent.click(contactLink)
    expect(onNavigateContact).toHaveBeenCalledTimes(1)

    const homeLink = screen.getByRole("link", { name: /home/i })
    fireEvent.click(homeLink)
    expect(onNavigateHome).toHaveBeenCalledTimes(1)

    const workLink = screen.getByRole("link", { name: /work/i })
    fireEvent.click(workLink)
    expect(onNavigateProjects).toHaveBeenCalledTimes(1)
  })

  it("triggers scroll to top when Back to top link is clicked", () => {
    const mockLenis = {
      scrollTo: vi.fn(),
      on: vi.fn(),
      off: vi.fn(),
    }

    render(<FooterSection lenis={mockLenis as any} />)

    const backToTop = screen.getByRole("link", { name: /back to top/i })
    fireEvent.click(backToTop)
    expect(mockLenis.scrollTo).toHaveBeenCalledWith(0)
  })
})
