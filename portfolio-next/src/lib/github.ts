export interface GitHubStats {
  publicRepos: number;
  totalStars: number;
  followers: number;
  contributions: number;
}

export interface RepoInfo {
  name: string;
  description: string | null;
  htmlUrl: string;
  language: string | null;
  stars: number;
  updatedAt: string;
}

export interface GitHubData {
  stats: GitHubStats | null;
  repos: RepoInfo[];
}

const GITHUB_USER = 'Hazuru00';
const REVALIDATE_SECONDS = 60 * 60 * 24; // 24 h
const RECENT_REPO_LIMIT = 3;

/** Verifica si un valor es un objeto Record (no array, no null). */
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** Devuelve una cadena o null. */
function asString(value: unknown): string | null {
  return typeof value === 'string' && value.length > 0 ? value : null;
}

/** Combina el perfil con las estrellas sumadas de los repos. */
export function toGitHubStats(profile: unknown, repos: unknown): GitHubStats {
  const repoList: unknown[] = Array.isArray(repos) ? repos : [];

  if (!isRecord(profile) || typeof profile.public_repos !== 'number') {
    return { publicRepos: 0, totalStars: 0, followers: 0, contributions: 0 };
  }

  let total = 0;
  for (const r of repoList) {
    const record: Record<string, unknown> | undefined = r as Record<string, unknown>;
    if (isRecord(r) && typeof record.stargazers_count === 'number') {
      total += record.stargazers_count;
    }
  }
  const totalStars = total;

  // Contribuciones: count de repos con stargazers_count > 0 como proxy mínimo.
  let contributions = 0;
  // Usa filter sobre el array y luego filter isRecord para seguridad; count después.
  const repoRecords: Record<string, unknown>[] = [];
  for (const r of repoList) {
    if (isRecord(r) && typeof r.stargazers_count === 'number' && r.stargazers_count > 0) {
      repoRecords.push(r);
    }
  }
  contributions = repoRecords.length;

  return {
    publicRepos: profile.public_repos,
    totalStars,
    followers: typeof profile.followers === 'number' ? profile.followers : 0,
    contributions,
  };
}

/** Intenta contar eventos reales (PushEvent + PullRequest merged) desde el endpoint
 * público de GitHub. Devuelve un número no negativo, o -1 si falla para usar fallback. */
async function fetchContributionsFromEvents(): Promise<number> {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/events/public`, {
      headers: {
        'User-Agent': 'HazuDev-Portfolio',
        Accept: 'application/vnd.github+json',
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return -1;
    const raw = await res.json();

    // Contar PushEvent (commits) + PullRequestEvent con action === 'merged'
    let count = 0;
    const events = raw as Array<Record<string, unknown>>;
    for (const ev of events) {
      if (typeof ev !== 'object' || ev === null) continue;
      const event = ev as Record<string, unknown>;
      const type = event.type as string | undefined;
      if (!type) continue;
      if (type === 'PushEvent') {
        count += 1; // cada PushEvent cuenta como un lote de commits; lo contamos como 1 evento
      } else if (type === 'PullRequestEvent') {
        const payload = event.payload;
        if (typeof payload === 'object' && payload !== null && 'pull_request' in payload) {
          // tipo más flojo para que compile; GitHub API real siempre tiene esta estructura
          const pr = payload as { pull_request: { action?: string } };
          if (pr.pull_request && pr.pull_request.action === 'merged') {
            count += 1;
          }
        }
      }
    }
    return count >= 0 ? count : -1;
  } catch {
    return -1;
  }
}

/** Repos que no son forks, más recientes primero, limitados. */
export function toRecentRepos(repos: unknown, limit: number): RepoInfo[] {
  if (!Array.isArray(repos)) return [];

  return repos
    .filter(isRecord)
    .filter((r) => !r.fork)
    .filter((r) => typeof r.name === 'string' && r.name.length > 0)
    .sort((a, b) =>
      String(b.updated_at ?? '').localeCompare(String(a.updated_at ?? '')),
    )
    .slice(0, limit)
    .map((r) => ({
      name: String(r.name),
      description: asString(r.description),
      htmlUrl: asString(r.html_url) ?? '',
      language: asString(r.language),
      stars: typeof r.stargazers_count === 'number' ? r.stargazers_count : 0,
      updatedAt: asString(r.updated_at) ?? '',
    }));
}

async function githubFetch(url: string): Promise<Response | null> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'HazuDev-Portfolio',
        Accept: 'application/vnd.github+json',
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    return res.ok ? res : null;
  } catch {
    return null;
  }
}

/**
 * Stats y repos recientes del perfil público. Devuelve nulls ante cualquier
 * fallo para que la página siga funcionando sin conexión o si GitHub limita.
 */
export async function fetchGitHubData(): Promise<GitHubData> {
  const [profileRes, reposRes, eventsRes] = await Promise.all([
    githubFetch(`https://api.github.com/users/${GITHUB_USER}`),
    githubFetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
    ),
    fetchContributionsFromEvents(),
  ]);

  if (!profileRes || !reposRes) return { stats: null, repos: [] };

  try {
    const profile = await profileRes.json();
    const repos = await reposRes.json();

    // Stats y contribuciones "por estrellas" (fallback)
    const baseStats = toGitHubStats(profile, repos);
    let contributions = baseStats.contributions;

    // Si el fetch de events fue exitoso (>= 0), preferimos ese número real.
    // -1 significa error -> usamos el fallback de estrellas.
    if (eventsRes >= 0) {
      contributions = eventsRes;
    }

    return {
      stats: {
        publicRepos: baseStats.publicRepos,
        totalStars: baseStats.totalStars,
        followers: baseStats.followers,
        contributions,
      },
      repos: toRecentRepos(repos, RECENT_REPO_LIMIT),
    };
  } catch {
    return { stats: null, repos: [] };
  }
}
