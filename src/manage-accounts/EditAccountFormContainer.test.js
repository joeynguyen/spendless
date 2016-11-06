import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import { EditAccountFormContainer } from './EditAccountFormContainer';

function setup() {
  const props = {
    account: {name: 'Test Bank', id: '2'},
    actions: {
      // saveAccount: () => { return Promise.resolve(); },
      // deleteAccount: expect.createSpy(),
      deleteAccount: () => { return Promise.resolve({id: '2'}); },
    },
    activeAccountId: '1',
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
    resetForm: () => {},
    toggleSettings: () => {},
  };

  return mount(<EditAccountFormContainer {...props} />);
}

describe('EditAccountFormContainer', () => {
  const wrapper = setup();

  it('confirmDeleteVisible state should change on cancel-delete click', (done) => {
    const cancelDeleteBtn = wrapper.find('button.cancel-delete');
    expect(wrapper.state().confirmDeleteVisible).toBe(false);

    cancelDeleteBtn.simulate('click');
    expect(wrapper.state().confirmDeleteVisible).toBe(true);
    done();
  });

  it('handleDeleteAccount function should be called on confirm-delete click/submit', (done) => {
    const confirmDeleteBtn = wrapper.find('button.confirm-delete');
    expect(confirmDeleteBtn.prop('type')).toBe('submit');

    const spy = expect.spyOn(wrapper.instance(), 'handleDeleteAccount');
    // component is rendered before you spy on it, and so the onSubmit is
    // already bound to the original so we need to .update() our wrapper
    // https://github.com/airbnb/enzyme/issues/365
    // http://airbnb.io/enzyme/docs/api/ReactWrapper/update.html
    wrapper.update();

    expect(spy.calls.length).toEqual(0);
    wrapper.find('form.delete-account-form').simulate('submit');
    expect(spy.calls.length).toEqual(1);

    done();
  });
});
