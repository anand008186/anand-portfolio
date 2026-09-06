import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FlowDiagram } from "@/components/FlowDiagram";
import { CtaLink } from "@/components/ui";
import { getWork, getWorkSlugs } from "@/lib/work";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getWorkSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) return { title: "Work" };
  return {
    title: item.title,
    description: item.summary,
    alternates: { canonical: `/work/${item.slug}` },
  };
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) notFound();

  return (
    <article className="page-wrap">
      <header className="article-header">
        <p className="kicker">{item.kicker}</p>
        <h1>{item.title}</h1>
        <p className="lede">{item.summary}</p>
        <p className="meta-row">
          <span className="badge">{item.status}</span>
          {item.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </p>
        {item.confidentialityNote ? (
          <p className="note">{item.confidentialityNote}</p>
        ) : null}
      </header>

      {item.diagram ? <FlowDiagram id={item.diagram} /> : null}

      <div className="prose">
        {item.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </section>
        ))}
        <h2>Outcome</h2>
        <p>{item.outcome}</p>
      </div>

      <div className="hero-actions" style={{ marginTop: "2rem" }}>
        <CtaLink />
      </div>
    </article>
  );
}
