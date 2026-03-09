'use client';

import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import TechMarquee from "@/components/sections/TechMarquee";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="bg-zinc-950 text-white">
      <Header />
      <main>
        <Hero />
        <About />
        <TechMarquee /> 
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
