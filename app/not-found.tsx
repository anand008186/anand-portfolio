import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-wrap">
      <header className="article-header">
        <p className="kicker">404</p>
        <h1>This page is not here.</h1>
        <p className="lede">
          The URL may be wrong, or the piece has not been published yet.
        </p>
        <div className="hero-actions">
          <Link href="/" className="btn btn-primary">
            Home
          </Link>
          <Link href="/work" className="btn btn-secondary">
            Selected work
          </Link>
        </div>
      </header>
    </div>
  );
}
