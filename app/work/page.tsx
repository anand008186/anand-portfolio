import type { Metadata } from "next";
import Link from "next/link";
import { work } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected engineering work: production AI and CRM systems, agent memory, reproducible debugging, and distributed CI infrastructure.",
  alternates: { canonical: "/work" },
};

export default function WorkIndexPage() {
  return (
    <div className="page-wrap">
      <header className="article-header">
        <p className="kicker">Work</p>
        <h1>Selected work</h1>
        <p className="lede">
          Four pieces. Each is about a class of problem, the constraints, and
          the engineering decisions — not a gallery of technologies. Professional
          work is described without confidential internals.
        </p>
      </header>
      <div className="work-list">
        {work.map((item) => (
          <Link key={item.slug} href={`/work/${item.slug}`} className="work-preview">
            <span className="work-kicker">{item.kicker}</span>
            <span>
              <span className="work-title">{item.title}</span>
              <p className="work-summary">{item.summary}</p>
            </span>
            <span className="work-arrow" aria-hidden="true">
              Read →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
