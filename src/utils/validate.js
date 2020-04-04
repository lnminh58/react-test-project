import * as Yup from 'yup';
import moment from 'moment';

import { TIME_FORMAT } from '@/constants/defaultValues';

export const scheduleFormSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Name is required')
    .min(5, 'Username must have min 5 characters')
    .max(10, 'Username have max 10 characters'),
});

export const validateSchedules = schedules => {
  const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  const errorIds = [];
  schedules.forEach(schedule => {
    const inValidTime = !timeRegex.test(schedule.startTime) || !timeRegex.test(schedule.endTime);

    const startTime = moment(schedule.startTime, TIME_FORMAT);
    const endTime = moment(schedule.endTime, TIME_FORMAT);
    const inValidValue = endTime.diff(startTime) < 0;

    if (inValidValue || inValidTime) {
      errorIds.push(schedule.id);
    }
  });

  return errorIds;
};
