import PropTypes from 'prop-types';
import React from 'react';
import { FormField, Select } from 'grommet';

const ConnectedTextInput = (props) => {
  const {
    helpText,
    id,
    label,
    options,
    placeholder,
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
        htmlFor={id}
        error={touched && invalid && error ? error : null}
        help={helpText}
      >
        <Select
          id={id}
          name={name}
          options={options}
          placeholder={placeholder}
          onBlur={onBlur}
          onChange={({ option }) => {
            // change redux value
            onChange(option);
          }}
          onFocus={onFocus}
          value={value}
        />
      </FormField>
  );
};
ConnectedTextInput.propTypes = {
  helpText: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  placeholder: PropTypes.string,
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

export default ConnectedTextInput;
