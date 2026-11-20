'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, useReducedMotion } from 'framer-motion';

// Terminal simulado: la página se "pierde" como un comando perdido en la consola
const terminalLines = [
  { prompt: true, text: 'hazu@portfolio:~$ cd /pagina-que-no-existe' },
  { prompt: false, text: 'bash: cd: /pagina-que-no-existe: No such file or directory' },
  { prompt: true, text: 'hazu@portfolio:~$ find / -name "404"' },
  { prompt: false, text: 'find: no se encontró nada por aquí... solo tú, perdido en el abismo.' },
];

export default function NotFound() {
  const reduceMotion = useReducedMotion();
  const consoleRef = useRef<HTMLDivElement>(null);
  const consoleInView = useInView(consoleRef, { once: true, amount: 0.5 });
  const [glitchKey, setGlitchKey] = useState(0);

  // Glitch periódico del "404" (se salta si el usuario prefiere menos movimiento)
  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setGlitchKey((k) => k + 1), 4000);
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    <main className="relative min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center px-4 py-24 overflow-hidden">
      {/* Fondo: glows + rejilla tenue */}
      <div className="absolute inset-0 bg-grid-zinc-800/40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center">
        {/* 404 con glitch de aberración cromática */}
        <motion.div
          key={glitchKey}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative select-none cursor-default"
          aria-hidden="true"
        >
          <span
            data-text="404"
            className="glitch text-[7rem] sm:text-[10rem] leading-none font-bold font-mono bg-clip-text text-transparent bg-gradient-to-b from-zinc-50 to-zinc-400"
          >
            404
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: 'easeOut' }}
          className="text-2xl sm:text-3xl font-bold text-zinc-100 mt-2"
        >
          Página no encontrada
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
          className="text-zinc-400 mt-3 max-w-md"
        >
          El enlace está roto o la página se mudó. Mira lo que dejó la consola:
        </motion.p>

        {/* Terminal con las líneas apareciendo escalonadamente */}
        <motion.div
          ref={consoleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={consoleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.7, ease: 'easeOut' }}
          className="w-full max-w-lg mt-8 rounded-xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/50 text-left"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-900">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-xs text-zinc-500 font-mono">hazuru — bash — 404</span>
          </div>
          <div className="p-4 font-mono text-[13px] leading-relaxed space-y-1.5">
            {terminalLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0 }}
                animate={consoleInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.7 + i * 0.35, duration: 0.25 }}
                className={line.prompt ? 'text-zinc-300' : 'text-red-400/90'}
              >
                {line.text}
              </motion.p>
            ))}
            <motion.p
              initial={{ opacity: 0 }}
              animate={consoleInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 + terminalLines.length * 0.35, duration: 0.25 }}
              className="text-zinc-300"
            >
              hazu@portfolio:~$ <span className="caret" aria-hidden="true" />
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-3 bg-violet-600 text-white font-bold py-3 px-7 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-violet-500 shadow-lg shadow-violet-800/20 focus:outline-none focus:ring-4 focus:ring-violet-500/50"
          >
            Volver al inicio
          </Link>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-3 border border-zinc-700 text-zinc-300 font-bold py-3 px-7 rounded-lg transition-all duration-300 hover:border-violet-500 hover:text-violet-300 focus:outline-none focus:ring-4 focus:ring-violet-500/30"
          >
            Ver proyectos
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
