import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import { EditAccountFormContainer } from './EditAccountFormContainer';

function setup() {
  const props = {
    account: {},
    actions: {
      // saveAccount: () => { return Promise.resolve(); },
      // deleteAccount: expect.createSpy(),
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

  // it('deleteAccount action should be called on confirm-delete click/submit', (done) => {
    // const confirmDeleteBtn = wrapper.find('button.confirm-delete');
    // expect(confirmDeleteBtn.prop('type')).toBe('submit');
  //   done();
  // });
});
