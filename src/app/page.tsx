import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";

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
    </>
  );
}
