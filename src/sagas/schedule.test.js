/* eslint-disable no-undef */
import { put } from 'redux-saga/effects';

import { SAVE_SCHEDULE_SUCCESS } from '@/store/actions/schedule';

import { saveSchedule } from './schedule';

describe('SHEDULE SAGAS', () => {
  it('should dispatch action "SAVE_SCHEDULE_SUCCESS" with result from save scheduleAPI', () => {
    const mockData = {
      name: 'username',
      schedules: [
        { id: 1, startTime: '00:00', endTime: '00:00' },
        { id: 2, startTime: '00:00', endTime: '00:00' },
        { id: 3, startTime: '00:00', endTime: '00:00' },
        { id: 4, startTime: '00:00', endTime: '00:00' },
        { id: 5, startTime: '00:00', endTime: '00:00' },
        { id: 6, startTime: '00:00', endTime: '00:00' },
        { id: 7, startTime: '00:00', endTime: '00:00' },
      ],
    };
    const generator = saveSchedule({ payload: mockData });
    generator.next();

    expect(generator.next(mockData).value).toEqual(
      put({
        type: SAVE_SCHEDULE_SUCCESS,
        payload: {
          data: mockData,
        },
      }),
    );
    expect(generator.next().done).toBeTruthy();
  });
});
