import { describe, it, expect, vi, afterEach } from 'vitest';

import { toGitHubStats, toRecentRepos, fetchGitHubData } from '@/lib/github';

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
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

const jsonResponse = (body: unknown) => ({ ok: true, json: () => Promise.resolve(body) });

describe('toGitHubStats', () => {
  it('devuelve stats básicos cuando el perfil es válido', () => {
    const profile = { login: 'Hazuru00', public_repos: 12, followers: 7, repos_url: '' };
    const repos = [{ stargazers_count: 3 }, { stargazers_count: 5 }, {}];

    expect(toGitHubStats(profile, repos)).toEqual({
      publicRepos: 12,
      totalStars: 8,
      followers: 7,
      contributions: 0,
      pullRequests: 0,
    });
  });

  it('devuelve ceros si el perfil no tiene el formato esperado', () => {
    const empty = { publicRepos: 0, totalStars: 0, followers: 0, contributions: 0, pullRequests: 0 };
    expect(toGitHubStats(null, [])).toEqual(empty);
    expect(toGitHubStats({}, [])).toEqual(empty);
    expect(toGitHubStats({ public_repos: 'muchos' }, [])).toEqual(empty);
  });
});

describe('toRecentRepos', () => {
  it('filtra forks y ordena por fecha de actualización descendente', () => {
    const repos = [
      repo({ name: 'viejo', updated_at: '2025-01-01T00:00:00Z' }),
      repo({ name: 'fork', fork: true, updated_at: '2026-06-01T00:00:00Z' }),
      repo({ name: 'nuevo', updated_at: '2026-05-01T00:00:00Z' }),
    ];

    expect(toRecentRepos(repos, new Map(), 10).map((r) => r.name)).toEqual(['nuevo', 'viejo']);
  });

  it('ordena por último push real por encima del updated_at', () => {
    const repos = [
      repo({ name: 'caja-regalo', updated_at: '2026-11-14T06:13:15Z' }),
      repo({ name: 'Portafolio-Personal-WebDeveloper', updated_at: '2026-08-27T03:52:25Z' }),
    ];
    const lastPushes = new Map([
      ['Portafolio-Personal-WebDeveloper', '2026-11-20T01:05:10Z'],
    ]);

    const result = toRecentRepos(repos, lastPushes, 10);

    expect(result.map((r) => r.name)).toEqual([
      'Portafolio-Personal-WebDeveloper',
      'caja-regalo',
    ]);
    expect(result[0].lastPush).toBe('2026-11-20T01:05:10Z');
  });

  it('limita la cantidad de repos devueltos', () => {
    const repos = [
      repo({ name: 'uno', updated_at: '2026-01-01T00:00:00Z' }),
      repo({ name: 'dos', updated_at: '2026-02-01T00:00:00Z' }),
      repo({ name: 'tres', updated_at: '2026-03-01T00:00:00Z' }),
    ];

    expect(toRecentRepos(repos, new Map(), 2)).toHaveLength(2);
  });

  it('maneja descripción y lenguaje nulos', () => {
    const result = toRecentRepos([repo({ description: null, language: null })], new Map(), 5);

    expect(result[0].description).toBeNull();
    expect(result[0].language).toBeNull();
  });
});

describe('fetchGitHubData', () => {
  it('devuelve valores nulos si la red falla', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));

    expect(await fetchGitHubData()).toEqual({ stats: null, repos: [], calendar: null });
  });

  it('devuelve valores nulos si la API responde con error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 403 }));

    expect(await fetchGitHubData()).toEqual({ stats: null, repos: [], calendar: null });
  });

  it('mapea los datos cuando la API responde correctamente', async () => {
    vi.stubEnv('GITHUB_TOKEN', 'test-token');
    const calendar = {
      totalContributions: 42,
      weeks: [{ contributionDays: [{ date: '2026-01-01', contributionCount: 3, color: '#9be9a8' }] }],
    };
    vi.stubGlobal(
      'fetch',
      vi.fn()
        .mockResolvedValueOnce(jsonResponse({ login: 'Hazuru00', public_repos: 3, followers: 4 }))
        .mockResolvedValueOnce(jsonResponse([
          repo({ name: 'uno', stargazers_count: 9 }),
          repo({ name: 'dos', stargazers_count: 0 }),
        ]))
        // GraphQL (contribuciones) — se llama antes que eventos en el Promise.all
        .mockResolvedValueOnce(jsonResponse({
          data: {
            user: {
              contributionsCollection: {
                totalCommitContributions: 549,
                totalPullRequestContributions: 7,
                contributionCalendar: calendar,
              },
            },
          },
        }))
        .mockResolvedValueOnce(jsonResponse([])),
    );

    const data = await fetchGitHubData();

    expect(data.stats).toEqual({
      publicRepos: 3,
      totalStars: 9,
      followers: 4,
      contributions: 549,
      pullRequests: 7,
    });
    expect(data.repos.map((r) => r.name)).toEqual(['uno', 'dos']);
    expect(data.calendar).toEqual(calendar);
  });

  it('ordena los repos por el último push real de eventos con nombre con owner', async () => {
    vi.stubEnv('GITHUB_TOKEN', 'test-token');
    vi.stubGlobal(
      'fetch',
      vi.fn()
        .mockResolvedValueOnce(jsonResponse({ public_repos: 2, followers: 0 }))
        .mockResolvedValueOnce(jsonResponse([
          repo({ name: 'caja-regalo', updated_at: '2026-11-14T06:13:15Z' }),
          repo({ name: 'Portafolio-Personal-WebDeveloper', updated_at: '2026-08-27T03:52:25Z' }),
        ]))
        .mockResolvedValueOnce(jsonResponse({
          data: {
            user: {
              contributionsCollection: {
                totalCommitContributions: 10,
                totalPullRequestContributions: 1,
                contributionCalendar: { totalContributions: 11, weeks: [] },
              },
            },
          },
        }))
        .mockResolvedValueOnce(jsonResponse([
          { type: 'PushEvent', created_at: '2026-11-20T01:05:10Z', repo: { name: 'Hazuru00/Portafolio-Personal-WebDeveloper' } },
          { type: 'PushEvent', created_at: '2026-11-14T06:13:15Z', repo: { name: 'Hazuru00/caja-regalo' } },
        ])),
    );

    const data = await fetchGitHubData();

    expect(data.repos.map((r) => r.name)).toEqual([
      'Portafolio-Personal-WebDeveloper',
      'caja-regalo',
    ]);
    expect(data.repos[0].lastPush).toBe('2026-11-20T01:05:10Z');
  });

  it('usa 0 contribuciones si no hay token de GraphQL', async () => {
    vi.stubEnv('GITHUB_TOKEN', undefined);
    vi.stubGlobal(
      'fetch',
      vi.fn()
        .mockResolvedValueOnce(jsonResponse({ public_repos: 1, followers: 0 }))
        .mockResolvedValueOnce(jsonResponse([repo()]))
        .mockResolvedValueOnce(jsonResponse([])),
    );

    const data = await fetchGitHubData();

    expect(data.stats?.contributions).toBe(0);
    expect(data.calendar).toBeNull();
  });
});
