import { call, put, delay } from 'redux-saga/effects';
import { SAVE_SCHEDULE_SUCCESS, SAVE_SCHEDULE_FAIL } from '@/store/actions/schedule';
import ScheduleApi from '@/api/schedule';

export function* saveSchedule(action) {
  try {
    const scheduleData = action.payload;
    yield call(ScheduleApi.saveSchedule, scheduleData);
    //fake api delay
    delay(1000);
    yield put({
      type: SAVE_SCHEDULE_SUCCESS,
      payload: {
        data: scheduleData,
      },
    });
  } catch (e) {
    yield put({ type: SAVE_SCHEDULE_FAIL, message: e.message });
  }
}
