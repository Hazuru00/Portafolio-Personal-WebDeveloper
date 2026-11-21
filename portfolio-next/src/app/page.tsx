import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Stats from "@/components/sections/Stats";
import TechMarquee from "@/components/sections/TechMarquee";
import Projects from "@/components/sections/Projects";
import RecentRepos from "@/components/sections/RecentRepos";
import Contact from "@/components/sections/Contact";
import { fetchGitHubData } from "@/lib/github";

export default async function Home() {
  // Si GitHub no responde, stats y repos simplemente no se muestran
  const { stats, repos } = await fetchGitHubData();

  return (
    <div className="bg-zinc-950 text-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Stats github={stats} />
        <TechMarquee /> 
        <Projects />
        <RecentRepos repos={repos} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
