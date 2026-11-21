import { describe, it, expect, vi, afterEach } from 'vitest';

import { toGitHubStats, toRecentRepos, fetchGitHubData } from '@/lib/github';

afterEach(() => {
  vi.unstubAllGlobals();
});

const repo = (over: Record<string, unknown> = {}) => ({
  name: 'repo-a',
  description: 'Una descripción',
  html_url: 'https://github.com/Hazuru00/repo-a',
  language: 'TypeScript',
  stargazers_count: 2,
  updated_at: '2026-01-01T00:00:00Z',
  fork: false,
  ...over,
});

describe('toGitHubStats', () => {
  it('combina el perfil con las estrellas sumadas de los repos', () => {
    const profile = { login: 'Hazuru00', public_repos: 12, followers: 7 };
    const repos = [{ stargazers_count: 3 }, { stargazers_count: 5 }, {}];

    expect(toGitHubStats(profile, repos)).toEqual({
      publicRepos: 12,
      totalStars: 8,
      followers: 7,
    });
  });

  it('devuelve null si el perfil no tiene el formato esperado', () => {
    expect(toGitHubStats(null, [])).toBeNull();
    expect(toGitHubStats({}, [])).toBeNull();
    expect(toGitHubStats({ public_repos: 'muchos' }, [])).toBeNull();
  });
});

describe('toRecentRepos', () => {
  it('filtra forks y ordena por fecha de actualización descendente', () => {
    const repos = [
      repo({ name: 'viejo', updated_at: '2025-01-01T00:00:00Z' }),
      repo({ name: 'fork', fork: true, updated_at: '2026-06-01T00:00:00Z' }),
      repo({ name: 'nuevo', updated_at: '2026-05-01T00:00:00Z' }),
    ];

    const result = toRecentRepos(repos, 10);

    expect(result.map((r) => r.name)).toEqual(['nuevo', 'viejo']);
  });

  it('limita la cantidad de repos devueltos', () => {
    const repos = [
      repo({ name: 'uno', updated_at: '2026-01-01T00:00:00Z' }),
      repo({ name: 'dos', updated_at: '2026-02-01T00:00:00Z' }),
      repo({ name: 'tres', updated_at: '2026-03-01T00:00:00Z' }),
    ];

    expect(toRecentRepos(repos, 2)).toHaveLength(2);
  });

  it('maneja descripción y lenguaje nulos', () => {
    const result = toRecentRepos([repo({ description: null, language: null })], 5);

    expect(result[0].description).toBeNull();
    expect(result[0].language).toBeNull();
  });
});

describe('fetchGitHubData', () => {
  it('devuelve valores nulos si la red falla', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));

    expect(await fetchGitHubData()).toEqual({ stats: null, repos: [] });
  });

  it('devuelve valores nulos si la API responde con error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 403 }),
    );

    expect(await fetchGitHubData()).toEqual({ stats: null, repos: [] });
  });

  it('mapea los datos cuando la API responde correctamente', async () => {
    const json = (body: unknown) => ({ ok: true, json: () => Promise.resolve(body) });
    vi.stubGlobal(
      'fetch',
      vi.fn()
        .mockResolvedValueOnce(json({ login: 'Hazuru00', public_repos: 3, followers: 4 }))
        .mockResolvedValueOnce(
          json([repo({ name: 'uno', stargazers_count: 9 }), repo({ name: 'dos' })]),
        ),
    );

    const data = await fetchGitHubData();

    expect(data.stats).toEqual({ publicRepos: 3, totalStars: 11, followers: 4 });
    expect(data.repos.map((r) => r.name)).toEqual(['uno', 'dos']);
  });
});
