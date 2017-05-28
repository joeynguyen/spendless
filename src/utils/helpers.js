import React from 'react';
import { InputGroup } from 'react-bootstrap';

export const renderOptions = options => options
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

export function wrapInputGroup(children, addonBefore, addonAfter) {
  return (
    <InputGroup>
      {addonBefore && <InputGroup.Addon>{addonBefore}</InputGroup.Addon>}
      {children}
      {addonAfter && <InputGroup.Addon>{addonAfter}</InputGroup.Addon>}
    </InputGroup>
  );
}
