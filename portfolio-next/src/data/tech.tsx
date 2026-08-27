'use client';

import { FC } from 'react';
import { FaReact, FaNodeJs, FaFigma, FaVuejs, FaGitAlt, FaDocker, FaPython, FaGithub, FaVest } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiMongodb, SiTailwindcss, SiFramer, SiVercel, SiPostman, SiFirebase, SiPnpm, SiFastapi, SiN8N, SiOllama, SiGnubash, SiGithubactions, SiSupabase } from 'react-icons/si';

export const GsapLogo = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{ width: '1em', height: '1em' }}>
    <path fill="currentColor" d="M448 96v320h-64V234.4L224 429.6 64 234.4V416H0V96h64v123.6l160 197.2 160-197.2V96h64z"/>
  </svg>
);

export const OpenCodeLogo = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 300" fill="none" style={{ width: '1em', height: '1em' }}>
    <path d="M180 240H60V120H180V240Z" fill="currentColor" opacity="0.7"/>
    <path d="M180 60H60V240H180V60ZM240 300H0V0H240V300Z" fill="currentColor"/>
  </svg>
);

export interface TechItem {
  name: string;
  Icon: FC<{ className?: string }>;
  experience: string;
  years: string;
}

export const techItems: TechItem[] = [
  { name: 'React', Icon: FaReact, experience: 'Dominio avanzado de hooks, SSR, y patrones de componentes para arquitecturas escalables.', years: '4 años' },
  { name: 'Next.js', Icon: SiNextdotjs, experience: 'Expertise en App Router, Server Components, y optimización de rendimiento (ISR, SSG).', years: '2 años' },
  { name: 'TypeScript', Icon: SiTypescript, experience: 'Tipado estricto para construir aplicaciones robustas, mantenibles y con menos errores en tiempo de ejecución.', years: '4 años' },
  { name: 'Node.js', Icon: FaNodeJs, experience: 'Desarrollo de APIs RESTful, manejo de middlewares con Express y conexión a bases de datos.', years: '3 años' },
  { name: 'MongoDB', Icon: SiMongodb, experience: 'Modelado de datos NoSQL con Mongoose, optimización de consultas y agregaciones complejas.', years: '3 años' },
  { name: 'GSAP', Icon: GsapLogo, experience: 'Creación de animaciones complejas, líneas de tiempo, y experiencias interactivas con ScrollTrigger y Draggable.', years: '2 años' },
  { name: 'Tailwind CSS', Icon: SiTailwindcss, experience: 'Diseño de interfaces modernas y responsivas con un enfoque utility-first y personalización de temas.', years: '4 años' },
  { name: 'Framer Motion', Icon: SiFramer, experience: 'Animaciones declarativas, transiciones de página fluidas y gestos para una UX dinámica.', years: '3 años' },
  { name: 'Git', Icon: FaGitAlt, experience: 'Control de versiones profesional, flujos de trabajo (Git Flow) y colaboración efectiva en equipo.', years: '5 años' },
  { name: 'Figma', Icon: FaFigma, experience: 'Diseño de prototipos interactivos, mockups de alta fidelidad y sistemas de diseño para una UX consistente.', years: '2 años' },
  { name: 'Vercel', Icon: SiVercel, experience: 'Despliegue contínuo, monitorización y gestión de variables de entorno para aplicaciones Next.js.', years: '3 años' },
  { name: 'Firebase', Icon: SiFirebase, experience: 'Autenticación, bases de datos en tiempo real (Firestore) y hosting para aplicaciones web full-stack.', years: '3 años' },
  { name: 'Vue.js', Icon: FaVuejs, experience: 'Desarrollo de aplicaciones reactivas con el ecosistema de Vue, incluyendo Vuex y Vue Router.', years: '2 años' },
  { name: 'Postman', Icon: SiPostman, experience: 'Pruebas y depuración de APIs RESTful, creación de colecciones y automatización de tests.', years: '4 años' },
  { name: 'Docker', Icon: FaDocker, experience: 'Containerización de aplicaciones, orquestación con Docker Compose y despliegue en entornos reproducibles.', years: '1 año' },
  { name: 'Python', Icon: FaPython, experience: 'Desarrollo de scripts, automatización, APIs con FastAPI y herramientas de ciberseguridad.', years: '2 años' },
  { name: 'pnpm', Icon: SiPnpm, experience: 'Gestor de paquetes eficiente con espacio en disco y estricto para proyectos Node.js.', years: '1 año' },
  { name: 'FastAPI', Icon: SiFastapi, experience: 'Construcción de APIs de alto rendimiento con Python, documentación automática y validación de datos.', years: '1 año' },
  { name: 'Supabase', Icon: SiSupabase, experience: 'Backend-as-a-Service con Postgres, autenticación, realtime y storage para apps full-stack.', years: '1 año' },
  { name: 'Bash', Icon: SiGnubash, experience: 'Automatización de tareas, scripting de sistema y administración de servidores Linux.', years: '2 años' },
  { name: 'OpenCode', Icon: OpenCodeLogo, experience: 'Asistente de desarrollo con IA para código, debugging y arquitectura de software.', years: '1 año' },
  { name: 'n8n', Icon: SiN8N, experience: 'Automatización de flujos de trabajo visuales, integración de APIs y orquestación de procesos.', years: '1 año' },
  { name: 'Ollama', Icon: SiOllama, experience: 'Ejecución local de LLMs para desarrollo con IA privada y sin costos de API.', years: '1 año' },
  { name: 'Docker Compose', Icon: FaDocker, experience: 'Orquestación de múltiples contenedores para entornos de desarrollo y producción reproducibles.', years: '1 año' },
  { name: 'CI/CD', Icon: SiGithubactions, experience: 'Pipelines automatizados con GitHub Actions para testing, build y deploy continuo.', years: '1 año' },
  { name: 'Testing', Icon: FaVest, experience: 'Escritura de tests unitarios y de integración para garantizar calidad y confiabilidad del código.', years: '1 año' },
];

export const techData = Object.fromEntries(
  techItems.map(t => [t.name, { Icon: t.Icon, experience: t.experience, years: t.years }])
);