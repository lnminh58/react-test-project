/* eslint-disable no-undef */
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import { TIME_FORMAT } from '@/constants/defaultValues';
import TimePicker from '@/components/TimePicker';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  shallow(<TimePicker time="00:00" onChangeTime={() => {}} timeFormat={TIME_FORMAT} />);
});
