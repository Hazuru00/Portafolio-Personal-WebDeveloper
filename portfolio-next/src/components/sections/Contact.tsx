'use client';
import { sendEmail } from '@/actions/sendEmail';
import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { FaGithub, FaLinkedin, FaPaperPlane } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'rateLimit'; message: string } | null>(null);
  const [pending, setPending] = useState(false);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.from(el.querySelector('.section-title'), {
      opacity: 0, y: -20, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 80%' }
    });

    gsap.from(el.querySelector('.section-subtitle'), {
        opacity: 0, y: -20, duration: 0.8, delay: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 80%' }
    });

    gsap.from(el.querySelector('.contact-card'), {
        opacity: 0, scale: 0.95, duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: '.contact-card', start: 'top 80%' }
    });

  }, { scope: sectionRef });

  return (
    <section id="contact" ref={sectionRef} className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl sm:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-zinc-50 to-zinc-300">
            Hablemos
          </h2>
          <p className="section-subtitle text-lg sm:text-xl text-violet-400 mt-2 max-w-2xl mx-auto">
            ¿Interesado en colaborar? Envíame un mensaje y empecemos a crear algo increíble.
          </p>
        </div>

        <div className="contact-card max-w-4xl mx-auto bg-zinc-900/50 border border-zinc-800 rounded-2xl shadow-2xl shadow-violet-900/20 backdrop-blur-lg p-8 sm:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Información y Redes Sociales */}
                <div className="md:col-span-1 flex flex-col justify-between">
                    <div>
                        <h3 className="text-2xl font-bold text-zinc-100 mb-2">Información de Contacto</h3>
                        <p className="text-zinc-400 leading-relaxed">
                            Si tienes una propuesta, un proyecto en mente, o simplemente quieres saludar, no dudes en escribirme.
                        </p>
                    </div>
                    <div className="flex items-center gap-5 mt-8 md:mt-0">
                        <a href="https://github.com/hazuru00" target="_blank" rel="noopener noreferrer" className="text-zinc-400 transition-colors duration-300 hover:text-violet-400" aria-label="GitHub de Hazuru">
                            <FaGithub size={28} />
                        </a>
                        <a href="https://www.linkedin.com/in/miguel-angel-vallejo-604928225/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 transition-colors duration-300 hover:text-violet-400" aria-label="LinkedIn de Hazuru">
                            <FaLinkedin size={28} />
                        </a>
                    </div>
                </div>

                {/* Formulario de Contacto */}
                <form action={async (formData) => {
                  setPending(true);
                  setStatus(null);
                  const result = await sendEmail(formData);
                  setPending(false);
                  if (result.success) {
                    setStatus({ type: 'success', message: '¡Mensaje enviado correctamente!' });
                  } else if (result.error) {
                    setStatus({ type: 'rateLimit', message: result.error });
                  } else {
                    setStatus({ type: 'error', message: 'Error al enviar. Intenta de nuevo.' });
                  }
                }} className="md:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">Nombre</label>
                            <input type="text" id="name" name="name" required className="form-input" placeholder="Tu Nombre"/>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">Email</label>
                            <input type="email" id="email" name="email" required className="form-input" placeholder="tu@email.com"/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">Mensaje</label>
                        <textarea id="message" name="message" rows={5} required className="form-input" placeholder="¿En qué puedo ayudarte?"></textarea>
                    </div>
                    {status && (
                      <div className={`text-sm font-medium px-4 py-2 rounded-lg ${
                        status.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/30' :
                        status.type === 'rateLimit' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30' :
                        'bg-red-500/10 text-red-400 border border-red-500/30'
                      }`}>
                        {status.message}
                      </div>
                    )}
                    <div className="text-right pt-2">
                        <button type="submit" disabled={pending} className="inline-flex items-center gap-3 bg-violet-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-violet-500 shadow-lg shadow-violet-800/20 hover:shadow-violet-700/40 focus:outline-none focus:ring-4 focus:ring-violet-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                            <span>{pending ? 'Enviando...' : 'Enviar Mensaje'}</span>
                            <FaPaperPlane />
                        </button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
