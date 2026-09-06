import Link from "next/link";
import { CtaLink } from "@/components/ui";
import { engagements } from "@/lib/engagements";
import { principles } from "@/lib/principles";
import { site } from "@/lib/site";
import { work } from "@/lib/work";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="page-wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="availability-dot" aria-hidden="true" />
              Available for select projects
            </p>
            <h1>{site.headline}</h1>
            <p className="lede hero-lede">{site.supporting}</p>
            <div className="hero-actions">
              <CtaLink>Start a conversation <span aria-hidden="true">↗</span></CtaLink>
              <Link href="/work" className="btn btn-secondary">
                Explore my work
              </Link>
            </div>
          </div>
          <aside className="hero-console" aria-label="Engineering focus">
            <div className="console-bar">
              <span>anand.engineer</span>
              <span className="console-status">online</span>
            </div>
            <div className="console-body">
              <p className="console-comment">{"// what I bring to the table"}</p>
              <div className="console-line"><span>01</span><strong>AI products & agents</strong></div>
              <div className="console-line"><span>02</span><strong>Full-stack engineering</strong></div>
              <div className="console-line"><span>03</span><strong>Integrations & infrastructure</strong></div>
              <div className="console-line"><span>04</span><strong>Production reliability</strong></div>
            </div>
            <div className="console-footer">
              <span>IIT Roorkee · B.Tech 2024</span>
              <span>TypeScript · Python · Go</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="credibility-strip" aria-label="Experience highlights">
        <div className="page-wrap credibility-grid">
          <p><span>Now</span> Founding engineer at Curvo AI</p>
          <p><span>Before</span> Founding engineer at MonkCI</p>
          <p><span>Focus</span> AI systems built for production</p>
          <p><span>Base</span> India · working globally</p>
        </div>
      </section>

      <section className="section" id="work">
        <div className="page-wrap section-grid">
          <div className="section-intro">
            <p className="section-index">01 / Selected work</p>
            <h2>Complex systems, made dependable.</h2>
            <p>
              A closer look at the architecture, tradeoffs, and engineering
              judgment behind the work. Professional details are kept public-safe.
            </p>
          </div>
          <div className="work-list featured-work-list">
            {work.map((item, index) => (
              <Link key={item.slug} href={`/work/${item.slug}`} className="work-preview">
                <span className="work-kicker">0{index + 1}</span>
                <span>
                  <span className="work-title">{item.title}</span>
                  <p className="work-summary">{item.problemOneLiner}</p>
                </span>
                <span className="work-arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark" id="work-with-me">
        <div className="page-wrap">
          <div className="section-heading-row">
            <div className="section-intro">
              <p className="section-index">02 / Work with me</p>
              <h2>Senior execution without the hiring cycle.</h2>
            </div>
            <p className="section-side-copy">
              Focused engagements for startups that need an experienced builder
              to own a meaningful technical outcome.
            </p>
          </div>
          <div className="engagement-grid">
            {engagements.map((item) => (
              <article key={item.title} className="service-card">
                <span className="service-number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <p className="service-fit">{item.fit}</p>
              </article>
            ))}
          </div>
          <div className="section-cta">
            <p>Have a different problem? The best projects rarely fit a template.</p>
            <CtaLink>Tell me about it <span aria-hidden="true">↗</span></CtaLink>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="page-wrap section-grid">
          <div className="section-intro">
            <p className="section-index">03 / How I work</p>
            <h2>Built with production in mind from day one.</h2>
            <p>
              Fast iteration matters. So do the details that keep software useful
              after launch: clear boundaries, observability, and reproducible failures.
            </p>
          </div>
          <div className="principle-list">
            {principles.slice(0, 4).map((item, index) => (
              <article key={item.title} className="principle">
                <span className="principle-number">0{index + 1}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="closing-cta">
        <div className="page-wrap closing-cta-inner">
          <p className="section-index">Let’s build something useful</p>
          <h2>Bring me the ambitious idea or the stubborn problem.</h2>
          <p>
            I’ll help turn it into a clear plan and dependable software.
          </p>
          <div className="hero-actions">
            <CtaLink>Discuss a project <span aria-hidden="true">↗</span></CtaLink>
            <a href={site.linkedin} className="btn btn-secondary" rel="noreferrer" target="_blank">
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
