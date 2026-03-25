import React, { useEffect, useState } from 'react';

const USERNAME = 'MithuusanK';

const makeFallbackWeeks = () =>
  Array.from({ length: 52 }, (_, weekIndex) => ({
    firstDay: '',
    days: Array.from({ length: 7 }, (_, dayIndex) => {
      let contributionCount = 0;

      if (weekIndex > 36 && (weekIndex + dayIndex) % 7 === 0) {
        contributionCount = 1;
      }
      if (weekIndex > 43 && (weekIndex + dayIndex) % 5 === 0) {
        contributionCount = 4;
      }
      if (weekIndex > 47 && (weekIndex + dayIndex) % 3 === 0) {
        contributionCount = 9;
      }

      return {
        date: `week-${weekIndex}-day-${dayIndex}`,
        weekday: dayIndex,
        contributionCount,
      };
    }),
  }));

const makeFallbackMonths = () => {
  const formatter = new Intl.DateTimeFormat('en-US', { month: 'short' });
  const months = [];
  const now = new Date();

  for (let offset = 11; offset >= 0; offset -= 1) {
    const date = new Date(now.getFullYear(), now.getMonth() - offset, 1);
    months.push({
      name: formatter.format(date),
      firstDay: date.toISOString().slice(0, 10),
      totalWeeks: 4,
      year: date.getFullYear(),
    });
  }

  return months;
};

const FALLBACK_ACTIVITY = {
  totalContributions: 301,
  currentStreak: 4,
  longestStreak: 26,
  bestDay: 22,
  bestDayDate: '',
  months: makeFallbackMonths(),
  weeks: makeFallbackWeeks(),
  topLanguages: [
    { name: 'TypeScript', percentage: 31, color: '#3178c6' },
    { name: 'JavaScript', percentage: 21, color: '#f1e05a' },
    { name: 'Python', percentage: 21, color: '#3572a5' },
    { name: 'Java', percentage: 14, color: '#b07219' },
    { name: 'CSS', percentage: 10, color: '#663399' },
  ],
};

const getHeatLevel = (count) => {
  if (count === 0) {
    return 'level-0';
  }
  if (count < 3) {
    return 'level-1';
  }
  if (count < 7) {
    return 'level-2';
  }
  if (count < 12) {
    return 'level-3';
  }
  return 'level-4';
};

const GitHubActivity = () => {
  const [activity, setActivity] = useState(FALLBACK_ACTIVITY);

  useEffect(() => {
    let cancelled = false;

    const loadActivity = async () => {
      try {
        const response = await fetch(`/.netlify/functions/github-activity?username=${USERNAME}`);
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.error || `Request failed with ${response.status}`);
        }

        if (!cancelled) {
          setActivity({
            totalContributions: payload.totalContributions || 0,
            currentStreak: payload.currentStreak || 0,
            longestStreak: payload.longestStreak || 0,
            bestDay: payload.bestDay || 0,
            bestDayDate: payload.bestDayDate || '',
            months: payload.months?.length ? payload.months : FALLBACK_ACTIVITY.months,
            weeks: payload.weeks?.length ? payload.weeks : FALLBACK_ACTIVITY.weeks,
            topLanguages: payload.topLanguages?.length
              ? payload.topLanguages
              : FALLBACK_ACTIVITY.topLanguages,
          });
        }
      } catch {
        if (!cancelled) {
          setActivity(FALLBACK_ACTIVITY);
        }
      }
    };

    loadActivity();

    return () => {
      cancelled = true;
    };
  }, []);

  const languageTotal = activity.topLanguages.reduce((sum, language) => sum + language.percentage, 0);

  return (
    <section id="activity" className="section">
      <h2 className="section-title">GitHub Activity</h2>

      <div className="activity-stats-grid">
        <article className="panel activity-stat-card">
          <strong>{activity.totalContributions}</strong>
          <span>Contributions</span>
          <small>last 12 months</small>
        </article>
        <article className="panel activity-stat-card">
          <strong>{activity.currentStreak}</strong>
          <span>Current Streak</span>
          <small>days</small>
        </article>
        <article className="panel activity-stat-card">
          <strong>{activity.longestStreak}</strong>
          <span>Longest Streak</span>
          <small>days</small>
        </article>
        <article className="panel activity-stat-card">
          <strong>{activity.bestDay}</strong>
          <span>Best Day</span>
          <small>contributions</small>
        </article>
      </div>

      <div className="panel activity-heatmap-panel">
        <div className="activity-months-row">
          {activity.months.slice(-12).map((month) => (
            <span key={`${month.name}-${month.year}-${month.firstDay}`}>{month.name}</span>
          ))}
        </div>

        <div className="activity-heatmap-layout">
          <div className="activity-weekday-labels">
            <span>Sun</span>
            <span>Tue</span>
            <span>Thu</span>
          </div>

          <div className="activity-heatmap-grid" aria-label="GitHub contribution heatmap">
            {activity.weeks.map((week, weekIndex) => (
              <div key={`${week.firstDay || 'week'}-${weekIndex}`} className="activity-week-column">
                {week.days.slice(0, 7).map((day) => (
                  <span
                    key={day.date}
                    className={`activity-day-cell ${getHeatLevel(day.contributionCount)}`}
                    title={`${day.date}: ${day.contributionCount} contributions`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="activity-languages">
        <h3>Top Languages</h3>
        <div className="activity-language-bar">
          {activity.topLanguages.map((language) => (
            <span
              key={language.name}
              style={{
                width: `${(language.percentage / Math.max(languageTotal, 1)) * 100}%`,
                background: language.color,
              }}
            />
          ))}
        </div>
        <div className="activity-language-legend">
          {activity.topLanguages.map((language) => (
            <div key={language.name}>
              <span style={{ background: language.color }} />
              {language.name} {language.percentage}%
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GitHubActivity;
