'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { techItems } from '@/data/tech';

const TechMarquee = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const distance = marquee.scrollWidth / 2;

    const tween = gsap.to(marquee, {
      x: -distance,
      duration: 40,
      ease: 'linear',
      repeat: -1,
    });

    // Pausa al pasar el mouse/touch, retoma al salir
    const wrapper = wrapperRef.current;
    const pause = () => tween.pause();
    const play = () => tween.play();
    wrapper?.addEventListener('mouseenter', pause);
    wrapper?.addEventListener('mouseleave', play);
    wrapper?.addEventListener('touchstart', pause, { passive: true });
    wrapper?.addEventListener('touchend', play);

    return () => {
      wrapper?.removeEventListener('mouseenter', pause);
      wrapper?.removeEventListener('mouseleave', play);
      wrapper?.removeEventListener('touchstart', pause);
      wrapper?.removeEventListener('touchend', play);
    };
  }, { scope: marqueeRef });

  return (
    <section className="py-16 sm:py-24 bg-zinc-900/50 border-y border-zinc-800/70 overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-zinc-800/30 [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]"></div>
        <div className="max-w-7xl mx-auto text-center mb-12 px-4 sm:px-6 lg:px-8">
             <h3 className="text-3xl sm:text-4xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-zinc-50 to-zinc-300">
                Tecnologías con las que Trabajo
            </h3>
            <p className="text-lg text-zinc-400 mt-2 max-w-2xl mx-auto">
                Siempre aprendiendo y mejorando mis habilidades con las mejores herramientas.
            </p>
        </div>
      <div
        ref={wrapperRef}
        className="overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      >
        <div ref={marqueeRef} className="flex">
          {[...techItems, ...techItems].map(({ Icon, name }, index) => (
            <div key={index} className="flex items-center mx-6 sm:mx-8 group shrink-0">
              <Icon className="text-4xl sm:text-5xl text-zinc-400 transition-colors duration-300 group-hover:text-violet-400" />
              <span className="ml-4 text-lg sm:text-xl font-semibold text-zinc-400 transition-colors duration-300 group-hover:text-white">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechMarquee;