'use client';

import { MotionConfig } from 'framer-motion';

// Respeta prefers-reduced-motion del usuario en TODAS las animaciones de framer-motion:
// desactiva transformaciones/layout pero mantiene los fades de opacidad.
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
