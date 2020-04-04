import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Table,
  thead,
  tbody,
  tr,
  td,
  th,
  Button,
  Spinner,
} from 'react-bootstrap';
import { get } from 'lodash';
import { Form, Formik } from 'formik';
import { useDispatch, connect } from 'react-redux';

import { SAVE_SCHEDULE_REQUEST } from '@/store/actions/schedule';
import { DAY_OF_WEEK, INIT_VALUES } from '@/constants/defaultValues';
import TextField from '@/components/TextField';
import { scheduleFormSchema, validateSchedules } from '@/utils/validate';

import './App.scss';

const IS_START_TIME = true;

const App = ({ rSchedule }) => {
  const isRequesting = get(rSchedule, 'requesting');

  const [selectedDayId, setSelectedDayId] = useState(1);

  const [values, setValues] = useState(get(rSchedule, 'result.data.schedules', INIT_VALUES));

  const [errorIds, setErrorIds] = useState([]);

  const dispatch = useDispatch();

  const setTime = isStartTime => ({ nativeEvent }) => {
    const value = nativeEvent.target.value;
    const updateValues = values.map(item => {
      if (item.id === selectedDayId) {
        return {
          ...item,
          [isStartTime ? 'startTime' : 'endTime']: value,
        };
      }

      return item;
    });

    const errorValueIds = validateSchedules(updateValues);

    setErrorIds(errorValueIds);
    setValues(updateValues);
  };

  const handleSubmit = formValues => {
    if (errorIds.length > 0) {
      return;
    }

    dispatch({
      type: SAVE_SCHEDULE_REQUEST,
      payload: {
        name: formValues.name,
        schedules: values,
      },
    });
  };

  const selectedDay = values.find(item => item.id === selectedDayId);

  return (
    <div className="App">
      <Formik
        initialValues={{ name: get(rSchedule, 'result.data.name') }}
        validationSchema={scheduleFormSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <Container>
              <Row className="mt-5">
                <Col md={4}>
                  <TextField label="Name" type="text" name="name" />
                </Col>
              </Row>

              <Row>
                <Col>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        {DAY_OF_WEEK.map(day => (
                          <th className="table-col" key={day.id}>
                            {day.label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {values.map(item => (
                          <td
                            role="gridcell"
                            key={item.id}
                            className={`${selectedDay.id === item.id ? 'td-selected' : ''} ${
                              errorIds.includes(item.id) ? 'td-error' : ''
                            }`}
                            onClick={() => {
                              setSelectedDayId(item.id);
                            }}
                          >
                            <span>{item.startTime}</span>
                            {' - '}
                            <span>{item.endTime}</span>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </Table>
                  {errorIds.length > 0 && <span className="text-danger small">Invalid value</span>}
                </Col>
              </Row>

              <Row className="mt-3">
                <Col md={4}>
                  <TextField
                    label="Start time"
                    type="time"
                    name="startTime"
                    value={selectedDay.startTime}
                    onValueChange={setTime(IS_START_TIME)}
                  />
                </Col>
                <Col md={4}>
                  <TextField
                    label="End time"
                    type="time"
                    name="endTime"
                    value={selectedDay.endTime}
                    onValueChange={setTime(!IS_START_TIME)}
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <Button variant="primary" block type="submit">
                    {isRequesting ? <Spinner animation="grow" size="sm" /> : 'Save'}
                  </Button>
                </Col>
              </Row>
            </Container>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default connect(
  state => ({
    rSchedule: get(state, 'schedule.schedule'),
  }),
  null,
)(App);
