import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { AnimatedSvg } from "./Logo";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "Sobre mí", href: "#about" },
  { name: "Proyectos", href: "#projects" },
  { name: "Contacto", href: "#contact" },
];

// --- TUS VARIANTES MANTENIDAS Y OPTIMIZADAS ---
const menuVars: Variants = {
  initial: { scaleY: 0 },
  animate: {
    scaleY: 1,
    transition: { duration: 0.5, ease: [0.12, 0, 0.39, 0] },
  },
  exit: {
    scaleY: 0,
    transition: {
      delay: 0.5,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const containerVars: Variants = {
  initial: { transition: { staggerChildren: 0.09, staggerDirection: -1 } },
  open: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.09,
      staggerDirection: 1,
    },
  },
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const mobileLinkVars: Variants = {
  initial: { y: "30vh", opacity: 0 },
  open: {
    y: 0,
    opacity: 1,
    transition: { ease: [0, 0.55, 0.45, 1], duration: 0.7 },
  },
  exit: {
    y: "30vh",
    opacity: 0,
    transition: { duration: 0.4, ease: [0.37, 0, 0.63, 1] },
  },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  // --- LÓGICA DE NAVEGACIÓN CON DELAY ---
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault(); // Detiene el salto instantáneo
    setIsOpen(false); // Dispara la animación de salida

    // Esperamos 1000ms (0.5s links + 0.5s telón) antes de navegar
    setTimeout(() => {
      window.location.hash = href;
    }, 1000);
  };

  return (
    <>
      {/* 1. HEADER ANIMADO (Eliminado el 'hidden' para permitir transición) */}
      <motion.header
        initial={{ y: -100 }}
        animate={scrolled || isOpen ? { y: 0 } : { y: -100 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
          scrolled || isOpen
            ? "bg-gray-900/80 backdrop-blur-md border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="relative z-50 w-16 h-16 flex items-center">
            <AnimatedSvg />
          </div>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex gap-8 items-center">
            {NAV_LINKS.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="relative text-gray-300 hover:text-white font-medium text-sm uppercase tracking-wider group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-bold text-sm shadow-lg shadow-purple-500/20 transition-colors"
            >
              Hablemos
            </motion.button>
          </nav>

          {/* MOBILE HAMBURGER */}
          <div className="md:hidden z-50 shadow-none">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none flex flex-col justify-center items-center gap-1.5 w-10 h-10 bg-purple-800 rounded-xl"
            >
              <motion.span
                animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="block w-8 h-0.5 bg-white origin-center"
              />
              <motion.span
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-8 h-0.5 bg-white"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="block w-8 h-0.5 bg-white origin-center"
              />
            </button>
          </div>
        </div>

        {/* 2. MOBILE MENU (Dentro del Header pero con AnimatePresence) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={menuVars}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed left-0 top-0 w-full h-screen bg-gray-900 origin-top flex flex-col justify-center items-center p-10 md:hidden z-40 overflow-hidden"
            >
              <div className="flex flex-col h-full justify-between py-20 w-full">
                <div className="text-center">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-purple-500 font-bold tracking-widest text-sm mb-4 uppercase opacity-80"
                  >
                    Menu
                  </motion.p>

                  <motion.div
                    variants={containerVars}
                    initial="initial"
                    animate="open"
                    exit="exit"
                    className="flex flex-col gap-6"
                  >
                    {NAV_LINKS.map((link) => (
                      <div key={link.name} className="overflow-hidden">
                        <motion.div variants={mobileLinkVars}>
                          <a
                            href={link.href}
                            onClick={(e) => handleLinkClick(e, link.href)}
                            className="text-4xl font-bold text-white hover:text-purple-400 transition-colors block"
                          >
                            {link.name}
                          </a>
                        </motion.div>
                      </div>
                    ))}
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                  exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
                  className="text-center text-gray-500 text-sm"
                >
                  <p>© 2024 Mi Portafolio Hazuru</p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
