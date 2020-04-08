import React from 'react'
import TimePicker from '@/components/TimePicker';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme';
import {TIME_FORMAT } from '@/constants/defaultValues';
configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  shallow(<TimePicker
    time="00:00"
    onChangeTime={()=>{}}
    timeFormat={TIME_FORMAT}
  />);
});
