import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import AboutPage from "./AboutPage"

describe("AboutPage", () => {
  it("renders hero showcase cards with images and statement copy", () => {
    render(
      <AboutPage
        onNavigateHome={vi.fn()}
        onNavigateProjects={vi.fn()}
        onNavigateContact={vi.fn()}
      />,
    )

    expect(
      screen.getByText(
        /founded in 2023, we've built a practice around the power of contrast/i,
      ),
    ).toBeDefined()

    const handImg = screen.getByAltText(
      /hand wearing titanium smart ring holding smartphone/i,
    )
    const sculptureImg = screen.getByAltText(
      /3d sculptural organic flower with mesh cushion texture/i,
    )
    expect(handImg).toBeDefined()
    expect(sculptureImg).toBeDefined()

    // Verify bottom text/pills have been removed per user instruction
    expect(screen.queryByText("Tactile Interaction")).toBeNull()
    expect(screen.queryByText("Generative Form")).toBeNull()
  })

  it("renders 4 partner logo shapes right below the cards", () => {
    render(
      <AboutPage
        onNavigateHome={vi.fn()}
        onNavigateProjects={vi.fn()}
        onNavigateContact={vi.fn()}
      />,
    )

    const partnerSection = screen.getByLabelText(/partner brand logos/i)
    expect(partnerSection).toBeDefined()
    expect(screen.getAllByAltText(/partner logo 1/i).length).toBeGreaterThan(0)
    expect(screen.getAllByAltText(/partner logo 2/i).length).toBeGreaterThan(0)
    expect(screen.getAllByAltText(/partner logo 3/i).length).toBeGreaterThan(0)
    expect(screen.getAllByAltText(/partner logo 4/i).length).toBeGreaterThan(0)
  })

  it("renders statement section with new tagline and adaptive typography", () => {
    render(
      <AboutPage
        onNavigateHome={vi.fn()}
        onNavigateProjects={vi.fn()}
        onNavigateContact={vi.fn()}
      />,
    )

    expect(screen.getByText(/we don’t follow trends\./i)).toBeDefined()
    expect(
      screen.getByText(/we build what feels inevitable\./i),
    ).toBeDefined()
    expect(screen.queryByText(/— philosophy —/i)).toBeNull()
    expect(
      screen.getByText(
        /is an independent digital studio built on contrast and craft\./i,
      ),
    ).toBeDefined()
    expect(
      screen.getByText(
        /strategy and emotion\. restraint and impact\. clarity and intent\./i,
      ),
    ).toBeDefined()
    expect(
      screen.getByText(/we believe design is a conversation/i),
    ).toBeDefined()
  })

  it("renders What We Do Perfectly services section and interactive services", () => {
    render(
      <AboutPage
        onNavigateHome={vi.fn()}
        onNavigateProjects={vi.fn()}
        onNavigateContact={vi.fn()}
      />,
    )

    expect(screen.getByText(/what we do, perfectly\./i)).toBeDefined()
    expect(screen.getAllByText("Brand Identity").length).toBeGreaterThan(0)
    expect(screen.getAllByText(/websites/i).length).toBeGreaterThan(0)
  })

  it("renders metrics counters and studio statement matching Home page showcase", () => {
    render(
      <AboutPage
        onNavigateHome={vi.fn()}
        onNavigateProjects={vi.fn()}
        onNavigateContact={vi.fn()}
      />,
    )

    expect(
      screen.getByText(
        /we build distinctive brands and digital experiences around/i,
      ),
    ).toBeDefined()
    expect(
      screen.getByText(
        /and design explorations from the ofst studio\./i,
      ),
    ).toBeDefined()
    expect(screen.getAllByText(/crafting experiences/i).length).toBeGreaterThan(
      0,
    )
    expect(screen.getAllByText(/projects delivered/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/clients worldwide/i).length).toBeGreaterThan(0)
  })

  it("renders capabilities grid items", () => {
    render(
      <AboutPage
        onNavigateHome={vi.fn()}
        onNavigateProjects={vi.fn()}
        onNavigateContact={vi.fn()}
      />,
    )

    expect(screen.getByRole("heading", { name: "Capabilities" })).toBeDefined()
    expect(screen.getAllByText("Brand Identity").length).toBeGreaterThan(0)
    expect(screen.getAllByText("Digital Products").length).toBeGreaterThan(0)
    expect(screen.getAllByText("Design Engineering").length).toBeGreaterThan(0)
    expect(screen.getAllByText("Visual Systems").length).toBeGreaterThan(0)
    expect(screen.getAllByText("Web Design & Motion").length).toBeGreaterThan(0)
    expect(screen.getAllByText("Technical Direction").length).toBeGreaterThan(0)
    expect(screen.getAllByText("Creative Direction").length).toBeGreaterThan(0)
    expect(screen.getAllByText("Interactive Systems").length).toBeGreaterThan(0)
    expect(screen.getAllByText("Prototyping").length).toBeGreaterThan(0)
    expect(screen.getAllByText("Editorial & Typography").length).toBeGreaterThan(0)
    expect(screen.getAllByText("Spatial & 3D Design").length).toBeGreaterThan(0)
    expect(screen.getAllByText("Production & Art Direction").length).toBeGreaterThan(0)
  })

  it("renders existing FAQ and Footer sections", () => {
    render(
      <AboutPage
        onNavigateHome={vi.fn()}
        onNavigateProjects={vi.fn()}
        onNavigateContact={vi.fn()}
      />,
    )

    expect(screen.getByText(/^questions$/i)).toBeDefined()
    expect(screen.getByText(/clear answers\./i)).toBeDefined()
    expect(screen.getByText(/join our weekly/i)).toBeDefined()
  })

  it("calls navigation callbacks when clicked from nav", () => {
    const onNavigateHome = vi.fn()
    const onNavigateProjects = vi.fn()
    const onNavigateContact = vi.fn()

    render(
      <AboutPage
        onNavigateHome={onNavigateHome}
        onNavigateProjects={onNavigateProjects}
        onNavigateContact={onNavigateContact}
      />,
    )

    const homeBrand = screen.getByLabelText(/ofst home/i)
    fireEvent.click(homeBrand)
    expect(onNavigateHome).toHaveBeenCalled()

    const projectsBtn = screen.getByRole("button", { name: "Projects" })
    fireEvent.click(projectsBtn)
    expect(onNavigateProjects).toHaveBeenCalled()

    const contactBtn = screen.getByRole("button", { name: "Contact" })
    fireEvent.click(contactBtn)
    expect(onNavigateContact).toHaveBeenCalled()
  })
})
