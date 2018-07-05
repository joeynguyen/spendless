import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AddAccountForm from './AddAccountForm.jsx';

const props = {
  doSubmit: () => null,
};

describe('AddAccountForm', () => {
  const wrapper = shallow(<AddAccountForm {...props} />);

  it('renders accountName field with empty value', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('renders 3 user input fields', () => {
    xit('renders accountName field with empty value', () => {
      expect(wrapper.find('input[name="accountName"]').length).toBe(1);
      // expect(wrapper.find('input[name="accountName"]').props().value).toBe('');
    });

    xit('renders accountType field with empty value', () => {
      expect(wrapper.find('select[name="accountType"]').length).toBe(1);
      // expect(wrapper.find('select[name="accountType"]').props().value).toBe('');
    });

    xit("doesn't render accountCompany field initially", () => {
      expect(wrapper.find('input[name="accountCompany"]').length).toBe(0);
    });
  });

  describe('on accountType change', () => {
    xit('accountCompany field should have an input element if accountType is bank', () => {
      // Input uses this.refs.input.getValue() which makes it hard to test
      // retest this after changing to FormControl which uses e.target.value
      // wrapper.find('select[name="accountType"]').simulate('change', {target: {value: 'bank'}});
      // expect(wrapper.find('select[name="accountType"]').prop('value')).toBe('bank');
      // expect(wrapper.find('input[name="accountCompany"]').length).toBe(1);
      // expect(wrapper.find('input[name="accountCompany"]').some('input')).toBe(true);
    });
  });
});
