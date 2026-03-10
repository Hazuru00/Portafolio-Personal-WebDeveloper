'use client';

import { useState, useEffect, useMemo, useRef, createElement } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { FaReact, FaNodeJs, FaFigma, FaVuejs, FaGitAlt } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiMongodb, SiTailwindcss, SiFramer, SiVercel, SiPostman, SiFirebase } from 'react-icons/si';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

gsap.registerPlugin(Draggable);

// Profile Component with GSAP Draggable
const Profile = () => {
  const profileRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    if (profileRef.current && containerRef.current) {
      Draggable.create(profileRef.current, {
        type: 'x,y',
        bounds: containerRef.current,
        inertia: true,
      });
    }
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full aspect-square max-w-[280px] mx-auto lg:max-w-none lg:w-full h-[300px] rounded-2xl overflow-hidden border-2 border-zinc-800 bg-zinc-900/50 p-2">
      <motion.div 
        ref={profileRef} 
        className='w-full h-full relative cursor-grab active:cursor-grabbing'
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Image
          src="/PImage.jpeg"
          alt="Foto de perfil de Hazuru"
          layout="fill"
          objectFit="cover"
          className="rounded-lg pointer-events-none"
          priority
        />
      </motion.div>
    </div>
  );
};

// GSAP Logo SVG Component
const GsapLogo = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path fill="currentColor" d="M448 96v320h-64V234.4L224 429.6 64 234.4V416H0V96h64v123.6l160 197.2 160-197.2V96h64z"/>
  </svg>
);

const techData = {
  React: { Icon: FaReact, experience: 'Dominio avanzado de hooks, SSR, y patrones de componentes para arquitecturas escalables.', years: '3 años' },
  'Next.js': { Icon: SiNextdotjs, experience: 'Expertise en App Router, Server Components, y optimización de rendimiento (ISR, SSG).', years: '1 años' },
  TypeScript: { Icon: SiTypescript, experience: 'Tipado estricto para construir aplicaciones robustas, mantenibles y con menos errores en tiempo de ejecución.', years: '3 años' },
  'Node.js': { Icon: FaNodeJs, experience: 'Desarrollo de APIs RESTful, manejo de middlewares con Express y conexión a bases de datos.', years: '2 años' },
  MongoDB: { Icon: SiMongodb, experience: 'Modelado de datos NoSQL con Mongoose, optimización de consultas y agregaciones complejas.', years: '2 años' },
  GSAP: { Icon: GsapLogo, experience: 'Creación de animaciones complejas, líneas de tiempo, y experiencias interactivas con ScrollTrigger y Draggable.', years: '1 año' },
  'Tailwind CSS': { Icon: SiTailwindcss, experience: 'Diseño de interfaces modernas y responsivas con un enfoque utility-first y personalización de temas.', years: '3 años' },
  'Framer Motion': { Icon: SiFramer, experience: 'Animaciones declarativas, transiciones de página fluidas y gestos para una UX dinámica.', years: '2 años' },
  Git: { Icon: FaGitAlt, experience: 'Control de versiones profesional, flujos de trabajo (Git Flow) y colaboración efectiva en equipo.', years: '4 años' },
  Figma: { Icon: FaFigma, experience: 'Diseño de prototipos interactivos, mockups de alta fidelidad y sistemas de diseño para una UX consistente.', years: '1 años' },
  Vercel: { Icon: SiVercel, experience: 'Despliegue contínuo, monitorización y gestión de variables de entorno para aplicaciones Next.js.', years: '2 años' },
  Firebase: { Icon: SiFirebase, experience: 'Autenticación, bases de datos en tiempo real (Firestore) y hosting para aplicaciones web full-stack.', years: '2 años' },
  Vuejs: { Icon: FaVuejs, experience: 'Desarrollo de aplicaciones reactivas con el ecosistema de Vue, incluyendo Vuex y Vue Router.', years: '1 año' },
  Postman: { Icon: SiPostman, experience: 'Pruebas y depuración de APIs RESTful, creación de colecciones y automatización de tests.', years: '3 años' },
};

interface Project { title: string; tags: string[]; }
const ITEMS_PER_PAGE = 9; // Perfect for a 3x3 grid

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch('/projects.json').then(res => res.json()).then(setProjects);
  }, []);

  const technologies = Object.keys(techData);
  const totalPages = Math.ceil(technologies.length / ITEMS_PER_PAGE);

  const paginatedTechs = useMemo(() => {
    const start = page * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return technologies.slice(start, end);
  }, [page, technologies]);

  const relevantProjects = useMemo(() => 
    selectedTech ? projects.filter(p => p.tags.includes(selectedTech)) : [],
    [selectedTech, projects]
  );

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.section 
      id="about"
      ref={sectionRef} 
      className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-12">
          
          {/* === LEFT COLUMN: IDENTITY === */}
          <motion.div variants={itemVariants} className="flex flex-col gap-8">
            {/* On mobile, Profile is first */}
            <div className="lg:order-1"><Profile /></div>
            <div className="lg:order-2 space-y-6 text-zinc-300 text-lg leading-relaxed">
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-zinc-50 to-zinc-300">
                Sobre Mí
              </h2>
              <p>
                Apasionado por la tecnología y el diseño, mi objetivo es fusionar ambos mundos para construir interfaces intuitivas y de alto rendimiento. Con experiencia en el stack MERN y un profundo interés en las nuevas arquitecturas web, busco constantemente superar los límites de lo posible.
              </p>
              <p className="text-violet-300 border-l-4 border-violet-500 pl-4 italic">
                  Actualmente, estoy explorando nuevas oportunidades para aplicar mis habilidades y seguir creciendo como desarrollador full-stack.
              </p>
            </div>
          </motion.div>

          {/* === RIGHT COLUMN: EXPERTISE === */}
          <motion.div variants={itemVariants} className="mt-12 lg:mt-0">
            <h3 className="text-3xl font-bold tracking-tight text-zinc-200 mb-6">Mi Stack Tecnológico</h3>
            <div className="relative">
                <AnimatePresence mode="wait">
                <motion.div
                    key={page}
                    className="grid grid-cols-3 gap-4"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                    {paginatedTechs.map((tech) => {
                    const { Icon } = techData[tech as keyof typeof techData];
                    return (
                        <motion.div
                        key={tech}
                        layoutId={`tech-card-${tech}`}
                        onClick={() => setSelectedTech(tech)}
                        className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg p-3 sm:p-4 flex flex-col items-center justify-center aspect-square cursor-pointer transition-all duration-300 hover:bg-violet-900/50 hover:border-violet-700 hover:-translate-y-1"
                        whileHover={{ scale: 1.05 }}
                        >
                        <Icon className="text-3xl sm:text-4xl text-zinc-300" />
                        <p className="mt-2 text-[11px] sm:text-xs font-semibold text-center text-zinc-200">{tech}</p>
                        </motion.div>
                    );
                    })}
                </motion.div>
                </AnimatePresence>

                {totalPages > 1 && (
                <div className="flex justify-center items-center mt-6 space-x-3">
                    <button 
                    onClick={() => setPage(p => Math.max(0, p - 1))} 
                    disabled={page === 0} 
                    className="p-2 rounded-full bg-zinc-800/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-violet-700/60"
                    >
                    <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="font-mono text-xs text-zinc-400">Página {page + 1} de {totalPages}</span>
                    <button 
                    onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} 
                    disabled={page === totalPages - 1} 
                    className="p-2 rounded-full bg-zinc-800/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-violet-700/60"
                    >
                    <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
                )}
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selectedTech && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTech(null)}
          >
            <motion.div
              layoutId={`tech-card-${selectedTech}`}
              className="relative w-full max-w-md bg-zinc-900 border border-violet-700/80 rounded-2xl p-8 shadow-2xl shadow-violet-900/40"
              onClick={e => e.stopPropagation()}
            >
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                    {createElement(techData[selectedTech as keyof typeof techData].Icon, { className: 'text-5xl text-violet-400' })}
                    <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400">{selectedTech}</h3>
                    </div>
                    <motion.button 
                        onClick={() => setSelectedTech(null)} 
                        className="text-zinc-500 transition-colors hover:text-white"
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        > 
                        <X className="h-7 w-7" />
                    </motion.button>
                </div>
              <div className="space-y-5">
                <div>
                  <h4 className="text-md font-semibold text-violet-300 mb-2">Años de Experiencia</h4>
                  <p className="text-zinc-300 text-lg">{techData[selectedTech as keyof typeof techData].years}</p>
                </div>
                <div>
                  <h4 className="text-md font-semibold text-violet-300 mb-2">Experiencia Específica</h4>
                  <p className="text-zinc-300 leading-relaxed">{techData[selectedTech as keyof typeof techData].experience}</p>
                </div>
                {relevantProjects.length > 0 && (
                  <div>
                    <h4 className="text-md font-semibold text-violet-300 mb-3">Proyectos Relevantes</h4>
                    <ul className="space-y-2">
                      {relevantProjects.map(p => (
                        <li key={p.title} className="text-zinc-400 bg-zinc-800/50 rounded-md px-3 py-2 text-sm border border-zinc-700">
                          {p.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default About;
