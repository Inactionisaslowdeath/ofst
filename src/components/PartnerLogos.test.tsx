import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import PartnerLogos from "./PartnerLogos"
import { PARTNER_LOGOS } from "../data/content"

describe("PartnerLogos", () => {
  it("renders all partner studio logos with alt text", () => {
    render(<PartnerLogos />)

    const logos = screen.getAllByAltText("Partner studio")
    expect(logos).toHaveLength(PARTNER_LOGOS.length)
  })
})
