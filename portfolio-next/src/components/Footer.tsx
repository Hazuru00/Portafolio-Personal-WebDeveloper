'use client';

import Link from 'next/link';
import { FaGithub, FaLinkedin, FaArrowUp } from 'react-icons/fa';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Sobre mí', href: '#about' },
  { name: 'Proyectos', href: '#projects' },
  { name: 'Contacto', href: '#contact' },
];

const socials = [
  { name: 'GitHub', href: 'https://github.com/hazuru00', Icon: FaGithub },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/miguel-angel-vallejo-604928225/',
    Icon: FaLinkedin,
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <Link
              href="#home"
              className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-zinc-50 to-zinc-400"
            >
              HazuDev<span className="text-violet-400">.</span>
            </Link>
            <p className="mt-2 text-sm text-zinc-500 max-w-xs">
              Desarrollador fullstack semi senior, enfocado en rendimiento, accesibilidad y experiencias web cuidadas.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-zinc-400 transition-colors duration-300 hover:text-violet-400"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {socials.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} de Hazuru`}
                className="text-zinc-400 transition-colors duration-300 hover:text-violet-400"
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-zinc-800/70 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500 text-center sm:text-left">
            © {year} HazuDev. Todos los derechos reservados.
          </p>
          <button
            onClick={scrollTop}
            aria-label="Volver arriba"
            className="p-2 rounded-full border border-zinc-700 text-zinc-400 transition-all duration-300 hover:border-violet-500 hover:text-violet-400"
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
}
