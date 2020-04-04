import * as Yup from 'yup';

export const scheduleFormSchema = Yup.object().shape({
  name: Yup.string().trim().required('Name is required'),
});

export const validateSchedules = schedules => {
  const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  const errorIds = [];
  schedules.forEach(schedule => {
    if (!timeRegex.test(schedule.startTime) || !timeRegex.test(schedule.endTime)) {
      errorIds.push(schedule.id);
    }
  });

  return errorIds;
};
