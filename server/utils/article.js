const getTitleIdentifier = (title) => {
  return title
    .split('-')[0]
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-');
};

const WEEK_DAY_LABELS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const MONTH_LABELS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const MERIDIES_LABEL = [
  'am',
  'pm',
];

const formatDate = (input) => {
  const date = typeof input === 'Date'
    ? input
    : new Date(input);
  const rawHours = date.getHours();
  let hours = rawHours % 12;
  if (hours === 0) {
    hours = 12;
  }

  console.log()
  return `${WEEK_DAY_LABELS[date.getDay()]} ${date.getDate()} ${MONTH_LABELS[date.getMonth()]} ${date.getFullYear()}, ${hours % 12}:${date.getMinutes()}${MERIDIES_LABEL[Math.floor(rawHours / 12)]}`;
};

module.exports = {
  getTitleIdentifier,
  formatDate,
};
