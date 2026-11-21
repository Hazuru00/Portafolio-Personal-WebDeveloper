export interface GitHubStats {
  publicRepos: number;
  totalStars: number;
  followers: number;
  contributions: number;
  pullRequests: number;
}

export interface RepoInfo {
  name: string;
  description: string | null;
  htmlUrl: string;
  language: string | null;
  stars: number;
  updatedAt: string;
  lastPush?: string;
}

export interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: Array<{
    contributionDays: ContributionDay[];
  }>;
}

export interface GitHubData {
  stats: GitHubStats | null;
  repos: RepoInfo[];
  calendar: ContributionCalendar | null;
}

interface GraphQLContributionsResponse {
  data: {
    user: {
      contributionsCollection: {
        totalCommitContributions: number;
        totalPullRequestContributions: number;
        contributionCalendar: ContributionCalendar;
      };
    } | null;
  } | null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function asString(value: unknown): string | null {
  return typeof value === 'string' && value.length > 0 ? value : null;
}

const GITHUB_USER = 'Hazuru00';
const REVALIDATE_SECONDS = 60 * 60 * 24;
const RECENT_REPO_LIMIT = 6;

/** Combina el perfil con las estrellas sumadas de los repos. */
export function toGitHubStats(profile: unknown, repos: unknown): GitHubStats {
  const repoList: unknown[] = Array.isArray(repos) ? repos : [];

  if (!isRecord(profile) || typeof profile.public_repos !== 'number') {
    return { publicRepos: 0, totalStars: 0, followers: 0, contributions: 0, pullRequests: 0 };
  }

  let totalStars = 0;
  for (const r of repoList) {
    totalStars += Number((r as Record<string, unknown>).stargazers_count) || 0;
  }

  return {
    publicRepos: profile.public_repos,
    totalStars,
    followers: typeof profile.followers === 'number' ? profile.followers : 0,
    contributions: 0, // Se llena con datos reales de GraphQL
    pullRequests: 0,  // Se llena con datos reales de GraphQL
  };
}

/** Obtiene la fecha del último push real por repo desde los eventos públicos.
 * Los eventos traen el nombre con owner ("HazuDev/repo"), los repos sin él. */
function getLastPushByRepo(
  events: Array<{ type: string; created_at: string; repo?: { name?: string } }>,
): Map<string, string> {
  const map = new Map<string, string>();
  for (const ev of events) {
    if (ev.type !== 'PushEvent' || !ev.repo?.name) continue;
    const fullName = ev.repo.name;
    const shortName = fullName.includes('/') ? fullName.slice(fullName.indexOf('/') + 1) : fullName;
    const existing = map.get(shortName);
    if (!existing || ev.created_at > existing) {
      map.set(shortName, ev.created_at);
    }
  }
  return map;
}

/** Repos no fork, ordenados por último push real (más reciente primero), limitados. */
export function toRecentRepos(
  repos: unknown,
  lastPushByRepo: Map<string, string> = new Map(),
  limit: number = RECENT_REPO_LIMIT,
): RepoInfo[] {
  if (!Array.isArray(repos)) return [];

  const pushDate = (name: string, updatedAt: string): string =>
    lastPushByRepo.get(name) ?? updatedAt;

  return repos
    .filter((r: unknown) => isRecord(r) && !r.fork && typeof r.name === 'string' && r.name.length > 0)
    .sort((a, b) => {
      const aDate = pushDate(String(a.name ?? ''), String(a.updated_at ?? ''));
      const bDate = pushDate(String(b.name ?? ''), String(b.updated_at ?? ''));
      return new Date(bDate).getTime() - new Date(aDate).getTime();
    })
    .slice(0, limit)
    .map((r: Record<string, unknown>) => {
      const name = String(r.name);
      return {
        name,
        description: asString(r.description),
        htmlUrl: asString(r.html_url) ?? '',
        language: asString(r.language),
        stars: Number(r.stargazers_count) || 0,
        updatedAt: asString(r.updated_at) ?? '',
        lastPush: lastPushByRepo.get(name),
      };
    });
}

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

/** Consulta GraphQL autenticada; devuelve null si no hay token o falla. */
async function fetchGitHubGraphQL(query: string): Promise<GraphQLContributionsResponse['data']> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'HazuDev-Portfolio',
      },
      body: JSON.stringify({ query }),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as GraphQLContributionsResponse & { errors?: unknown[] };
    if (json.errors || !json.data?.user) return null;
    return json.data;
  } catch {
    return null;
  }
}

async function fetchContributions(): Promise<{
  commits: number;
  prs: number;
  calendar: ContributionCalendar | null;
}> {
  const year = new Date().getFullYear();
  const data = await fetchGitHubGraphQL(`
    query {
      user(login: "${GITHUB_USER}") {
        contributionsCollection(from: "${year}-01-01T00:00:00Z", to: "${year}-12-31T23:59:59Z") {
          totalCommitContributions
          totalPullRequestContributions
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays { date contributionCount color }
            }
          }
        }
      }
    }
  `);

  const cc = data?.user?.contributionsCollection;
  if (!cc) return { commits: 0, prs: 0, calendar: null };

  return {
    commits: cc.totalCommitContributions ?? 0,
    prs: cc.totalPullRequestContributions ?? 0,
    calendar: cc.contributionCalendar ?? null,
  };
}

async function fetchEventsForRepoOrdering(): Promise<Map<string, string>> {
  const res = await githubFetch(`https://api.github.com/users/${GITHUB_USER}/events/public`);
  if (!res) return new Map();
  try {
    const events = (await res.json()) as Array<{
      type: string;
      created_at: string;
      repo?: { name?: string };
    }>;
    return getLastPushByRepo(events);
  } catch {
    return new Map();
  }
}

export async function fetchGitHubData(): Promise<GitHubData> {
  const empty: GitHubData = { stats: null, repos: [], calendar: null };
  const [profileRes, reposRes, contributions, eventsMap] = await Promise.all([
    githubFetch(`https://api.github.com/users/${GITHUB_USER}`),
    githubFetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`),
    fetchContributions(),
    fetchEventsForRepoOrdering(),
  ]);

  if (!profileRes || !reposRes) return empty;

  try {
    const profile = await profileRes.json();
    const repos = await reposRes.json();
    const baseStats = toGitHubStats(profile, repos);

    return {
      stats: {
        publicRepos: baseStats.publicRepos,
        totalStars: baseStats.totalStars,
        followers: baseStats.followers,
        contributions: contributions.commits,
        pullRequests: contributions.prs,
      },
      repos: toRecentRepos(repos, eventsMap, RECENT_REPO_LIMIT),
      calendar: contributions.calendar,
    };
  } catch {
    return empty;
  }
}
