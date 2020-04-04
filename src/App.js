import React, { useState, useEffect } from 'react';
import { get, has, isEqual } from 'lodash';
import { Form, Formik } from 'formik';
import { useDispatch, connect } from 'react-redux';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { SAVE_SCHEDULE_REQUEST } from '@/store/actions/schedule';
import { DAY_OF_WEEK, INIT_VALUES, TIME_FORMAT } from '@/constants/defaultValues';
import TextField from '@/components/TextField';
import TimePicker from '@/components/TimePicker';
import { scheduleFormSchema, validateSchedules } from '@/utils/validate';
import CircularProgress from '@material-ui/core/CircularProgress';
import usePrevious from '@/utils/usePrevious';

import useStyles from './styles';

const IS_START_TIME = true;

const App = ({ rSchedule }) => {
  const classes = useStyles();
  const isRequesting = get(rSchedule, 'requesting');
  const rSchedulePrev = usePrevious(rSchedule);

  const [openAlert, setOpenAlert] = useState(false);
  const [alert, setAlert] = useState({
    severity: 'success',
    message: '',
  });
  const [values, setValues] = useState(get(rSchedule, 'result.data.schedules', INIT_VALUES));

  const [errorIds, setErrorIds] = useState([]);

  const dispatch = useDispatch();

  const setTime = (dayId, isStartTime) => value => {
    const updateValues = values.map(item => {
      if (item.id === dayId) {
        return {
          ...item,
          [isStartTime ? 'startTime' : 'endTime']: value.format(TIME_FORMAT),
        };
      }

      return item;
    });
    const errorValueIds = validateSchedules(updateValues);

    setErrorIds(errorValueIds);
    setValues(updateValues);
  };

  useEffect(() => {
    handleAlert();
  });

  const handleAlert = () => {
    if (!isEqual(rSchedulePrev, rSchedule) && has(rSchedule, 'requesting') && !isRequesting) {
      const status = get(rSchedule, 'status');
      const isSuccess = status === 'success';
      setAlert({
        severity: status,
        message: isSuccess ? 'Schedule saved successfully!' : 'Unknown error occurred!',
      });
      setOpenAlert(true);
    }
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

  return (
    <Container className="App">
      <Formik
        initialValues={{ name: get(rSchedule, 'result.data.name') }}
        validationSchema={scheduleFormSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <Grid container justify="center" alignContent="center">
              <Grid item xs={12} md={10} lg={8}>
                <Box m={5}>
                  <Typography variant="h4" align="center" gutterBottom>
                    Work hours scheduler
                  </Typography>
                </Box>
                <Paper elevation={4} classes={{ root: classes.container }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Name
                  </Typography>
                  <TextField label="username" type="text" name="name" />
                  <Typography variant="subtitle1" gutterBottom>
                    Desired work hours
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell />
                          {DAY_OF_WEEK.map(item => (
                            <TableCell align="center" key={item.id}>
                              <Typography color={errorIds.includes(item.id) ? 'error' : 'inherit'}>
                                {item.label}
                              </Typography>
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow key="start">
                          <TableCell component="th" scope="row">
                            Start
                          </TableCell>
                          {values.map(item => (
                            <TableCell align="center" key={item.id}>
                              <TimePicker
                                time={item.startTime}
                                onChangeTime={setTime(item.id, IS_START_TIME)}
                                timeFormat={TIME_FORMAT}
                              />
                            </TableCell>
                          ))}
                        </TableRow>
                        <TableRow key="end">
                          <TableCell component="th" scope="row">
                            End
                          </TableCell>
                          {values.map(item => (
                            <TableCell align="center" key={item.id}>
                              <TimePicker
                                time={item.endTime}
                                onChangeTime={setTime(item.id, !IS_START_TIME)}
                                timeFormat={TIME_FORMAT}
                              />
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {errorIds.length > 0 && (
                    <Box m={1}>
                      <Typography
                        color="error"
                        variant="p"
                        classes={{
                          root: classes.errorMessage,
                        }}
                        m={1}
                      >
                        Invalid value! Note: end time should be greater than Start time
                      </Typography>
                    </Box>
                  )}
                  <Box mt={2}>
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                      {isRequesting ? <CircularProgress color="inherit" size={22} /> : 'Save'}
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={openAlert}
        autoHideDuration={4000}
        onClose={() => setOpenAlert(false)}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={() => setOpenAlert(false)}
          severity={alert.severity}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default connect(
  state => ({
    rSchedule: get(state, 'schedule.schedule'),
  }),
  null,
)(App);
