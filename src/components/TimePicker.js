import React from 'react';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';


const TimePickerComponent = ({ onChangeTime, time, timeFormat, ...props }) => (
  <MuiPickersUtilsProvider utils={MomentUtils}>
    <TimePicker
      value={moment(time, timeFormat).toDate()}
      onChange={onChangeTime}
      {...props}
      format={timeFormat}
    />
  </MuiPickersUtilsProvider>
);

export default TimePickerComponent;
