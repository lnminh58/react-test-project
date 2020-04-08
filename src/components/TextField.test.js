import React from 'react'
import TextField from '@/components/TextField';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme';
import { Form, Formik } from 'formik';
configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  shallow(<Formik>
          <TextField label="Full name" type="text" name="name" />
        </Formik>
        );
});
