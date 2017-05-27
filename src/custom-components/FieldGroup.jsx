import React, { PropTypes } from 'react';
import { ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';

const FieldGroup = (props) => {
  const {
    placeholder,
    label,
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
      <FormGroup
        controlId={name}
        validationState={touched && invalid ? 'error' : null}
      >
        <ControlLabel>{label}</ControlLabel>
        <FormControl
          type="text"
          placeholder={placeholder}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          value={value}
        />
        {touched && error && <HelpBlock>{error}</HelpBlock>}
      </FormGroup>
  );
};
FieldGroup.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  // redux-form props
  name: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  invalid: PropTypes.bool.isRequired,
  touched: PropTypes.bool.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default FieldGroup;
