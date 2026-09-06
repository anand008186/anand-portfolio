import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { FlowDiagram } from "@/components/FlowDiagram";
import { getAllWriting, getWritingBySlug, getWritingSlugs } from "@/lib/writing";

const components = { FlowDiagram };

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getWritingSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = getWritingBySlug(slug);
    return {
      title: post.title,
      description: post.summary,
      alternates: { canonical: `/writing/${post.slug}` },
    };
  } catch {
    return { title: "Writing" };
  }
}

export default async function WritingPage({ params }: Props) {
  const { slug } = await params;
  const known = getAllWriting().some((post) => post.slug === slug);
  if (!known) notFound();

  const post = getWritingBySlug(slug);

  return (
    <article className="page-wrap">
      <header className="article-header">
        <p className="kicker">Writing</p>
        <h1>{post.title}</h1>
        <p className="lede">{post.summary}</p>
        <p className="meta-row">
          <span>{post.date}</span>
          <span className="badge">{post.status}</span>
        </p>
      </header>
      <div className="prose">
        <MDXRemote source={post.content} components={components} />
      </div>
    </article>
  );
}
