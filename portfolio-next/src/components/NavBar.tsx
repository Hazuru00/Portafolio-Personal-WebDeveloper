'use client'
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaUser, FaBriefcase, FaEnvelope, FaBars, FaTimes, FaCog } from "react-icons/fa";
import { AnimatedSvg } from "./Logo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>('home');

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 10) {
        setIsHidden(false);
      } else if (currentScrollY > lastScrollY) {
        setIsOpen(false);
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Añadimos 'skills' a la lista de secciones para el scrollspy
  const sections = ["home", "about", "skills", "proyects", "contact"];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-150px 0px -70% 0px",
      }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  // Añadimos el enlace a 'Skills' en la navegación
  const navLinks = [
    { href: "#home", icon: <FaHome />, text: "Home" },
    { href: "#about", icon: <FaUser />, text: "About" },
    { href: "#skills", icon: <FaCog />, text: "Skills" },
    { href: "#proyects", icon: <FaBriefcase />, text: "Proyects" },
    { href: "#contact", icon: <FaEnvelope />, text: "Contact" },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    const elem = document.getElementById(href.substring(1));
    if (elem) {
      if (isOpen) {
        setIsOpen(false);
        setTimeout(() => elem.scrollIntoView({ behavior: "smooth" }), 300);
      } else {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 bg-black/50 backdrop-blur-lg border-b border-white/10 transition-transform duration-300 ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between h-16">
          <AnimatedSvg />
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeSection === link.href.substring(1) ? 'bg-violet-600 text-white' : 'text-gray-300 hover:bg-violet-800/30'}`}>
                {link.icon}
                <span>{link.text}</span>
              </a>
            ))}
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${activeSection === link.href.substring(1) ? 'bg-violet-600 text-white' : 'text-gray-300 hover:bg-violet-800/30'}`}>
                  {link.text}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
