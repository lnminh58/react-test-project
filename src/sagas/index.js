import { takeLatest, all } from 'redux-saga/effects';

import { SAVE_SCHEDULE_REQUEST } from '@/store/actions/schedule';
import { saveSchedule } from './schedule';

export default function* rootSaga() {
  yield all([takeLatest(SAVE_SCHEDULE_REQUEST, saveSchedule)]);
}
