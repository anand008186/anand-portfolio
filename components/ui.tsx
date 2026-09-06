import Link from "next/link";
import type { Route } from "next";
import type { ReactNode } from "react";
import { cta } from "@/lib/site";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`page-wrap ${className}`.trim()}>{children}</div>;
}

export function CtaLink({
  className = "",
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Link href={cta.href} className={`btn btn-primary ${className}`.trim()}>
      {children ?? cta.label}
    </Link>
  );
}

export function TextLink({
  href,
  children,
  external,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  if (href.startsWith("/")) {
    return (
      <Link href={href as Route} className="text-link">
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className="text-link"
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
