import Link from "next/link";
import { cta, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-wrap footer-inner">
        <div>
          <p className="footer-name">{site.name}</p>
          <p className="footer-meta">{site.positioning}</p>
        </div>
        <div className="footer-links">
          <Link href={cta.href}>{cta.label}</Link>
          <a href={site.github} rel="noreferrer" target="_blank">
            GitHub
          </a>
          <a href={site.linkedin} rel="noreferrer" target="_blank">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
