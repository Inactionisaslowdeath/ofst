import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { ParallaxGallery } from "./ParallaxGallery"

describe("ParallaxGallery", () => {
  it("renders gallery showcase images and retains tall aspect ratio classes", () => {
    const { container } = render(<ParallaxGallery />)

    const images = container.querySelectorAll(
      "img[alt='Showcase gallery item']",
    )
    expect(images.length).toBeGreaterThan(0)

    // Verify card wrapper has fixed aspect ratio and minimum height to prevent squishing
    const cardWrapper = images[0].parentElement
    expect(cardWrapper).toBeDefined()
    expect(cardWrapper?.className).toContain("aspect-[2/3]")
    expect(cardWrapper?.className).toContain("shrink-0")
    expect(cardWrapper?.className).toContain("min-h-[260px]")
  })
})
