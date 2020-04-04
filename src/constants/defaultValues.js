export const DAY_OF_WEEK = [
  {
    id: 1,
    label: 'Monday',
  },
  {
    id: 2,
    label: 'Tuesday',
  },
  {
    id: 3,
    label: 'Wednesday',
  },
  {
    id: 4,
    label: 'Thursday',
  },
  {
    id: 5,
    label: 'Friday',
  },
  {
    id: 6,
    label: 'Saturday',
  },
  {
    id: 7,
    label: 'Sunday',
  },
];

export const INIT_VALUES = DAY_OF_WEEK.map(day => ({
  ...day,
  startTime: '00:00',
  endTime: '00:00',
}));
