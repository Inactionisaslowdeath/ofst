export interface ProjectCard {
  src: string
  alt: string
}

export interface ProjectDetailData {
  title: string
  statement: string
  year: string
  client: string
  website: string
  websiteUrl: string
  whatIsAbout: string[]
  heroImage: string
  heroAlt: string
  cards: ProjectCard[]
}

export interface ProjectItem {
  id: number
  name: string
  image: string
  alt?: string
  slug?: string
  category?: string
  detail?: ProjectDetailData
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
    slug: "void",
    category: "product Design",
    detail: {
      title: "void®",
      statement:
        "void is a luxury packaging series exploring visceral\nphysical forms, sustainable tactile materials, and the beauty\nof architectural emptiness.",
      year: "2024",
      client: "void Labs",
      website: "void.packaging",
      websiteUrl: "https://void.packaging",
      whatIsAbout: [
        "void required an identity rejecting traditional consumer forms",
        "while elevating product tactility. We developed a hyper-minimalist,",
        "deconstructed physical structure, using raw dyed pulps and",
        "precision cast silhouettes that subtly change over time.",
        "Custom embossing creates tactile discovery, echoing quiet tension",
        "between container and contents. This work set a new benchmark,",
        "featured in several contemporary design exhibitions.",
      ],
      heroImage: "/assets/projects/void/hero.png",
      heroAlt: "void packaging series packaging mockup and red bottle",
      cards: [
        {
          src: "/assets/projects/void/card1.png",
          alt: "void material texture and unboxing structure",
        },
        {
          src: "/assets/projects/void/card2.png",
          alt: "void typography and embossed detailing",
        },
        {
          src: "/assets/projects/void/card3.png",
          alt: "void packaging volume and tactile surface",
        },
        {
          src: "/assets/projects/void/card4.png",
          alt: "void product presentation in matte finish",
        },
      ],
    },
  },
  {
    id: 1,
    name: "offset studio",
    image: "cbc79.png",
    alt: "offset studio — orange poster mockup on metallic frame",
    slug: "offset-studio",
    category: "Editorial & Print Design",
    detail: {
      title: "offset studio",
      statement:
        "Offset Studio is an independent creative workshop crafting\nsignage systems, physical exhibition spaces, and experimental\nvisual identities worldwide.",
      year: "2024",
      client: "Offset Collective",
      website: "offset.studio",
      websiteUrl: "https://offset.studio",
      whatIsAbout: [
        "Offset Studio needed an expressive visual grammar rooted in",
        "print heritage and dynamic spatial geometry. We engineered a",
        "bold structural grid paired with utilitarian industrial materials,",
        "creating dialogue between screen and architectural environment.",
        "Interactive physical signage responds to sunlight and movement,",
        "challenging static institutional design norms. The identity",
        "was recognized globally across international typography annuals.",
      ],
      heroImage: "/assets/projects/offset-studio/hero.png",
      heroAlt: "offset studio poster mockup with vivid orange grid",
      cards: [
        {
          src: "/assets/projects/offset-studio/card1.png",
          alt: "offset studio brand guidelines and typography",
        },
        {
          src: "/assets/projects/offset-studio/card2.png",
          alt: "offset studio printed stationery and editorial spreads",
        },
        {
          src: "/assets/projects/offset-studio/card3.png",
          alt: "offset studio physical exhibition installation",
        },
        {
          src: "/assets/projects/offset-studio/card4.png",
          alt: "offset studio digital system and responsive canvas",
        },
      ],
    },
  },
  {
    id: 2,
    name: "null.al",
    image: "35ff7.png",
    alt: "null.al — sleek industrial audio device with dial",
    slug: "null-ai",
    category: "Digital Design",
    detail: {
      title: "null.al",
      statement:
        "Stealth AI is a cutting-edge startup focused on developing\nadvanced AI solutions, aiming to differentiate itself from\ntraditional corporate aesthetics.",
      year: "2023",
      client: "Stealth AI",
      website: "nullai.tech",
      websiteUrl: "https://nullai.tech",
      whatIsAbout: [
        "Stealth AI required an identity that rejects traditional corporate",
        "aesthetics while embracing the unknown. We developed a hyper-",
        "minimalist, deconstructed type system, using AI-generated glyphs",
        "that subtly change over time. Invisible elements appear on hover,",
        "mimicking the way AI processes hidden data. This innovative",
        "approach made the brand a case study in speculative design,",
        "featured in several design exhibitions.",
      ],
      heroImage: "/assets/projects/null-ai/hero.png",
      heroAlt: "null.al industrial device",
      cards: [
        { src: "/assets/projects/null-ai/card1.png", alt: "null.al detail 1" },
        { src: "/assets/projects/null-ai/card2.png", alt: "null.al detail 2" },
        { src: "/assets/projects/null-ai/card3.png", alt: "null.al detail 3" },
        { src: "/assets/projects/null-ai/card4.png", alt: "null.al detail 4" },
      ],
    },
  },
  {
    id: 3,
    name: "monolith™",
    image: "56261.png",
    alt: "monolith studio display mockup in architectural setting",
    slug: "monolith",
    category: "Brand Identity",
    detail: {
      title: "monolith™",
      statement:
        "Monolith is a hardware brand pioneering tactile digital\nmonitors, ambient interfaces, and computational sculpture\nfor creative practitioners.",
      year: "2023",
      client: "Monolith Industries",
      website: "monolith.systems",
      websiteUrl: "https://monolith.systems",
      whatIsAbout: [
        "Monolith required a brand language celebrating cast aluminum,",
        "raw glass, and quiet computational power. We designed a hyper-",
        "minimalist, austere visual architecture combining mathematical",
        "type scales with brutalist staging. The display bezels dissolve",
        "into ambient darkness, merging hardware seamlessly into space.",
        "This innovative approach made the brand a modern benchmark,",
        "featured in several industrial design retrospectives.",
      ],
      heroImage: "/assets/projects/monolith/hero.png",
      heroAlt: "monolith studio display hardware mockup",
      cards: [
        {
          src: "/assets/projects/monolith/card1.png",
          alt: "monolith hardware casting and aluminum texture",
        },
        {
          src: "/assets/projects/monolith/card2.png",
          alt: "monolith editorial imagery and architectural lighting",
        },
        {
          src: "/assets/projects/monolith/card3.png",
          alt: "monolith interface typography and dial precision",
        },
        {
          src: "/assets/projects/monolith/card4.png",
          alt: "monolith complete studio display setup",
        },
      ],
    },
  },
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
