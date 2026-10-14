import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import { render, screen, fireEvent, act } from "@testing-library/react"
import "@testing-library/jest-dom"
import ThemeToggleButton from "./ThemeToggle"

describe("ThemeToggleButton (Deep Module Seam)", () => {
  beforeEach(() => {
    document.documentElement.className = ""
  })

  afterEach(() => {
    document.documentElement.className = ""
    vi.restoreAllMocks()
  })

  it("renders theme toggle button with accessible aria-label", () => {
    render(<ThemeToggleButton />)
    const button = screen.getByRole("button", { name: /toggle theme/i })
    expect(button).toBeDefined()
    expect(document.body.contains(button)).toBe(true)
  })

  it("toggles dark mode class on document element on click", () => {
    render(<ThemeToggleButton />)
    const button = screen.getByRole("button", { name: /toggle theme/i })

    expect(document.documentElement.classList.contains("dark")).toBe(false)
    act(() => {
      button.click()
    })
    expect(document.documentElement.classList.contains("dark")).toBe(true)
    act(() => {
      button.click()
    })
    expect(document.documentElement.classList.contains("dark")).toBe(false)
  })
})
