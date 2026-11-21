'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaStar, FaCode, FaGitAlt } from 'react-icons/fa';
import type { GitHubStats, ContributionDay } from '@/lib/github';

interface StatCard {
  value: number;
  label: string;
  icon: React.ElementType;
  color: string;
}

const EMPTY_COLOR = '#27272a';
const DAYS_OF_WEEK = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

/** Transforma semanas×días en días×semanas para renderizar por columnas. */
function gridFromWeeks(weeks: ContributionDay[][]): (ContributionDay | null)[][] {
  const grid: (ContributionDay | null)[][] = Array.from({ length: 7 }, () => []);
  const recent = weeks.slice(-52);
  for (const week of recent) {
    for (let dayIdx = 0; dayIdx < 7; dayIdx++) {
      grid[dayIdx].push(week[dayIdx] ?? null);
    }
  }
  return grid;
}

interface GitHubActivityProps {
  github: GitHubStats | null;
  calendarWeeks: ContributionDay[][] | null;
  totalCalendarContributions: number;
}

export default function GitHubActivity({
  github,
  calendarWeeks,
  totalCalendarContributions,
}: GitHubActivityProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const cards: StatCard[] = [
    { value: github?.contributions ?? 0, label: 'Commits este año', icon: FaCode, color: '#2ea043' },
    { value: github?.pullRequests ?? 0, label: 'Pull Requests', icon: FaGitAlt, color: '#f0ad4e' },
    { value: github?.publicRepos ?? 0, label: 'Repos públicos', icon: FaGithub, color: '#a78bfa' },
    { value: github?.totalStars ?? 0, label: 'Estrellas', icon: FaStar, color: '#fbbf24' },
  ];

  const grid = calendarWeeks ? gridFromWeeks(calendarWeeks) : null;

  return (
    <motion.section
      ref={sectionRef}
      id="github-activity"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-zinc-800/70 bg-zinc-950"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-zinc-50 to-zinc-300">
            Actividad en GitHub
          </h2>
          <p className="text-lg sm:text-xl text-violet-400 mt-2 max-w-2xl mx-auto">
            Datos reales sincronizados desde GitHub · actualizado cada 24 h
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {cards.map((card, index) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-900/20"
            >
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: `${card.color}20` }}
              >
                <card.icon className="w-5 h-5" style={{ color: card.color }} />
              </div>
              <p className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-1 tabular-nums">
                {card.value.toLocaleString()}
              </p>
              <p className="text-sm text-zinc-400">{card.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 sm:p-8 overflow-x-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-100">Contribuciones del año</h3>
              <p className="text-sm text-zinc-500 mt-1">
                Cada cuadrado es un día · un color más intenso indica más actividad
              </p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-zinc-100 tabular-nums">
                {totalCalendarContributions.toLocaleString()}
              </p>
              <p className="text-xs text-zinc-500">contribuciones</p>
            </div>
          </div>

          {grid ? (
            <div className="min-w-max">
              <div className="flex gap-1">
                <div className="flex flex-col gap-1 mr-1 text-[10px] text-zinc-500 font-mono">
                  {DAYS_OF_WEEK.map((day, idx) => (
                    <span key={day} className="h-3 leading-3 w-6 text-right">
                      {idx % 2 === 1 ? '' : day}
                    </span>
                  ))}
                </div>
                <div className="flex gap-1">
                  {grid[0].map((_, weekIdx) => (
                    <div key={weekIdx} className="flex flex-col gap-1">
                      {grid.map((dayRow, dayIdx) => {
                        const day = dayRow[weekIdx];
                        return (
                          <motion.div
                            key={dayIdx}
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: weekIdx * 0.004, duration: 0.25 }}
                            className="w-3 h-3 rounded-sm transition-transform hover:scale-150"
                            style={{ backgroundColor: day?.color ?? EMPTY_COLOR }}
                            title={
                              day
                                ? `${day.contributionCount} contribución${day.contributionCount !== 1 ? 'es' : ''} en ${day.date}`
                                : undefined
                            }
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-end gap-1.5 mt-4 text-[11px] text-zinc-500">
                <span>Menos</span>
                {[EMPTY_COLOR, '#9be9a8', '#40c463', '#30a14e', '#216e39'].map((color) => (
                  <span key={color} className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
                ))}
                <span>Más</span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-zinc-500 py-8 text-center">
              El mapa de contribuciones no está disponible en este momento.
            </p>
          )}
        </div>
      </div>
    </motion.section>
  );
}
