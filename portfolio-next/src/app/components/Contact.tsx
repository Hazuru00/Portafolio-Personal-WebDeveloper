'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import { sendEmail } from '../actions/sendEmail';

const Contact = () => {
  const [isPending, setIsPending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const result = await sendEmail(formData);

    setIsPending(false);

    if (result.success) {
      setIsSent(true);
      (e.target as HTMLFormElement).reset(); 
      setTimeout(() => setIsSent(false), 5000); 
    } else {
      alert('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.');
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, duration: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section id="contact" className="min-h-screen py-20 flex items-center">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center text-white mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Hablemos
        </motion.h2>

        <motion.div 
          className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Información y Redes Sociales */}
          <motion.div className="md:w-1/3 text-center md:text-left" variants={itemVariants}>
            <h3 className="text-2xl font-bold text-white mb-4">Contáctame</h3>
            <p className="text-gray-300 mb-6">
              ¿Tienes una pregunta o una propuesta? No dudes en escribirme. Estoy abierto a oportunidades de colaboración y nuevos desafíos.
            </p>
            <div className="flex justify-center md:justify-start gap-6 mt-4">
              <a href="https://github.com/tu-usuario" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-violet-500 transition-colors">
                <FaGithub size={32} />
              </a>
              <a href="https://linkedin.com/in/tu-usuario" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-violet-500 transition-colors">
                <FaLinkedin size={32} />
              </a>
            </div>
          </motion.div>

          {/* Formulario de Contacto */}
          <motion.form 
            onSubmit={handleSubmit}
            className="md:w-2/3 space-y-6"
            variants={sectionVariants}
          >
            <motion.div variants={itemVariants}>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Nombre</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required 
                className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Mensaje</label>
              <textarea 
                id="message" 
                name="message" 
                rows={5} 
                required 
                className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
              ></textarea>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-end gap-4 text-right">
              <AnimatePresence>
                {isSent && (
                  <motion.span 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-green-400 flex items-center gap-2 font-medium"
                  >
                    <FaCheckCircle /> ¡Enviado con éxito!
                  </motion.span>
                )}
              </AnimatePresence>

              <button 
                type="submit" 
                disabled={isPending}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 active:scale-95 ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span>{isPending ? 'Enviando...' : 'Enviar Mensaje'}</span>
                {!isPending && <FaPaperPlane className="text-sm" />}
              </button>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
