export interface ProjectItem {
  id: number
  name: string
  image: string
  alt?: string
}

export interface ServiceItem {
  name: string
  image: string
}

export interface ProcessStep {
  title: string
  description: string
}

export interface FaqQuestion {
  question: string
  answer: string
}

export interface PortraitColumn {
  images: string[]
  offset: string
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 0,
    name: "void®",
    image: "e3bbf.png",
    alt: "void brand identity — black packaging and a red bottle",
  },
  { id: 1, name: "offset studio", image: "cbc79.png" },
  { id: 2, name: "null.al", image: "35ff7.png" },
  { id: 3, name: "monolith™", image: "56261.png" },
]

export const SERVICES: ServiceItem[] = [
  { name: "Brand Identity", image: "2f511.png" },
  { name: "websites", image: "a6a98.png" },
  { name: "product design", image: "f996d.png" },
  { name: "Editorial & Print Design", image: "6d91a.png" },
]

export const PROCESS_STEPS: ProcessStep[] = [
  {
    title: "Listen",
    description: "We begin in silence. Understanding comes before creation.",
  },
  {
    title: "Explore",
    description: "We look beyond the obvious. Possibilities become direction.",
  },
  {
    title: "Refine",
    description: "We remove the unnecessary. Every detail has a purpose.",
  },
  {
    title: "Build",
    description: "We turn intention into experience. Thoughtfully, precisely.",
  },
  {
    title: "Reflect",
    description: "We step back, listen again, and make room to evolve.",
  },
]

export const FAQ_QUESTIONS: FaqQuestion[] = [
  {
    question: "What does OFST do?",
    answer:
      "OFST is an independent digital design and development studio working across brand identity, websites, digital products, UX/UI, and mobile apps. Strategy, design, and implementation are considered together so the final experience feels coherent.",
  },
  {
    question: "Who do you work with?",
    answer:
      "We work with ambitious founders and businesses looking to make their brand or digital experience more distinctive, useful, and aligned with where they are going. Every inquiry is considered individually to establish fit.",
  },
  {
    question: "What happens after I get in touch?",
    answer:
      "We begin with a conversation about your goals, audience, constraints, and timing. If the project is a fit, we outline the recommended approach, deliverables, milestones, and commercial terms before work begins.",
  },
  {
    question: "How long does a project take and what does it cost?",
    answer:
      "Both depend on the scope, complexity, and timeline. After we understand the brief, we propose a tailored scope, schedule, and estimate rather than promise a one-size-fits-all package.",
  },
  {
    question: "Does OFST work with clients internationally?",
    answer:
      "Yes. We work with local and international clients, agreeing on communication, feedback, meeting times, and handoff expectations at the start so collaboration stays clear across time zones.",
  },
]

export const PORTRAIT_COLUMNS: PortraitColumn[] = [
  { images: ["b949a.png", "bb312.png"], offset: "pt-[112%]" },
  { images: ["628d1.png", "58684.png"], offset: "" },
  { images: ["e6fb8.png"], offset: "pt-[59%]" },
  { images: ["2c925.png"], offset: "" },
  { images: ["96930.png"], offset: "pt-[59%]" },
  { images: ["24653.png"], offset: "" },
  { images: ["5a6ae.png"], offset: "pt-[59%]" },
  { images: ["cf64c.png", "7420b.png"], offset: "" },
  { images: ["70965.png", "822ba.png"], offset: "pt-[112%]" },
]

export const PARTNER_LOGOS = [
  "ad99d.svg",
  "f0c0b.svg",
  "01080.svg",
  "4344b.svg",
]

export const FOOTER_NAVIGATION = [
  ["Home", "About", "Work", "Services"],
  ["Process", "Contact", "Privacy", "Terms"],
]
