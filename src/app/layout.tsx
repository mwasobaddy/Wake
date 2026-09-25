import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const SITE_URL = "https://wake-big-obadiahs-projects.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Wake — Wanjohi Kelvin · Full-Stack Engineer, SaaS · Mobile · AI",
    template: "%s — Wake · Wanjohi Kelvin",
  },
  description:
    "Portfolio of Wanjohi Kelvin (Wake), a full-stack engineer in Kenya building SaaS, mobile and AI products — from first commit to production. 25+ projects, live on GitHub.",
  keywords: [
    "Wanjohi Kelvin",
    "mwasobaddy",
    "Wake",
    "full-stack engineer Kenya",
    "software developer Nairobi",
    "Next.js developer",
    "Laravel developer Kenya",
    "React, Native developer",
    "AI engineer Africa",
    "portfolio",
  ],
  applicationName: "Wake",
  authors: [{ name: "Wanjohi Kelvin", url: "https://github.com/mwasobaddy" }],
  creator: "Wanjohi Kelvin",
  publisher: "Wanjohi Kelvin",
  category: "technology",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Wake",
    title: "Wake — Wanjohi Kelvin · Full-Stack Engineer",
    description:
      "Full-stack engineer in Kenya building SaaS, mobile and AI products — from first commit to production.",
    locale: "en_US",
    countryName: "Kenya",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wake — Wanjohi Kelvin · Full-Stack Engineer",
    description:
      "Full-stack engineer in Kenya building SaaS, mobile and AI products — from first commit to production.",
  },
  appleWebApp: {
    title: "Wake",
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${space.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}