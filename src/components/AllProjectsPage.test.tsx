import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import AllProjectsPage from "./AllProjectsPage"

describe("AllProjectsPage", () => {
  it("renders the bar lines, Projects. title, and filter pills", () => {
    render(
      <AllProjectsPage onSelectProject={vi.fn()} onNavigateHome={vi.fn()} />,
    )

    expect(screen.getByRole("heading", { name: "Projects." })).toBeDefined()
    expect(screen.getByRole("button", { name: "All" })).toBeDefined()
    expect(screen.getByRole("button", { name: "Brand Identity" })).toBeDefined()
    expect(screen.getByRole("button", { name: "Digital Design" })).toBeDefined()
    expect(screen.getByRole("button", { name: "product Design" })).toBeDefined()
    expect(
      screen.getByRole("button", { name: "Editorial & Print Design" }),
    ).toBeDefined()
  })

  it("filters project cards by category when clicking a category pill", () => {
    render(
      <AllProjectsPage onSelectProject={vi.fn()} onNavigateHome={vi.fn()} />,
    )

    // Initially all 4 projects rendered
    expect(screen.getByText("void®")).toBeDefined()
    expect(screen.getByText("offset studio")).toBeDefined()
    expect(screen.getByText("null.al")).toBeDefined()
    expect(screen.getByText("monolith™")).toBeDefined()

    // Filter by Digital Design (null.al)
    const digitalBtn = screen.getByRole("button", { name: "Digital Design" })
    fireEvent.click(digitalBtn)

    expect(screen.getByText("null.al")).toBeDefined()
    expect(screen.queryByText("offset studio")).toBeNull()
  })

  it("calls onSelectProject when clicking a project card", () => {
    const onSelectProject = vi.fn()
    render(
      <AllProjectsPage
        onSelectProject={onSelectProject}
        onNavigateHome={vi.fn()}
      />,
    )

    const voidCard = screen.getByRole("button", { name: /void®/i })
    fireEvent.click(voidCard)

    expect(onSelectProject).toHaveBeenCalledWith(0)
  })

  it("calls onNavigateHome when clicking brand logo in nav", () => {
    const onNavigateHome = vi.fn()
    render(
      <AllProjectsPage
        onSelectProject={vi.fn()}
        onNavigateHome={onNavigateHome}
      />,
    )

    const logoBtn = screen.getByRole("link", { name: "OFST home" })
    fireEvent.click(logoBtn)

    expect(onNavigateHome).toHaveBeenCalledTimes(1)
  })
})
