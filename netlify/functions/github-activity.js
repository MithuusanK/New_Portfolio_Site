/* eslint-env node */
const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';
const GITHUB_REST_ENDPOINT = 'https://api.github.com';

const activityQuery = `
  query GitHubActivity($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            firstDay
            contributionDays {
              contributionCount
              date
              weekday
              color
            }
          }
          months {
            name
            firstDay
            totalWeeks
            year
          }
        }
      }
    }
  }
`;

const languageColorMap = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572a5',
  Java: '#b07219',
  CSS: '#663399',
  HTML: '#e34c26',
  Shell: '#89e051',
  'Jupyter Notebook': '#da5b0b',
};

const toIsoDate = (date) => date.toISOString().slice(0, 10);

const computeStreaks = (days) => {
  let longest = 0;
  let running = 0;
  let bestDay = 0;
  let bestDayDate = '';

  for (const day of days) {
    if (day.contributionCount > 0) {
      running += 1;
      if (running > longest) {
        longest = running;
      }
    } else {
      running = 0;
    }

    if (day.contributionCount > bestDay) {
      bestDay = day.contributionCount;
      bestDayDate = day.date;
    }
  }

  let current = 0;
  for (let index = days.length - 1; index >= 0; index -= 1) {
    if (days[index].contributionCount > 0) {
      current += 1;
    } else {
      break;
    }
  }

  return {
    currentStreak: current,
    longestStreak: longest,
    bestDay,
    bestDayDate,
  };
};

const computeTopLanguages = (repos) => {
  const counts = new Map();
  let total = 0;

  for (const repo of repos) {
    if (!repo || repo.fork || repo.private || !repo.language) {
      continue;
    }

    counts.set(repo.language, (counts.get(repo.language) || 0) + 1);
    total += 1;
  }

  if (total === 0) {
    return [];
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / total) * 100),
      color: languageColorMap[name] || '#5edbff',
    }));
};

export const handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const username = event.queryStringParameters?.username || 'MithuusanK';
  const token = globalThis.process?.env?.GITHUB_TOKEN;

  if (!token) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Missing GITHUB_TOKEN environment variable.' }),
    };
  }

  const now = new Date();
  const fromDate = new Date(Date.UTC(now.getUTCFullYear() - 1, now.getUTCMonth(), now.getUTCDate() + 1));
  const toDate = now;

  try {
    const [activityResponse, reposResponse] = await Promise.all([
      fetch(GITHUB_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: activityQuery,
          variables: {
            login: username,
            from: `${toIsoDate(fromDate)}T00:00:00Z`,
            to: `${toIsoDate(toDate)}T23:59:59Z`,
          },
        }),
      }),
      fetch(`${GITHUB_REST_ENDPOINT}/users/${username}/repos?per_page=100&sort=updated&direction=desc`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
        },
      }),
    ]);

    const activityPayload = await activityResponse.json();
    const reposPayload = await reposResponse.json();

    if (!activityResponse.ok || activityPayload.errors) {
      return {
        statusCode: activityResponse.status || 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: 'GitHub activity query failed.',
          details: activityPayload.errors || activityPayload.message,
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

    const calendar = activityPayload?.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: 'No contribution calendar returned.',
        }),
      };
    }

    const weeks = (calendar.weeks || []).map((week) => ({
      firstDay: week.firstDay,
      days: (week.contributionDays || []).map((day) => ({
        date: day.date,
        weekday: day.weekday,
        contributionCount: day.contributionCount,
        color: day.color,
      })),
    }));

    const allDays = weeks.flatMap((week) => week.days);
    const streaks = computeStreaks(allDays);
    const topLanguages = computeTopLanguages(reposPayload);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
      },
      body: JSON.stringify({
        source: 'github_activity',
        username,
        from: toIsoDate(fromDate),
        to: toIsoDate(toDate),
        totalContributions: calendar.totalContributions || 0,
        currentStreak: streaks.currentStreak,
        longestStreak: streaks.longestStreak,
        bestDay: streaks.bestDay,
        bestDayDate: streaks.bestDayDate,
        months: calendar.months || [],
        weeks,
        topLanguages,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'Unexpected error while fetching GitHub activity.',
        details: error?.message || 'Unknown error',
      }),
    };
  }
};
