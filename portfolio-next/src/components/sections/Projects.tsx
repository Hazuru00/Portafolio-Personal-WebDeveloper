'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    fetch('/projects.json')
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  useEffect(() => {
    const calculateWidth = () => {
      if (carouselRef.current && carouselRef.current.firstElementChild) {
        const container = carouselRef.current;
        const draggable = container.firstElementChild as HTMLElement;
        const style = window.getComputedStyle(draggable);
        const rightPadding = parseFloat(style.paddingRight) || 0;

        const totalDragDistance = container.scrollWidth - container.offsetWidth;
        
        // To stop at the edge of the last project, we reduce the drag distance
        // by the amount of padding on the right of the draggable element.
        const adjustedWidth = totalDragDistance - rightPadding;
        
        setWidth(Math.max(0, adjustedWidth));
      }
    };
    calculateWidth();
    window.addEventListener('resize', calculateWidth);
    return () => window.removeEventListener('resize', calculateWidth);
  }, [projects]);
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.1, // Changed threshold to amount for better reliability
  });

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };
  
  return (
    <motion.section
      ref={sectionRef}
      id="projects"
      className="py-20 sm:py-32 overflow-hidden" // Removed horizontal padding from section
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Added padding to inner container */} 
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-zinc-50 to-zinc-300">
            Proyectos
          </h2>
          <p className="text-lg sm:text-xl text-violet-400 mt-2 max-w-2xl mx-auto">
            Una selección de mi trabajo que demuestra mi pasión por el detalle.
          </p>
        </motion.div>
      </div>

        <motion.div variants={itemVariants} ref={carouselRef} className="cursor-grab relative">
          <motion.div
            className="flex gap-8 lg:gap-12 px-4 sm:px-6 lg:px-8" // Added padding here for edge items
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            whileTap={{ cursor: 'grabbing' }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="group relative bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:border-violet-700/80 hover:shadow-violet-900/30 hover:shadow-2xl hover:-translate-y-2 flex-shrink-0 w-11/12 sm:w-5/6 md:w-[45vw] lg:w-[30vw]"
              >
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>

                <div className="p-6 relative z-10">
                  <h3 className="text-2xl font-bold text-zinc-100 mb-3">{project.title}</h3>
                  <p className="text-zinc-400 mb-5 text-base leading-relaxed h-24 overflow-hidden [mask-image:linear-gradient(to_bottom,white_60%,transparent)]">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs font-semibold px-3 py-1 bg-violet-500/10 border border-violet-900/50 text-violet-300 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-end items-center gap-4">
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-zinc-400 transition-colors duration-300 hover:text-white"
                        aria-label={`Repositorio de ${project.title}`}
                      >
                        <FaGithub size={22} />
                        <span className="text-sm font-medium">Código</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-zinc-900 bg-violet-400 rounded-lg transition-all duration-300 hover:bg-violet-300 hover:scale-105"
                        aria-label={`Ver demo de ${project.title}`}
                      >
                        <FaExternalLinkAlt size={16} />
                        <span>Ver Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
    </motion.section>
  );
};

export default Projects;
