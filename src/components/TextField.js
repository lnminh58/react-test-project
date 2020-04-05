import React from 'react';
import { useField } from 'formik';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

const TextField = ({ label, onValueChange, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <FormControl fullWidth margin="normal" error={!!(meta.touched && meta.error)}>
        <InputLabel>{label}</InputLabel>
        <Input fullWidth {...field} {...props} />
        <FormHelperText>{meta.error}</FormHelperText>
      </FormControl>
    </>
  );
};

export default TextField;
