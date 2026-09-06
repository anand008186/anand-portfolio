import type { Metadata } from "next";
import { CtaLink } from "@/components/ui";
import { now } from "@/lib/now";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}: founding engineer working where AI meets production software.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="page-wrap">
      <header className="article-header">
        <p className="kicker">About</p>
        <h1>{site.name}</h1>
        <p className="lede">
          {site.role}. {site.positioning}.
        </p>
      </header>
      <div className="prose">
        <p>
          I build and fix systems where AI meets production software. The useful
          work is usually poorly specified: an agent that almost works, an
          integration that fails under retries, a prototype that cannot survive
          real traffic, a bug that only appears when two systems disagree about
          time or identity.
        </p>
        <p>
          I am a founding engineer at Curvo AI, working on production AI
          systems. I was previously a founding engineer at MonkCI. I studied at
          IIT Roorkee (B.Tech, 2024). Earlier work crossed AI, blockchain, and
          full-stack product engineering. The current focus is AI systems,
          infrastructure, reliability, and security.
        </p>
        <p>
          Founders and engineering leaders usually hire me when they need
          ownership, not a ticket-taker: someone who can take an ambiguous
          problem, make the failure reproducible, and ship a system that still
          works after the demo.
        </p>
        <h2>Background</h2>
        <ul>
          <li>
            {site.currentRole.title}, {site.currentRole.company} — current
          </li>
          {site.previous.map((role) => (
            <li key={role.company}>
              {role.title}, {role.company} — previous
            </li>
          ))}
          <li>
            {site.education.school}, {site.education.degree}, {site.education.year}
          </li>
        </ul>
        <h2>How I work</h2>
        <p>
          Lead with the problem and the constraints. Write down failure modes.
          Prefer boring orchestration. Put evidence in storage before you ask a
          model to speak. Leave a harness so the next failure is cheaper.
        </p>
        <h2>Now</h2>
        <p>
          <strong>Building.</strong> {now.building}
        </p>
        <p>
          <strong>Exploring.</strong> {now.exploring.join(", ")}.
        </p>
        <h2>Stack, as evidence</h2>
        <p>
          {[...site.languages].join(", ")}; {[...site.stackSupport].join(", ")}.
          These are tools. The work is production systems.
        </p>
        <h2>Contact</h2>
        <p>
          The conversion path is a single one: discuss a project. GitHub and
          LinkedIn are public.
        </p>
      </div>
      <div className="hero-actions" style={{ marginTop: "1.5rem" }}>
        <CtaLink />
        <a className="btn btn-secondary" href={site.github} rel="noreferrer" target="_blank">
          GitHub
        </a>
        <a className="btn btn-secondary" href={site.linkedin} rel="noreferrer" target="_blank">
          LinkedIn
        </a>
      </div>
    </div>
  );
}
