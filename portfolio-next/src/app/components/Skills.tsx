'use client'
import { motion } from 'framer-motion';
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaGitAlt,
  FaDocker
} from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTailwindcss,
  SiVercel,
  SiTypescript,
  SiMongodb,
  SiPrisma
} from 'react-icons/si';

const skills = [
    { name: 'JavaScript', icon: <FaJsSquare className="w-12 h-12 text-yellow-400" /> },
    { name: 'TypeScript', icon: <SiTypescript className="w-12 h-12 text-blue-500" /> },
    { name: 'React', icon: <FaReact className="w-12 h-12 text-blue-400" /> },
    { name: 'Next.js', icon: <SiNextdotjs className="w-12 h-12 text-white" /> },
    { name: 'Node.js', icon: <FaNodeJs className="w-12 h-12 text-green-500" /> },
    { name: 'HTML5', icon: <FaHtml5 className="w-12 h-12 text-orange-600" /> },
    { name: 'CSS3', icon: <FaCss3Alt className="w-12 h-12 text-blue-600" /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss className="w-12 h-12 text-teal-400" /> },
    { name: 'MongoDB', icon: <SiMongodb className="w-12 h-12 text-green-600" /> },
    { name: 'Prisma', icon: <SiPrisma className="w-12 h-12 text-teal-500" /> },
    { name: 'Git', icon: <FaGitAlt className="w-12 h-12 text-orange-500" /> },
    { name: 'Docker', icon: <FaDocker className="w-12 h-12 text-blue-500" /> },
];

const Skills = () => {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="skills" className="py-20 bg-gray-900/70">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center text-white mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Tecnologías y Habilidades
        </motion.h2>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-violet-500/50 hover:scale-105 transition-all duration-300"
              variants={itemVariants}
            >
              {skill.icon}
              <p className="mt-4 text-white font-semibold text-center">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
