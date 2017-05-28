import React, { PropTypes } from 'react';
import { ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';

const renderOptions = options => options
  .map((option, i) => (
    <option
      key={i}
      value={option.value}
      disabled={option.disabled}
    >
      {option.label}
    </option>
  )
);

const FieldGroup = (props) => {
  const {
    componentClass,
    label,
    options,
    placeholder,
    type,
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
          type={type}
          componentClass={componentClass}
          placeholder={placeholder}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          value={value}
        >
          {componentClass && componentClass === 'select' && options && renderOptions(options)}
        </FormControl>
        {touched && error && <HelpBlock>{error}</HelpBlock>}
      </FormGroup>
  );
};
FieldGroup.propTypes = {
  componentClass: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  type: PropTypes.string,
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

export default FieldGroup;
