// Datos públicos del perfil de GitHub, cacheados por 24 h (ISR).

const GITHUB_USER = 'Hazuru00';
const REVALIDATE_SECONDS = 60 * 60 * 24; // 24 h
const RECENT_REPO_LIMIT = 3;

export interface GitHubStats {
  publicRepos: number;
  totalStars: number;
  followers: number;
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function asString(value: unknown): string | null {
  return typeof value === 'string' && value.length > 0 ? value : null;
}

/** Combina el perfil con las estrellas sumadas de los repos. */
export function toGitHubStats(profile: unknown, repos: unknown): GitHubStats | null {
  if (!isRecord(profile) || typeof profile.public_repos !== 'number') return null;

  const list = Array.isArray(repos) ? repos : [];
  const totalStars = list.reduce(
    (sum, r) =>
      sum +
      (isRecord(r) && typeof r.stargazers_count === 'number' ? r.stargazers_count : 0),
    0,
  );

  return {
    publicRepos: profile.public_repos,
    totalStars,
    followers: typeof profile.followers === 'number' ? profile.followers : 0,
  };
}

/** Repos que no son forks, más recientes primero, limitados. */
export function toRecentRepos(repos: unknown, limit: number): RepoInfo[] {
  if (!Array.isArray(repos)) return [];

  return repos
    .filter(isRecord)
    .filter((r) => !r.fork)
    .filter((r) => typeof r.name === 'string' && r.name.length > 0)
    .sort((a, b) => String(b.updated_at ?? '').localeCompare(String(a.updated_at ?? '')))
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
  const [profileRes, reposRes] = await Promise.all([
    githubFetch(`https://api.github.com/users/${GITHUB_USER}`),
    githubFetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
    ),
  ]);

  if (!profileRes || !reposRes) return { stats: null, repos: [] };

  try {
    const profile = await profileRes.json();
    const repos = await reposRes.json();

    return {
      stats: toGitHubStats(profile, repos),
      repos: toRecentRepos(repos, RECENT_REPO_LIMIT),
    };
  } catch {
    return { stats: null, repos: [] };
  }
}
