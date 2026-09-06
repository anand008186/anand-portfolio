import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { cta, site } from "@/lib/site";

export const metadata: Metadata = {
  title: cta.label,
  description:
    "Start a conversation about AI systems, integrations, production rescue, or prototype-to-production work.",
  alternates: { canonical: "/discuss" },
};

export default function DiscussPage() {
  return (
    <div className="page-wrap">
      <header className="article-header">
        <p className="kicker">{cta.label}</p>
        <h1>Tell me what is broken or what you need built.</h1>
        <p className="lede">
          I occasionally take focused engagements: production rescue, agent
          sprints, integrations, architecture reviews, and hardening prototypes.
          No account required. If the work is not a fit, I will say so.
        </p>
      </header>
      <EnquiryForm />
      <p className="note">
        Also:{" "}
        <a className="text-link" href={site.linkedin} rel="noreferrer" target="_blank">
          LinkedIn
        </a>{" "}
        and{" "}
        <a className="text-link" href={site.github} rel="noreferrer" target="_blank">
          GitHub
        </a>
        . Public email is configured via <code>NEXT_PUBLIC_CONTACT_EMAIL</code>{" "}
        at deploy time.
      </p>
    </div>
  );
}
