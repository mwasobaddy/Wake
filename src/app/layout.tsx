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

export const metadata: Metadata = {
  title: "WAKE — Wanjohi Kelvin",
  description:
    "Full-stack engineer building SaaS, mobile & AI products — from first commit to production.",
  keywords: [
    "Wanjohi Kelvin",
    "mwasobaddy",
    "Wake",
    "full-stack engineer",
    "Next.js",
    "Laravel",
    "React Native",
    "Kenya",
  ],
  openGraph: {
    title: "WAKE — Wanjohi Kelvin",
    description:
      "Full-stack engineer building SaaS, mobile & AI products — from first commit to production.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
};

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