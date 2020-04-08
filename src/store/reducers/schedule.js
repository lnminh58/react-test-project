import {
  SAVE_SCHEDULE_REQUEST,
  SAVE_SCHEDULE_SUCCESS,
  SAVE_SCHEDULE_FAIL,
} from '@/store/actions/schedule';

export const initialState = {
  schedule: {
    requesting: false,
    status: '',
    result: null,
    error: null,
  },
};

const scheduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_SCHEDULE_REQUEST: {
      return {
        ...state,
        schedule: {
          ...state.schedule,
          requesting: true,
          status: '',
        },
      };
    }
    case SAVE_SCHEDULE_SUCCESS: {
      return {
        ...state,
        schedule: {
          ...state.schedule,
          requesting: false,
          status: 'success',
          result: action.payload,
        },
      };
    }
    case SAVE_SCHEDULE_FAIL: {
      return {
        ...state,
        schedule: {
          ...state.schedule,
          requesting: false,
          status: 'error',
          error: action.payload,
        },
      };
    }
    default:
      return state;
  }
};

export default scheduleReducer;
