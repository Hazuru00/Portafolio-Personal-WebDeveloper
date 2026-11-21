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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function asString(value: unknown): string | null {
  return typeof value === 'string' && value.length > 0 ? value : null;
}

/** Combina el perfil con las estrellas sumadas de los repos. */
export function toGitHubStats(profile: unknown, repos: unknown): GitHubStats {
  const repoList: unknown[] = Array.isArray(repos) ? repos : [];

  if (!isRecord(profile) || typeof profile.public_repos !== 'number') {
    return { publicRepos: 0, totalStars: 0, followers: 0, contributions: 0 };
  }

  let totalStars = 0;
  for (const r of repoList) {
    totalStars += Number((r as Record<string, unknown>).stargazers_count) || 0;
  }

  let contributions = 0;
  for (const r of repoList) {
    const sx = Number((r as Record<string, unknown>).stargazers_count);
    if (sx > 0) contributions += 1;
  }

  return {
    publicRepos: profile.public_repos,
    totalStars,
    followers: typeof profile.followers === 'number' ? profile.followers : 0,
    contributions,
  };
}

/** Intenta contar eventos reales (PushEvent + PullRequest merged) desde el endpoint público. */
async function fetchContributionsFromEvents(): Promise<number> {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/events/public`, {
      headers: { 'User-Agent': 'HazuDev-Portfolio', Accept: 'application/vnd.github+json' },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return -1;
    const events = (await res.json()) as Array<{
      type: string;
      payload: { pull_request?: { action: string } };
    }>;
    let count = 0;
    for (const ev of events) {
      if (ev.type === 'PushEvent') count += 1;
      else if (ev.type === 'PullRequestEvent') {
        if (ev.payload && 'pull_request' in ev.payload && ev.payload.pull_request?.action === 'merged') count += 1;
      }
    }
    return count >= 0 ? count : -1;
  } catch {
    return -1;
  }
}

/** Repos no fork, recientes, limitados. */
export function toRecentRepos(repos: unknown, limit: number): RepoInfo[] {
  if (!Array.isArray(repos)) return [];

  return repos
    .filter((r: unknown) => isRecord(r) && !r.fork && typeof r.name === 'string' && r.name.length > 0)
    .sort((a: Record<string, unknown>, b: Record<string, unknown>) =>
      String(b.updated_at ?? '').localeCompare(String(a.updated_at ?? '')),
    )
    .slice(0, limit)
    .map((r: Record<string, unknown>) => ({
      name: String(r.name),
      description: asString(r.description),
      htmlUrl: asString(r.html_url) ?? '',
      language: asString(r.language),
      stars: Number(r.stargazers_count) || 0,
      updatedAt: asString(r.updated_at) ?? '',
    }));
}

const GITHUB_USER = 'Hazuru00';
const REVALIDATE_SECONDS = 60 * 60 * 24;
const RECENT_REPO_LIMIT = 3;

async function githubFetch(url: string): Promise<Response | null> {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'HazuDev-Portfolio', Accept: 'application/vnd.github+json' },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    return res.ok ? res : null;
  } catch {
    return null;
  }
}

export async function fetchGitHubData(): Promise<GitHubData> {
  const [profileRes, reposRes, eventsRes] = await Promise.all([
    githubFetch(`https://api.github.com/users/${GITHUB_USER}`),
    githubFetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`),
    fetchContributionsFromEvents(),
  ]);

  if (!profileRes || !reposRes) return { stats: null, repos: [] };

  try {
    const profile = await profileRes.json();
    const repos = await reposRes.json();

    const baseStats = toGitHubStats(profile, repos);
    let contributions = baseStats.contributions;
    if (eventsRes >= 0) contributions = eventsRes;

    return {
      stats: { publicRepos: baseStats.publicRepos, totalStars: baseStats.totalStars, followers: baseStats.followers, contributions },
      repos: toRecentRepos(repos, RECENT_REPO_LIMIT),
    };
  } catch {
    return { stats: null, repos: [] };
  }
}
