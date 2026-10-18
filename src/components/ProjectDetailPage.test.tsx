import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import ProjectDetailPage from "./ProjectDetailPage"
import type { ProjectItem } from "../data/content"

describe("ProjectDetailPage", () => {
  it("renders the null.al title, metadata, and back button", () => {
    const onBack = vi.fn()
    render(<ProjectDetailPage onBack={onBack} />)

    expect(screen.getByRole("heading", { name: "null.al" })).toBeDefined()
    expect(screen.getByText("What is about")).toBeDefined()
    expect(screen.getByText("2023")).toBeDefined()
    expect(screen.getByText("Stealth AI")).toBeDefined()
    expect(screen.getByText("nullai.tech")).toBeDefined()

    const backButton = screen.getByRole("button", { name: "Back" })
    expect(backButton).toBeDefined()
    fireEvent.click(backButton)
    expect(onBack).toHaveBeenCalledTimes(1)
  })

  it("renders the big hero card and all four detail cards", () => {
    render(<ProjectDetailPage onBack={vi.fn()} />)

    const heroImg = screen.getByAltText("null.al industrial device")
    expect(heroImg).toBeDefined()
    expect(heroImg.getAttribute("src")).toBe(
      "/assets/projects/null-ai/hero.png",
    )

    expect(screen.getByAltText("null.al detail 1")).toBeDefined()
    expect(screen.getByAltText("null.al detail 2")).toBeDefined()
    expect(screen.getByAltText("null.al detail 3")).toBeDefined()
    expect(screen.getByAltText("null.al detail 4")).toBeDefined()
  })

  it("renders custom project details when project prop is provided", () => {
    const customProject: ProjectItem = {
      id: 0,
      name: "void®",
      image: "e3bbf.png",
      detail: {
        title: "void®",
        statement: "void is a luxury packaging series",
        year: "2024",
        client: "void Labs",
        website: "void.packaging",
        websiteUrl: "https://void.packaging",
        whatIsAbout: [
          "Line 1",
          "Line 2",
          "Line 3",
          "Line 4",
          "Line 5",
          "Line 6",
          "Line 7",
        ],
        heroImage: "/assets/projects/void/hero.png",
        heroAlt: "void packaging series packaging mockup",
        cards: [
          { src: "/assets/projects/void/card1.png", alt: "void card 1" },
          { src: "/assets/projects/void/card2.png", alt: "void card 2" },
          { src: "/assets/projects/void/card3.png", alt: "void card 3" },
          { src: "/assets/projects/void/card4.png", alt: "void card 4" },
        ],
      },
    }

    render(<ProjectDetailPage onBack={vi.fn()} project={customProject} />)
    expect(screen.getByRole("heading", { name: "void®" })).toBeDefined()
    expect(screen.getByText("void Labs")).toBeDefined()
    expect(screen.getByText("2024")).toBeDefined()
    expect(screen.getByText("void.packaging")).toBeDefined()
    expect(
      screen.getByAltText("void packaging series packaging mockup"),
    ).toBeDefined()
    expect(screen.getByAltText("void card 1")).toBeDefined()
  })
})
