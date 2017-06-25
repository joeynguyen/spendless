import PropTypes from 'prop-types';
import React from 'react';
import { FormField } from 'grommet';

const ConnectedTextArea = (props) => {
  const {
    helpText,
    label,
    placeholder,
    rows,
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

  return (
      <FormField
        label={label}
        htmlFor={name}
        error={touched && invalid && error ? error : null}
        help={helpText}
      >
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          rows={rows}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          value={value}
        />
      </FormField>
  );
};
ConnectedTextArea.propTypes = {
  helpText: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
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

export default ConnectedTextArea;
