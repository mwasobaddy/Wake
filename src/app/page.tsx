import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { About } from "@/components/About";
import { Stack } from "@/components/Stack";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";

export const metadata: Metadata = {
  // The layout supplies the title and description; this route only needs its
  // canonical, which metadataBase turns into an absolute URL.
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Work />
      <About />
      <Stack />
      <Testimonials />
      <Contact />
    </>
  );
}
