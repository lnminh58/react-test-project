/* eslint-disable no-undef */
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { Formik } from 'formik';
import { shallow, configure } from 'enzyme';

import TextField from '@/components/TextField';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  shallow(
    <Formik>
      <TextField label="Full name" type="text" name="name" />
    </Formik>,
  );
});
