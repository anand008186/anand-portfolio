export const site = {
  name: "Anand Ranjan",
  title: "Anand Ranjan — Full-stack & AI Engineer",
  role: "Full-stack & AI Engineer",
  positioning: "AI products · Full-stack systems · Integrations · Reliability",
  headline: "I turn ambitious AI ideas into reliable software.",
  supporting:
    "I help startups design, build, and harden AI products—from the interface and APIs to agents, integrations, infrastructure, and everything production demands.",
  description:
    "Full-stack and AI engineer building production-ready agents, products, integrations, and infrastructure for ambitious startups.",
  current:
    "Currently building production AI systems at Curvo AI. Available for select freelance projects.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "anandranjan789@gmail.com",
  github: "https://github.com/anand008186",
  linkedin: "https://www.linkedin.com/in/anand-ranjan-351b6b201",
  education: {
    school: "IIT Roorkee",
    degree: "B.Tech",
    year: "2024",
  },
  currentRole: {
    title: "Founding Engineer",
    company: "Curvo AI",
  },
  previous: [
    {
      title: "Founding Engineer",
      company: "MonkCI",
    },
  ],
  focus:
    "Increasing focus on AI systems, infrastructure, reliability and security.",
  languages: [
    "TypeScript",
    "JavaScript",
    "Python",
    "Go",
    "SQL",
    "Solidity",
  ],
  stackSupport: [
    "Next.js",
    "React",
    "Node.js",
    "APIs",
    "background processing",
    "distributed systems",
    "cloud infrastructure",
  ],
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
] as const;

export const cta = {
  href: "/discuss",
  label: "Discuss a project",
} as const;
