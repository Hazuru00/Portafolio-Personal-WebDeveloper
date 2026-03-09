'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section 
      ref={containerRef} 
      id="home" 
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center">

        {/* Draggable Profile Component */}
        <div className="relative flex flex-col items-center z-20">
          <motion.div
            drag
            dragConstraints={containerRef}
            className="w-40 h-40 md:w-48 md:h-48 cursor-grab active:cursor-grabbing rounded-full"
            initial={{ scale: 0, y: 50, rotate: -45 }}
            animate={{
              scale: 1,
              y: 0,
              rotate: 0,
              boxShadow: "0px 0px 20px 5px rgba(132, 74, 224, 0.5)",
            }}
            transition={{
              duration: 1.2,
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 30px 8px rgba(132, 74, 224, 0.7)",
            }}
            whileTap={{ scale: 0.95 }}
            whileDrag={{ 
              scale: 1.1,
              boxShadow: "0px 0px 35px 10px rgba(132, 74, 224, 0.8)",
            }}
            dragTransition={{ bounceStiffness: 500, bounceDamping: 15 }}
          >
            <Image
              src="https://avatars.githubusercontent.com/u/92418515?v=4"
              alt="Imagen de perfil de Hazuru"
              width={256}
              height={256}
              className="rounded-full border-4 border-violet-500 object-cover w-full h-full pointer-events-none select-none"
              priority
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ delay: 2.5, duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
            className="mt-4 select-none pointer-events-none"
          >
            <p className="text-zinc-400 text-sm">Arrastrame</p>
          </motion.div>
        </div>

        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 mt-12" // Increased margin-top to space it from the draggable element
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-zinc-50 to-zinc-300">
            Desarrollador y <span className="text-violet-400">Diseñador Web</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto">
            Creando experiencias digitales memorables con un enfoque en el rendimiento y la estética.
          </p>
        </motion.div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
          <motion.div
            initial={{ y: 0, opacity: 0.7 }}
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 border-2 border-zinc-600 rounded-full flex justify-center items-start p-1"
          >
            <div className="w-1 h-2 bg-zinc-500 rounded-full"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
