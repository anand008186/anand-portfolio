"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useState } from "react";
import { cta, nav, site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();

  return (
    <header className="site-header">
      <div className="page-wrap header-inner">
        <Link
          href="/"
          className="wordmark"
          aria-label={`${site.name}, home`}
          onClick={() => setOpen(false)}
        >
          <span className="wordmark-mark" aria-hidden="true">AR</span>
          <span className="wordmark-name">{site.name}</span>
        </Link>
        <nav className="nav-desktop" aria-label="Primary">
          <ul>
            {nav.map((item) => {
              const current =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="header-actions">
          <Link href={cta.href} className="btn btn-primary btn-compact">
            <span className="cta-label-full">{cta.label}</span>
            <span className="cta-label-short">Let’s talk</span>
          </Link>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true">{open ? "Close" : "Menu"}</span>
          </button>
        </div>
      </div>
      <div
        id={menuId}
        className={`nav-mobile ${open ? "is-open" : ""}`}
        hidden={!open}
      >
        <nav aria-label="Mobile">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={cta.href} onClick={() => setOpen(false)}>
                {cta.label}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
