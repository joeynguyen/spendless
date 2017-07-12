import React from 'react';
import { InputGroup } from 'react-bootstrap';
import { Select } from 'antd';

const { Option } = Select;

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

export const renderAntdOptions = options => options
  .map((option, i) => (
    <Option
      key={i}
      value={option.value}
      disabled={option.disabled}
    >
      {option.label}
    </Option>
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
