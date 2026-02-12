import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { AnimatedSvg } from "./Logo";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "Sobre mí", href: "#about" },
  { name: "Proyectos", href: "#projects" },
  { name: "Contacto", href: "#contact" },
];

// --- VARIANTES DE ANIMACIÓN ---
const menuVars: Variants = {
  initial: { scaleY: 0 },
  animate: {
    scaleY: 1,
    transition: { duration: 0.5, ease: [0.12, 0, 0.39, 0] },
  },
  exit: {
    scaleY: 0,
    transition: { delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
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
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // 1. Estética del Header al hacer scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Lógica de Limpieza de URL y Estado
  useEffect(() => {
    if (activeSection) {
      window.history.replaceState(null, "", `#${activeSection}`);
    } else if (!isOpen) {
      // Si no hay sección activa, limpiamos el hash de la URL
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [activeSection, isOpen]);

  // 3. Sensor Central con detección de "Vacío"
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px", // Escanea solo la línea central
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Si entra una sección al centro, la activamos
          setActiveSection(entry.target.id);
        } else {
          // Si una sección SALE del centro y es la que estaba activa, la limpiamos
          setActiveSection((prev) => (prev === entry.target.id ? null : prev));
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    NAV_LINKS.forEach((link) => {
      const sectionId = link.href.replace("#", "");
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);

    if (isOpen) {
      setIsOpen(false);
      setTimeout(() => {
        elem?.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
      }, 600);
    } else {
      elem?.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", href);
    }
  };

  return (
    <>
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
            {NAV_LINKS.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`relative py-2 font-medium text-sm uppercase tracking-wider transition-colors duration-300 ${
                    isActive ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* MOBILE BUTTON */}
          <div className="md:hidden z-50">
            <button
              onClick={toggleMenu}
              className="text-white flex flex-col justify-center items-center gap-1.5 w-11 h-11 bg-purple-600/20 rounded-xl"
            >
              <motion.span
                animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="block w-6 h-0.5 bg-white origin-center"
              />
              <motion.span
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-6 h-0.5 bg-purple-400"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="block w-6 h-0.5 bg-white origin-center"
              />
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              variants={menuVars}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed inset-0 bg-gray-900 flex flex-col justify-center items-center p-10 md:hidden z-40 overflow-hidden"
            >
              <div className="flex flex-col h-full justify-between py-20 w-full">
                <div className="text-center">
                  <motion.p className="text-purple-500 font-bold tracking-widest text-sm mb-8 uppercase opacity-60">
                    Navegación
                  </motion.p>
                  <motion.div
                    variants={containerVars}
                    initial="initial"
                    animate="open"
                    exit="exit"
                    className="flex flex-col gap-8"
                  >
                    {NAV_LINKS.map((link) => {
                      const isActive =
                        activeSection === link.href.replace("#", "");
                      return (
                        <div key={link.name} className="overflow-hidden">
                          <motion.div variants={mobileLinkVars}>
                            <a
                              href={link.href}
                              onClick={(e) => handleLinkClick(e, link.href)}
                              className={`text-5xl font-bold transition-colors block ${
                                isActive ? "text-purple-500" : "text-white"
                              }`}
                            >
                              {link.name}
                            </a>
                          </motion.div>
                        </div>
                      );
                    })}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
