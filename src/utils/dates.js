// Date helpers. Completions are stored as local calendar days ("YYYY-MM-DD")
// so a habit done at 23:59 counts for that day in the user's time zone.

const pad = (n) => String(n).padStart(2, '0');

export const toDateKey = (date = new Date()) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

export const todayKey = () => toDateKey(new Date());

const shiftDays = (date, days) => {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
};

/**
 * Number of consecutive days, ending today, on which the habit was completed.
 * If today is not done yet, the streak still counts up to yesterday, so it
 * only breaks once a full day is missed.
 */
export const currentStreak = (completions = [], now = new Date()) => {
  const done = new Set(completions);
  let cursor = done.has(toDateKey(now)) ? now : shiftDays(now, -1);
  let streak = 0;
  while (done.has(toDateKey(cursor))) {
    streak += 1;
    cursor = shiftDays(cursor, -1);
  }
  return streak;
};

/** Completion flags for the last `days` days, oldest first (for a mini history). */
export const recentHistory = (completions = [], days = 7, now = new Date()) => {
  const done = new Set(completions);
  return Array.from({ length: days }, (_, i) => {
    const date = shiftDays(now, i - (days - 1));
    const key = toDateKey(date);
    return { key, done: done.has(key) };
  });
};
