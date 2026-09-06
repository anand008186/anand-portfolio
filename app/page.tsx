import Link from "next/link";
import { CtaLink } from "@/components/ui";
import { engagements } from "@/lib/engagements";
import { now } from "@/lib/now";
import { principles } from "@/lib/principles";
import { site } from "@/lib/site";
import { work } from "@/lib/work";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="page-wrap">
          <p className="kicker">{site.name}</p>
          <p className="kicker" style={{ marginTop: "-0.4rem" }}>
            {site.role}
          </p>
          <h1>{site.headline}</h1>
          <p className="lede">{site.supporting}</p>
          <p className="meta-row">
            <span>Agents</span>
            <span>Infrastructure</span>
            <span>Integrations</span>
            <span>Reliability</span>
          </p>
          <p className="lede" style={{ marginTop: "-0.5rem" }}>
            {site.current}
          </p>
          <div className="hero-actions">
            <CtaLink />
            <Link href="/work" className="btn btn-secondary">
              View selected work
            </Link>
            <div className="subtle-links">
              <a href={site.github} rel="noreferrer" target="_blank">
                GitHub
              </a>
              <a href={site.linkedin} rel="noreferrer" target="_blank">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="page-wrap">
          <h2>Signals</h2>
          <div className="proof-grid">
            <div className="proof-item">
              <strong>Founding engineer</strong>
              <p>
                Currently at Curvo AI. Previously founding engineer at MonkCI.
                Startup engineering, not spectator architecture.
              </p>
            </div>
            <div className="proof-item">
              <strong>IIT Roorkee, B.Tech 2024</strong>
              <p>
                Production work across AI, product engineering, and earlier
                full-stack and blockchain systems.
              </p>
            </div>
            <div className="proof-item">
              <strong>AI + systems breadth</strong>
              <p>
                Agents, integrations, backends, infrastructure, and the
                debugging in between — with TypeScript, Python, Go, and SQL as
                supporting evidence, not a logo wall.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="work">
        <div className="page-wrap">
          <h2>Selected work</h2>
          <p className="lede">
            Engineering judgment under constraints — not a grid of weekend
            projects. Company work is abstracted to respect confidentiality.
          </p>
          <div className="work-list">
            {work.map((item) => (
              <Link key={item.slug} href={`/work/${item.slug}`} className="work-preview">
                <span className="work-kicker">{item.kicker}</span>
                <span>
                  <span className="work-title">{item.title}</span>
                  <p className="work-summary">{item.problemOneLiner}</p>
                </span>
                <span className="work-arrow" aria-hidden="true">
                  Read →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="page-wrap">
          <h2>How I think about engineering</h2>
          <div className="principle-list">
            {principles.map((item) => (
              <article key={item.title} className="principle">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="work-with-me">
        <div className="page-wrap">
          <h2>Work with me</h2>
          <p className="lede">
            I occasionally take on focused engineering engagements for startups
            and engineering teams working on AI systems, integrations, difficult
            production issues and early-stage infrastructure.
          </p>
          <div className="engagement-grid">
            {engagements.map((item) => (
              <article key={item.title} className="card">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <div className="hero-actions" style={{ marginTop: "1.5rem" }}>
            <CtaLink />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="page-wrap">
          <h2>Now</h2>
          <div className="now-grid">
            <article className="now-card">
              <h3>Building</h3>
              <p>{now.building}</p>
            </article>
            <article className="now-card">
              <h3>Exploring</h3>
              <ul className="chips">
                {now.exploring.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
