import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { PersonJsonLd } from "@/components/PersonJsonLd";
import { site } from "@/lib/site";
import "./globals.css";

const sans = Geist({
  variable: "--font-sans-family",
  subsets: ["latin"],
});

const serif = Source_Serif_4({
  variable: "--font-serif-family",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const mono = Geist_Mono({
  variable: "--font-mono-family",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${mono.variable} h-full`}
    >
      <body className="site-shell antialiased">
        <PersonJsonLd />
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="content" className="site-main">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
