export const site = {
  name: "Anand Ranjan",
  title: "Anand Ranjan — Founding Engineer",
  role: "Founding Engineer",
  positioning: "AI Systems · Production Engineering · Infrastructure · Integrations",
  headline: "I build systems where AI meets production software.",
  supporting:
    "I work across AI agents, full-stack systems, integrations, reliability, infrastructure and developer tooling — turning ambiguous engineering problems into production systems.",
  description:
    "Founding engineer working at the intersection of AI systems and production software. Available for focused freelance and consulting engagements in agents, integrations, infrastructure, and difficult debugging.",
  current:
    "Currently building production AI systems at Curvo AI.",
  locationNote: "TODO: add location / timezone if you want it public.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
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
