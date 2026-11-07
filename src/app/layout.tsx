import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { InlineScript } from "@/components/InlineScript";
import { site, siteUrl } from "@/data/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Product engineering studio`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} — Product engineering studio`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Product engineering studio`,
    description: site.description,
  },
};

/** Site-wide entity. Every value here is also visible on the page. */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: siteUrl,
  logo: `${siteUrl}/brand/mark-on-light.svg`,
  description: site.description,
};

/**
 * Runs before first paint so the correct theme is already on <html>. Without
 * this the page paints light, then snaps to dark once React hydrates.
 */
const themeScript = `(function(){var r=document.documentElement;r.classList.add("js");try{var s=localStorage.getItem("theme");var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;r.dataset.theme=d?"dark":"light";}catch(e){r.dataset.theme="light";}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrains.variable}`}
    >
      <head>
        {/* Only a script here — title and meta come from the Metadata API.
            This has to run before paint, or the page renders light and then
            snaps to dark once React hydrates. */}
        <InlineScript html={themeScript} />
      </head>
      <body className="flex min-h-dvh flex-col bg-base text-ink">
        <a
          href="#main"
          className="sr-only rounded-pill bg-blue-fill px-4 py-2 text-sm font-semibold text-on-blue focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
