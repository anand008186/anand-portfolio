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
        <h1>What are you trying to build or fix?</h1>
        <p className="lede">
          Share the problem, the context, and where you are stuck. I take on
          focused AI product builds, integrations, architecture reviews, and
          prototype-to-production work. If I can help, I’ll suggest a practical
          next step.
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
        .
      </p>
    </div>
  );
}
