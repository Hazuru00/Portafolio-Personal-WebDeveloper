import { describe, it, expect } from 'vitest';
import { techItems, techData } from '@/data/tech';

describe('data/tech', () => {
  it('no tiene nombres de tecnología duplicados', () => {
    const names = techItems.map((t) => t.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('los años tienen un formato válido (ej. "3 años", "1 año")', () => {
    for (const tech of techItems) {
      expect(tech.years, `${tech.name} tiene years inválido: "${tech.years}"`).toMatch(
        /^\d+ años?$/
      );
    }
  });

  it('techData contiene exactamente las tecnologías de techItems', () => {
    expect(Object.keys(techData)).toHaveLength(techItems.length);
    for (const tech of techItems) {
      expect(techData[tech.name]).toBeDefined();
    }
  });

  it('todas las tecnologías tienen icono y descripción', () => {
    for (const tech of techItems) {
      expect(tech.Icon, `${tech.name} sin icono`).toBeTruthy();
      expect(tech.experience.length, `${tech.name} sin descripción`).toBeGreaterThan(10);
    }
  });
});
