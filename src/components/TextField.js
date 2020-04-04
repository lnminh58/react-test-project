import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import { useField } from 'formik';

const TextField = ({ label, onValueChange, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="mb-3">
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>{label}</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          {...field}
          {...props}
          onChange={val => {
            if (onValueChange) onValueChange(val);
            field.onChange(val);
          }}
        />
      </InputGroup>
      {meta.touched && meta.error ? <span className="text-danger small">{meta.error}</span> : null}
    </div>
  );
};

export default TextField;
