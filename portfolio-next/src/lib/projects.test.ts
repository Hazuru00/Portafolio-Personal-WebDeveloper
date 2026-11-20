import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import path from 'node:path';
import projectsData from '../../public/projects.json';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
}

const projects = projectsData as Project[];

describe('public/projects.json', () => {
  it('la lista de proyectos no está vacía', () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it('cada imagen referenciada existe en public/ (evita 404 en la tarjeta)', () => {
    for (const project of projects) {
      const imagePath = path.join(process.cwd(), 'public', project.image);
      expect(existsSync(imagePath), `Imagen no encontrada: ${project.image}`).toBe(true);
    }
  });

  it('cada proyecto tiene título, descripción, tags y repo', () => {
    for (const project of projects) {
      expect(project.title.length, 'proyecto sin título').toBeGreaterThan(0);
      expect(project.description.length, `${project.title} sin descripción`).toBeGreaterThan(0);
      expect(project.tags.length, `${project.title} sin tags`).toBeGreaterThan(0);
      expect(project.repoUrl, `${project.title} sin repoUrl`).toMatch(/^https:\/\//);
    }
  });

  it('los tags son únicos dentro de cada proyecto', () => {
    for (const project of projects) {
      expect(new Set(project.tags).size, `tags duplicados en ${project.title}`).toBe(
        project.tags.length
      );
    }
  });
});
