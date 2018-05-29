import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import { EditAccountFormContainer } from './EditAccountFormContainer.jsx';

function setup() {
  const props = {
    account: { name: 'Test Bank', id: '2' },
    actions: {
      saveAccount: () => {
        return Promise.resolve({ name: 'Test account' });
      },
      deleteAccount: () => {
        return Promise.resolve({ id: '2' });
      },
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
    toggleSettings: expect.createSpy(),
  };

  return mount(<EditAccountFormContainer {...props} />);
}

describe('EditAccountFormContainer', () => {
  const wrapper = setup();

  // change this to check for existence of class name instead of state
  // once .parent() is fixed
  // https://github.com/airbnb/enzyme/issues/603
  it('confirmDeleteVisible state should change on delete-toggle click', done => {
    const deleteBtn = wrapper.find('button[name="delete-toggle"]');
    expect(wrapper.state().confirmDeleteVisible).toBe(false);

    deleteBtn.simulate('click');
    expect(wrapper.state().confirmDeleteVisible).toBe(true);

    done();
  });

  it('confirmDeleteVisible state should change on cancel-delete click', done => {
    const cancelDeleteBtn = wrapper.find('button.cancel-delete');
    expect(wrapper.state().confirmDeleteVisible).toBe(true);

    cancelDeleteBtn.simulate('click');
    expect(wrapper.state().confirmDeleteVisible).toBe(false);

    done();
  });

  it('saveAccount function should be called on update button click/submit', done => {
    const updateAccountBtn = wrapper.find('button[name="update"]');
    expect(updateAccountBtn.prop('type')).toBe('submit');

    const spy = expect
      .spyOn(wrapper.props().actions, 'saveAccount')
      .andCallThrough();

    expect(spy.calls.length).toEqual(0);
    wrapper.find('#update-account-form').simulate('submit');
    expect(spy.calls.length).toEqual(1);

    done();
  });

  it('deleteAccount function should be called on confirm-delete click/submit', done => {
    const confirmDeleteBtn = wrapper.find('button.confirm-delete');
    expect(confirmDeleteBtn.prop('type')).toBe('submit');

    const spy = expect
      .spyOn(wrapper.props().actions, 'deleteAccount')
      .andCallThrough();

    expect(spy.calls.length).toEqual(0);
    wrapper.find('#delete-account-form').simulate('submit');
    expect(spy.calls.length).toEqual(1);

    done();
  });

  it('toggleSettings function should be called on cancel button click', done => {
    const spy = expect.spyOn(wrapper.props(), 'toggleSettings');

    // see previous test regarding .update()
    wrapper.update();

    expect(spy.calls.length).toEqual(0);
    wrapper.find('button[name="cancel"]').simulate('click');
    expect(spy.calls.length).toEqual(1);

    done();
  });
});
