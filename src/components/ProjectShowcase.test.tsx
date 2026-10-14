import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { ProjectShowcase } from "./ProjectShowcase"
import type { ProjectItem } from "../data/content"

const MOCK_PROJECTS: ProjectItem[] = [
  {
    id: 0,
    name: "Project Alpha",
    image: "img1.png",
    alt: "Alpha project cover",
  },
  { id: 1, name: "Project Beta", image: "img2.png" },
  { id: 2, name: "Project Gamma", image: "img3.png" },
  { id: 3, name: "Project Delta", image: "img4.png" },
]

describe("ProjectShowcase", () => {
  it("renders proof statement and all project buttons", () => {
    const setActiveProject = vi.fn()
    render(
      <ProjectShowcase
        projects={MOCK_PROJECTS}
        activeProject={null}
        setActiveProject={setActiveProject}
      />,
    )

    expect(screen.getByText(/selected work/i)).toBeDefined()
    expect(
      screen.getByRole("button", { name: /alpha project cover/i }),
    ).toBeDefined()
    expect(screen.getByRole("button", { name: /project beta/i })).toBeDefined()
  })

  it("calls setActiveProject when clicking a project item", () => {
    const setActiveProject = vi.fn()
    render(
      <ProjectShowcase
        projects={MOCK_PROJECTS}
        activeProject={null}
        setActiveProject={setActiveProject}
      />,
    )

    const firstProject = screen.getByRole("button", {
      name: /alpha project cover/i,
    })
    fireEvent.click(firstProject)

    expect(setActiveProject).toHaveBeenCalledWith(0)
  })

  it("renders modal dialog when activeProject is provided and dismisses on close button click", () => {
    const setActiveProject = vi.fn()
    render(
      <ProjectShowcase
        projects={MOCK_PROJECTS}
        activeProject={0}
        setActiveProject={setActiveProject}
      />,
    )

    const dialog = screen.getByRole("dialog")
    expect(dialog).toBeDefined()

    const closeBtn = screen.getByRole("button", { name: /close project/i })
    fireEvent.click(closeBtn)

    expect(setActiveProject).toHaveBeenCalledWith(null)
  })
})
