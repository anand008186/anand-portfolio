import { site } from "@/lib/site";

export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    description: site.description,
    url: site.url,
    sameAs: [site.github, site.linkedin],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Indian Institute of Technology Roorkee",
    },
    knowsAbout: [
      "AI systems",
      "AI agents",
      "production engineering",
      "infrastructure",
      "systems integrations",
      "debugging",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
