import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import { AddAccountFormContainer } from './AddAccountFormContainer.jsx';

function setup() {
  const props = {
    actions: {
      saveAccount: () => {
        return Promise.resolve({ name: 'Test account' });
      },
    },
    fields: {
      accountCompany: {
        initialValue: 'Santander Bank',
        name: 'accountCompany',
        valid: true,
        value: 'Santander Bank',
      },
      accountName: {
        initialValue: 'Santander Checking',
        name: 'accountName',
        valid: true,
        value: 'Santander Checking',
      },
      accountType: {
        initialValue: 'bank',
        name: 'accountType',
        valid: true,
        value: 'bank',
      },
    },
    handleSubmit: callback => callback,
    resetForm: () => null,
    submitting: false,
    visible: false,
  };

  return mount(<AddAccountFormContainer {...props} />);
}

describe('AddAccountFormContainer', () => {
  const wrapper = setup();

  it('saveAccount function should be called on update button click/submit', done => {
    const addAccountBtn = wrapper.find('button[name="add-account"]');
    expect(addAccountBtn.prop('type')).toBe('submit');

    const spy = expect
      .spyOn(wrapper.props().actions, 'saveAccount')
      .andCallThrough();

    expect(spy.calls.length).toEqual(0);
    wrapper.find('#add-account-form').simulate('submit');
    expect(spy.calls.length).toEqual(1);

    done();
  });
});
