'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { FaReact, FaNodeJs, FaVuejs, FaGitAlt, FaDocker, FaPython, FaGithub, FaVest } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiMongodb, SiTailwindcss, SiFramer, SiFirebase, SiVercel, SiPostman, SiFigma, SiPnpm, SiFastapi, SiN8N, SiOllama, SiGnubash } from 'react-icons/si';

// GSAP Logo SVG Component
const GsapLogo = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path fill="currentColor" d="M448 96v320h-64V234.4L224 429.6 64 234.4V416H0V96h64v123.6l160 197.2 160-197.2V96h64z"/>
  </svg>
);

// OpenCode Logo SVG Component
const OpenCodeLogo = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
    <line x1="14" y1="4" x2="10" y2="20"></line>
  </svg>
);

const technologies = [
  { Icon: FaReact, name: 'React' },
  { Icon: SiNextdotjs, name: 'Next.js' },
  { Icon: FaVuejs, name: 'Vue.js' },
  { Icon: SiTypescript, name: 'TypeScript' },
  { Icon: FaNodeJs, name: 'Node.js' },
  { Icon: SiMongodb, name: 'MongoDB' },
  { Icon: GsapLogo, name: 'GSAP' },
  { Icon: SiTailwindcss, name: 'Tailwind CSS' },
  { Icon: SiFramer, name: 'Framer Motion' },
  { Icon: SiFirebase, name: 'Firebase' },
  { Icon: FaGitAlt, name: 'Git' },
  { Icon: SiVercel, name: 'Vercel' },
  { Icon: SiPostman, name: 'Postman' },
  { Icon: SiFigma, name: 'Figma' },
  { Icon: FaDocker, name: 'Docker' },
  { Icon: FaPython, name: 'Python' },
  { Icon: SiPnpm, name: 'pnpm' },
  { Icon: SiFastapi, name: 'FastAPI' },
  { Icon: SiGnubash, name: 'Bash' },
  { Icon: OpenCodeLogo, name: 'OpenCode' },
  { Icon: FaDocker, name: 'Docker Compose' },
  { Icon: FaGithub, name: 'GitHub Actions' },
  { Icon: FaVest, name: 'Testing' },
];

const TechMarquee = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const distance = marquee.scrollWidth / 2;

    gsap.to(marquee, {
      x: -distance,
      duration: 40,
      ease: 'linear',
      repeat: -1,
    });
  }, { scope: marqueeRef });

  return (
    <section className="py-16 sm:py-24 bg-zinc-900/50 border-y border-zinc-800/70 overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-zinc-800/30 [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]"></div>
        <div className="max-w-7xl mx-auto text-center mb-12 px-4 sm:px-6 lg:px-8">
             <h3 className="text-3xl sm:text-4xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-zinc-50 to-zinc-300">
                Tecnologías con las que Trabajo
            </h3>
            <p className="text-lg text-zinc-400 mt-2 max-w-2xl mx-auto">
                Siempre aprendiendo y mejorando mis habilidades con las mejores herramientas.
            </p>
        </div>
      <div ref={wrapperRef} className="overflow-hidden whitespace-nowrap">
        <div ref={marqueeRef} className="flex">
          {[...technologies, ...technologies].map(({ Icon, name }, index) => (
            <div key={index} className="flex items-center mx-6 sm:mx-8 group shrink-0">
              <Icon className="text-4xl sm:text-5xl text-zinc-400 transition-colors duration-300 group-hover:text-violet-400" />
              <span className="ml-4 text-lg sm:text-xl font-semibold text-zinc-400 transition-colors duration-300 group-hover:text-white">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechMarquee;
