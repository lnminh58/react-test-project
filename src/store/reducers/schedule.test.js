/* eslint-disable no-undef */
import {
  SAVE_SCHEDULE_REQUEST,
  SAVE_SCHEDULE_SUCCESS,
  SAVE_SCHEDULE_FAIL,
} from '@/store/actions/schedule';
import scheduleReducer, { initialState } from './schedule';

describe('SHEDULE REDUCER', () => {
  it('should return the initial state', () => {
    expect(scheduleReducer(initialState, {})).toEqual(initialState);
  });

  it('should handle "SAVE_SCHEDULE_REQUEST" action', () => {
    expect(scheduleReducer(initialState, { type: SAVE_SCHEDULE_REQUEST })).toEqual({
      ...initialState,
      schedule: {
        ...initialState.schedule,
        requesting: true,
        status: '',
      },
    });
  });

  it('should handle "SAVE_SCHEDULE_SUCCESS" action', () => {
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

    expect(
      scheduleReducer(initialState, { type: SAVE_SCHEDULE_SUCCESS, payload: { data: mockData } }),
    ).toEqual({
      ...initialState,
      schedule: {
        ...initialState.schedule,
        requesting: false,
        status: 'success',
        result: { data: mockData },
      },
    });
  });

  it('should handle "SAVE_SCHEDULE_FAIL" action', () => {
    const mockError = new Error('invalid data');

    expect(scheduleReducer(initialState, { type: SAVE_SCHEDULE_FAIL, payload: mockError })).toEqual(
      {
        ...initialState,
        schedule: {
          ...initialState.schedule,
          requesting: false,
          status: 'error',
          error: mockError,
        },
      },
    );
  });
});
