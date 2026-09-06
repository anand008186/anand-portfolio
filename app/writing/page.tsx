import type { Metadata } from "next";
import Link from "next/link";
import { getAllWriting } from "@/lib/writing";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes on agent memory, harness engineering, integrations, and production AI systems.",
  alternates: { canonical: "/writing" },
};

export default function WritingIndexPage() {
  const posts = getAllWriting();

  return (
    <div className="page-wrap">
      <header className="article-header">
        <p className="kicker">Writing</p>
        <h1>Notes from building real systems</h1>
        <p className="lede">
          Working notes on memory, reproducibility, integrations, infrastructure,
          and what production teaches us about AI engineering.
        </p>
      </header>
      {posts.length === 0 ? (
        <p className="empty-state">No writing published yet.</p>
      ) : (
        <div>
          {posts.map((post) => (
            <article key={post.slug} className="writing-item">
              <p className="work-kicker">
                {post.date} · <span className="badge">{post.status}</span>
              </p>
              <h2>
                <Link href={`/writing/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="muted">{post.summary}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
