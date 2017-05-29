import PropTypes from 'prop-types';
import React from 'react';
import { ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';

import { renderOptions, wrapInputGroup } from '../utils/helpers.js';

const FieldGroup = (props) => {
  const {
    componentClass,
    addonBefore,
    addonAfter,
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

  let formControl = (
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
  );
  if (addonBefore || addonAfter) {
    formControl = wrapInputGroup(formControl, addonBefore, addonAfter);
  }
  return (
      <FormGroup
        controlId={name}
        validationState={touched && invalid ? 'error' : null}
      >
        {label && <ControlLabel>{label}</ControlLabel>}
        {formControl}
        {touched && error && <HelpBlock>{error}</HelpBlock>}
      </FormGroup>
  );
};
FieldGroup.propTypes = {
  componentClass: PropTypes.string,
  addonAfter: PropTypes.string,
  addonBefore: PropTypes.string,
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
