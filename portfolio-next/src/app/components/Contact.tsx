'use client'
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {

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

  // NOTA: Este es un formulario de UI. Para hacerlo funcional, necesitarás conectarlo
  // a un servicio de email (como EmailJS, Resend) o a un endpoint de tu backend.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí iría la lógica de envío
    alert('Formulario enviado (simulación). ¡Necesitas conectar un servicio de backend!');
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
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-violet-500 transition-colors"><FaGithub size={32} /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-violet-500 transition-colors"><FaLinkedin size={32} /></a>
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
              <input type="text" id="name" name="name" required className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"/>
            </motion.div>
            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input type="email" id="email" name="email" required className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"/>
            </motion.div>
            <motion.div variants={itemVariants}>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Mensaje</label>
              <textarea id="message" name="message" rows={5} required className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"></textarea>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center md:text-right">
              <button type="submit" className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                <span>Enviar Mensaje</span>
                <FaPaperPlane />
              </button>
            </motion.div>
          </motion.form>

        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
