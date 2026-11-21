'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaStar } from 'react-icons/fa';
import type { RepoInfo } from '@/lib/github';

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572a5',
  Dart: '#00b4ab',
  Rust: '#dea584',
  Go: '#00add8',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Vue: '#41b883',
  Svelte: '#ff3e00',
};

function formatRelativeDate(isoDate: string): string {
  const d = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'hoy';
  if (diffDays === 1) return 'ayer';
  if (diffDays < 7) return `hace ${diffDays} días`;
  if (diffDays < 30) return `hace ${Math.floor(diffDays / 7)} semanas`;
  if (diffDays < 365) return `hace ${Math.floor(diffDays / 30)} meses`;
  return `hace ${Math.floor(diffDays / 365)} años`;
}

// Repositorios del perfil público; vacío si GitHub no está disponible
export default function RecentRepos({ repos }: { repos: RepoInfo[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  if (repos.length === 0) return null;

  return (
    <motion.section
      ref={sectionRef}
      id="repos"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-zinc-800/70 bg-zinc-950/40"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-zinc-50 to-zinc-300">
            Repositorios Recientes
          </h2>
          <p className="text-lg sm:text-xl text-violet-400 mt-2 max-w-2xl mx-auto">
            En vivo desde GitHub · ordenados por último push · se actualiza cada 24 h.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {repos.map((repo, index) => {
            const isToday = repo.lastPush ? new Date(repo.lastPush).toDateString() === new Date().toDateString() : false;
            const relativeDate = repo.lastPush ? formatRelativeDate(repo.lastPush) : formatRelativeDate(repo.updatedAt);

            return (
              <motion.article
                key={repo.name}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
                className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex flex-col transition-all duration-300 hover:border-violet-700/80 hover:shadow-lg hover:shadow-violet-900/20"
              >
                <div className="flex items-start justify-between gap-3">
                  <a
                    href={repo.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-lg font-bold text-zinc-100 break-all transition-colors duration-300 hover:text-violet-400"
                  >
                    <FaGithub className="shrink-0 text-zinc-500" size={18} />
                    {repo.name}
                  </a>
                  <span className="inline-flex shrink-0 items-center gap-1 text-xs text-zinc-400">
                    <FaStar className="text-violet-400" size={12} />
                    {repo.stars}
                  </span>
                </div>

                <p className="mt-3 text-sm text-zinc-400 leading-relaxed line-clamp-2 min-h-[2.5rem]">
                  {repo.description ?? 'Sin descripción.'}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
                  {repo.language && (
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: LANGUAGE_COLORS[repo.language] ?? '#71717a' }}
                      />
                      {repo.language}
                    </span>
                  )}
                  <span className={`text-xs font-medium rounded-full px-2 py-0.5 ${
                    isToday
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                      : 'bg-zinc-800/50 text-zinc-600 border border-zinc-700'
                  }`}>
                    {isToday ? '● Actualizado hoy' : `· ${relativeDate}`}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
