'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { techItems } from '@/data/tech';
import projectsData from '../../../public/projects.json';

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: projectsData.length, suffix: '+', label: 'Proyectos destacados' },
  { value: techItems.length, suffix: '', label: 'Tecnologías en el stack' },
  { value: 5, suffix: '', label: 'Años de trayectoria' },
];

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || reduceMotion) return;
    let raf = 0;
    const duration = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, value, reduceMotion]);

  const display = reduceMotion ? value : count;

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
};

const Stats = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 });

  return (
    <section
      ref={sectionRef}
      className="py-14 px-4 sm:px-6 lg:px-8 border-b border-zinc-800/70 bg-zinc-900/30"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
          >
            <p className="text-5xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-zinc-50 to-zinc-300">
              <Counter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-sm sm:text-base text-zinc-400 font-medium">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
