import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-ink font-sans text-foreground">
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