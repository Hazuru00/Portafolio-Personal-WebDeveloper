// Tokens de movimiento compartidos por todas las secciones.
// Un solo archivo para que duraciones y easings sean consistentes en todo el portafolio.

export const duration = {
  fast: 0.2, // micro-interacciones (hover, taps)
  normal: 0.5, // entradas de elementos
  slow: 0.8, // revelados de sección completa
} as const;

// Curvas usadas en el proyecto: "salida suave" para entradas, "in-out" para transiciones de estado
export const ease = {
  out: 'easeOut',
  inOut: 'easeInOut',
} as const;

// Stagger base para listas (cards, items de marquee, etc.)
export const stagger = 0.15;
