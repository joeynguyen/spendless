import React from 'react';
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
