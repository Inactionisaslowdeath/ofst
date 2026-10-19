import "@testing-library/jest-dom"
import { vi } from "vitest"

// Mock window.scrollTo for jsdom
Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: vi.fn(),
})

// Mock window.location to prevent "Not implemented: navigation to another Document" warnings
try {
  const mockLocation = new URL("http://localhost:8443")
  Object.defineProperty(window, "location", {
    writable: true,
    configurable: true,
    value: {
      ...window.location,
      href: mockLocation.href,
      assign: vi.fn(),
      replace: vi.fn(),
      reload: vi.fn(),
    },
  })
} catch {
  // If location cannot be redefined, fallback silently
}

// Mock window.matchMedia for jsdom
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock IntersectionObserver for jsdom / framer-motion viewport
class MockIntersectionObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
})

Object.defineProperty(global, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
})
