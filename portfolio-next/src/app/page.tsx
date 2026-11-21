import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Stats from "@/components/sections/Stats";
import GitHubActivity from "@/components/sections/GitHubActivity";
import TechMarquee from "@/components/sections/TechMarquee";
import Projects from "@/components/sections/Projects";
import RecentRepos from "@/components/sections/RecentRepos";
import Contact from "@/components/sections/Contact";
import { fetchGitHubData } from "@/lib/github";

export default async function Home() {
  // Si GitHub no responde, las secciones simplemente no se muestran
  const { stats, repos, calendar } = await fetchGitHubData();

  return (
    <div className="bg-zinc-950 text-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Stats />
        <GitHubActivity
          github={stats}
          calendarWeeks={calendar?.weeks.map((w) => w.contributionDays) ?? null}
          totalCalendarContributions={calendar?.totalContributions ?? 0}
        />
        <TechMarquee />
        <Projects />
        <RecentRepos repos={repos} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
