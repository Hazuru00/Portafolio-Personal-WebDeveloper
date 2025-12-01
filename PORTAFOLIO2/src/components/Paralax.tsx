import {
  motion,
  // useMotionValueEvent, // Comentado, no se usa actualmente
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

import { Children, useRef } from 'react';
// 👇 CAMBIA ESTA LÍNEA 👇
import type { ReactElement } from 'react'; 
// Define explícitamente el tipo de las props que espera el componente Parallax
interface ParallaxProps {
  children: ReactElement[]; // Esperamos un array de elementos React específicos para este layout
}

export default function Parallax({ children }: ParallaxProps) {
  // Aseguramos que target.current apunte a un elemento div
  const target = useRef<HTMLDivElement>(null);

  // Usamos Children.toArray para convertir los hijos en un array predecible
  const childrenArray = Children.toArray(children);

  // Validaciones básicas por si acaso (tu validación comentada era buena)
  if (childrenArray.length < 2) {
    console.error('Parallax component requires at least two children.');
    // Puedes devolver null o un mensaje de error si lo prefieres
    return null;
  }

  const hero = childrenArray[0];
  const section = childrenArray[1];

  // motion stuff
  // useScroll infiere automáticamente los tipos del target
  const { scrollYProgress } = useScroll({ target });

  // useTransform y useSpring manejan los tipos de forma segura
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '70%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  
  // useSpring envuelve el useTransform
  const scale2 = useSpring(useTransform(scrollYProgress, [0, 1], [0.8, 1]));
  
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // debug (comentado como en tu original)
  // useMotionValueEvent(scrollYProgress, 'change', (last) => {
  //   console.log('Scroll', last);
  // });
  
  return (
    // Envolvemos todo en la motion.div que es nuestro target de referencia
    <motion.div ref={target}>
      <motion.div
        style={{
          y,
          scale,
          opacity,
        }}
      >
        {hero}
      </motion.div>
      {/* Añadimos un contenedor para la segunda sección que se queda fija o se mueve menos */}
      <motion.div style={{ scale: scale2, y: -1 }}>
        {section}
      </motion.div>
    </motion.div>
  );
}