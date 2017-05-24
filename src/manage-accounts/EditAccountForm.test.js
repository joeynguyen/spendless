import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme'; // need to use mount because we are rendering Bootstrap components too
import EditAccountForm from './EditAccountForm.jsx';

const props = {
  fields: {
    accountName: {
      name: 'accountName',
      initialValue: 'Santander Checking',
      valid: true,
      value: 'Santander Checking',
    },
    accountType: {
      name: 'accountType',
      initialValue: 'bank',
      valid: true,
      value: 'bank',
    },
    accountCompany: {
      name: 'accountCompany',
      initialValue: 'Santander Bank',
      valid: true,
      value: 'Santander Bank',
    },
  },
  pristine: true,
  toggleSettings: () => {},
  toggleConfirmDelete: () => {},
  confirmDeleteVisible: true,
  handleUpdateAccount: () => {}

};

describe('EditAccountForm', () => {
  describe('renders 3 user input fields', () => {
    const wrapper = mount(<EditAccountForm  {...props} />);

    it('renders accountName field with a value', () => {
      expect(wrapper.find('input[name="accountName"]').length).toBe(1);
      expect(wrapper.find('input[name="accountName"]').props().value).toBe('Santander Checking');
    });

    it('renders accountCompany field with a value', () => {
      expect(wrapper.find('input[name="accountCompany"]').length).toBe(1);
      expect(wrapper.find('input[name="accountCompany"]').props().value).toBe('Santander Bank');
    });

    it('renders accountType field with a value', () => {
      expect(wrapper.find('select[name="accountType"]').length).toBe(1);
      expect(wrapper.find('select[name="accountType"]').props().value).toBe('bank');
    });
  });

  describe('when pristine...', () => {
    const wrapper = mount(<EditAccountForm  {...props} pristine />);

    it('update button should be disabled', () => {
      expect(wrapper.find('button[name="update"]').props().disabled).toBe(true);
    });
  });

  describe('when not pristine...', () => {
    const wrapper = mount(<EditAccountForm  {...props} pristine={false} />);

    it('update button should be enabled', () => {
      expect(wrapper.find('button[name="update"]').props().disabled).toBe(false);
    });
  });

  describe('when confirmDeleteVisible is true...', () => {
    const wrapper = mount(<EditAccountForm  {...props} confirmDeleteVisible />);

    it('delete-toggle button should be disabled', () => {
      expect(wrapper.find('button[name="delete-toggle"]').props().disabled).toBe(true);
    });
  });

  describe('when confirmDeleteVisible is false...', () => {
    const wrapper = mount(<EditAccountForm  {...props} confirmDeleteVisible={false} />);

    it('delete-toggle button should be disabled', () => {
      expect(wrapper.find('button[name="delete-toggle"]').props().disabled).toBe(false);
    });
  });
});
