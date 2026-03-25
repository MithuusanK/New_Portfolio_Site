/* eslint-env node */
const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';
const GITHUB_REST_ENDPOINT = 'https://api.github.com';

const pinnedQuery = `
  query PinnedRepos($login: String!, $first: Int!) {
    user(login: $login) {
      pinnedItems(first: $first, types: REPOSITORY) {
        nodes {
          ... on Repository {
            id
            name
            description
            url
            homepageUrl
            isPrivate
            primaryLanguage {
              name
              color
            }
            languages(first: 6, orderBy: { field: SIZE, direction: DESC }) {
              nodes {
                name
                color
              }
            }
            stargazerCount
            forkCount
            updatedAt
          }
        }
      }
    }
  }
`;

export const handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const username = event.queryStringParameters?.username || 'MithuusanK';
  const limit = Number.parseInt(event.queryStringParameters?.limit || '6', 10);
  const first = Number.isNaN(limit) ? 6 : Math.min(Math.max(limit, 1), 12);

  const token = globalThis.process?.env?.GITHUB_TOKEN;

  if (!token) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'Missing GITHUB_TOKEN environment variable.',
      }),
    };
  }

  try {
    const commonHeaders = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const [pinnedResponse, reposResponse] = await Promise.all([
      fetch(GITHUB_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: commonHeaders,
        body: JSON.stringify({
          query: pinnedQuery,
          variables: { login: username, first },
        }),
      }),
      fetch(`${GITHUB_REST_ENDPOINT}/users/${username}/repos?per_page=100&sort=updated&direction=desc`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
        },
      }),
    ]);

    const pinnedPayload = await pinnedResponse.json();
    const reposPayload = await reposResponse.json();

    if (!pinnedResponse.ok || pinnedPayload.errors) {
      return {
        statusCode: pinnedResponse.status || 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: 'GitHub pinned query failed.',
          details: pinnedPayload.errors || pinnedPayload.message,
        }),
      };
    }

    if (!reposResponse.ok || !Array.isArray(reposPayload)) {
      return {
        statusCode: reposResponse.status || 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: 'GitHub repositories query failed.',
          details: reposPayload?.message || 'Unknown repositories response',
        }),
      };
    }

    const pinnedRepos = pinnedPayload?.data?.user?.pinnedItems?.nodes || [];

    const projects = pinnedRepos
      .filter((repo) => repo && !repo.isPrivate)
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || 'No description provided yet.',
        repoUrl: repo.url,
        link: repo.homepageUrl || repo.url,
        stars: repo.stargazerCount,
        forks: repo.forkCount,
        updatedAt: repo.updatedAt,
        primaryLanguage: repo.primaryLanguage,
        languages: (repo.languages?.nodes || []).map((lang) => lang.name),
      }));

    const repositories = reposPayload
      .filter((repo) => repo && !repo.private)
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || 'No description provided yet.',
        repoUrl: repo.html_url,
        link: repo.homepage || repo.html_url,
        updatedAt: repo.updated_at,
        visibility: repo.visibility || 'public',
        primaryLanguage: repo.language ? { name: repo.language } : null,
      }));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
      },
      body: JSON.stringify({
        username,
        source: 'github_pinned',
        count: projects.length,
        repositoryCount: repositories.length,
        repositories,
        projects,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'Unexpected error while fetching pinned repositories.',
        details: error?.message || 'Unknown error',
      }),
    };
  }
};
