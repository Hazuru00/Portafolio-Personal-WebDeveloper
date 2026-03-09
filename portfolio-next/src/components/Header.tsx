'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Sobre mí', href: '#about' },
  { name: 'Proyectos', href: '#projects' },
  { name: 'Contacto', href: '#contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 1. Función para detectar el tamaño de pantalla
  useEffect(() => {
    setMounted(true);
    const checkRes = () => {
      setIsMobile(window.innerWidth < 768); // 768px es el estándar de 'md'
      if (window.innerWidth >= 768) setIsOpen(false); // Cierra el menú móvil si agrandan la pantalla
    };

    checkRes();
    window.addEventListener('resize', checkRes);
    return () => window.removeEventListener('resize', checkRes);
  }, []);

  // 2. Bloqueo de scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Si no ha cargado en el cliente, no renderizamos para evitar parpadeos
  if (!mounted) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-[100]">
      <div className="bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 shadow-lg relative z-[101]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="#home" className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-zinc-50 to-zinc-400">
                HazuDev<span className="text-violet-400">.</span>
              </Link>
            </div>

            {/* Navegación Desktop - SOLO se muestra si !isMobile */}
            {!isMobile && (
              <nav className="flex items-center space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-zinc-400 hover:text-violet-400 text-sm font-semibold transition-all duration-300"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            )}

            {/* Botón Menú Móvil - SOLO se muestra si isMobile */}
            {isMobile && (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-zinc-300 hover:text-white transition-all"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Menú Móvil Full Screen */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[99] bg-zinc-950/98 backdrop-blur-xl flex flex-col items-center justify-center space-y-10"
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-4xl font-bold text-zinc-200 hover:text-violet-400 transition-colors"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}