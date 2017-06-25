import PropTypes from 'prop-types';
import React from 'react';
import { FormField, DateTime } from 'grommet';
import moment from 'moment';

const ConnectedDateTime = (props) => {
  const {
    format,
    helpText,
    label,
    step,
    // redux-form props
    name,
    error,
    invalid,
    touched,
    onBlur,
    onChange,
    onFocus,
    value,
 } = props;
  const dateFieldValue = value === 'Invalid date' ? null : value;

  return (
      <FormField
        label={label}
        htmlFor={name}
        error={touched && invalid && error ? error : null}
        help={helpText}
      >
        <DateTime
          id={name}
          name={name}
          step={step}
          format={format}
          onBlur={onBlur}
          onChange={val => {
            // change redux value
            let momentDate = null;
            // test if value entered matches specified format
            if (moment(val, format, true).isValid()) {
              momentDate = moment(val, format).format('YYYY-MM-DD');
            }
            onChange(momentDate);
          }}
          onFocus={onFocus}
          value={dateFieldValue}
        />
      </FormField>
  );
};
ConnectedDateTime.propTypes = {
  format: PropTypes.string,
  helpText: PropTypes.string,
  label: PropTypes.string,
  step: PropTypes.number,
  // redux-form props
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  invalid: PropTypes.bool.isRequired,
  touched: PropTypes.bool.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default ConnectedDateTime;
