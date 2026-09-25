import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const SITE_URL = "https://wake-big-obadiahs-projects.vercel.app";

export const metadata: Metadata = {
  title: "Wake — Wanjohi Kelvin · Full-Stack Engineer, SaaS · Mobile · AI",
  description:
    "25+ projects across SaaS, mobile, AI, enterprise and fintech — built by Wanjohi Kelvin (Wake), full-stack engineer in Kenya. From first commit to production.",
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "Wake — Wanjohi Kelvin",
    url: SITE_URL,
    description:
      "Full-stack engineer in Kenya building SaaS, mobile and AI products — from first commit to production.",
    mainEntity: {
      "@type": "Person",
      name: "Wanjohi Kelvin",
      alternateName: "Wake",
      url: SITE_URL,
      image: `${SITE_URL}/opengraph-image`,
      jobTitle: "Full-Stack Engineer",
      knowsAbout: [
        "React",
        "Next.js",
        "TypeScript",
        "Laravel",
        "PHP",
        "React Native",
        "PostgreSQL",
        "Supabase",
        "M-Pesa (Daraja)",
        "Stripe",
      ],
      address: { "@type": "PostalAddress", addressCountry: "KE" },
      sameAs: ["https://github.com/mwasobaddy"],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Wake",
    url: SITE_URL,
    description:
      "Portfolio of Wanjohi Kelvin, full-stack engineer in Kenya building SaaS, mobile and AI products.",
    inLanguage: "en",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-ink font-sans text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main className="flex-1">
        <Hero />
        <Ticker />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}