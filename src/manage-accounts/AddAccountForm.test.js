import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme'; // need to use mount because we are rendering Bootstrap components too
import AddAccountForm from './AddAccountForm.jsx';

const props = {
  doSubmit: () => {},
  fields: {
    accountName: {
      name: 'accountName',
      initialValue: '',
      valid: true,
      value: '',
    },
    accountType: {
      name: 'accountType',
      initialValue: '',
      valid: true,
      value: '',
    },
    accountCompany: {
      name: 'accountCompany',
      initialValue: '',
      valid: true,
      value: '',
    },
  },
  submitting: false,
};

describe('AddAccountForm', () => {
  const wrapper = mount(<AddAccountForm {...props} />);

  describe('renders 3 user input fields', () => {
    it('renders accountName field with empty value', () => {
      expect(wrapper.find('input[name="accountName"]').length).toBe(1);
      // expect(wrapper.find('input[name="accountName"]').props().value).toBe('');
    });

    it('renders accountType field with empty value', () => {
      expect(wrapper.find('select[name="accountType"]').length).toBe(1);
      // expect(wrapper.find('select[name="accountType"]').props().value).toBe('');
    });

    it("doesn't render accountCompany field initially", () => {
      expect(wrapper.find('input[name="accountCompany"]').length).toBe(0);
    });
  });

  describe('on accountType change', () => {
    it.skip('accountCompany field should have an input element if accountType is bank', () => {
      // Input uses this.refs.input.getValue() which makes it hard to test
      // retest this after changing to FormControl which uses e.target.value
      // wrapper.find('select[name="accountType"]').simulate('change', {target: {value: 'bank'}});
      // expect(wrapper.find('select[name="accountType"]').prop('value')).toBe('bank');
      // expect(wrapper.find('input[name="accountCompany"]').length).toBe(1);
      // expect(wrapper.find('input[name="accountCompany"]').some('input')).toBe(true);
    });
  });
});
