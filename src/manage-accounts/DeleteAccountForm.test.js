import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import DeleteAccountForm from './DeleteAccountForm';

function setup() {
  // Need to create spies because if we use expect.spyOn on actual functions, we get this
  // error when test is run: "TypeError: Cannot assign to read only property 'doSubmit'"
  const mockOnSubmit = expect.createSpy();
  const mockOnCancel = expect.createSpy();
  const props = {
    handleDeleteAccount: mockOnSubmit,
    toggleConfirmDelete: mockOnCancel
  };

  // spies only seem to work for mount, not shallow render
  return mount(<DeleteAccountForm  {...props} />);
}

describe('DeleteAccountForm', () => {
  const component = setup();
  const inputEl = component.find('input');
  const confirmDeleteBtn = component.find('button.confirm-delete');
  const cancelDeleteBtn = component.find('button.cancel-delete');

  it('renders an input field', () => {
    expect(inputEl.length).toBe(1);
  });

  it('renders a cancel button', () => {
    expect(cancelDeleteBtn.length).toBe(1);
  });

  it('renders a confirm button', () => {
    expect(confirmDeleteBtn.length).toBe(1);
  });

  it('confirm button should be disabled by default', () => {
    expect(confirmDeleteBtn.props().disabled).toBe(true);
  });

  it('confirm button should stay disabled if input box has text not equal to "DELETE"', (done) => {
    expect(confirmDeleteBtn.prop('disabled')).toBe(true);
    inputEl.simulate('change', {target: {value: 'My new value'}});

    expect(confirmDeleteBtn.prop('disabled')).toBe(true);
    done();
  });

  it('confirm button should not be disabled if input box has text: "DELETE"', (done) => {
    expect(confirmDeleteBtn.prop('disabled')).toBe(true);
    inputEl.simulate('change', {target: {value: 'DELETE'}});

    expect(confirmDeleteBtn.prop('disabled')).toBe(false);
    done();
  });

  it('it deletes on submit', (done) => {
    const spy = expect.spyOn(component.props(), 'handleDeleteAccount');

    // We can't test clicking on submit button to perform 'handleDeleteAccount' until
    // this bug is resolved - https://github.com/airbnb/enzyme/issues/308
    expect(spy.calls.length).toEqual(0);
    component.find('form').simulate('submit');
    expect(spy.calls.length).toEqual(1);

    spy.restore();
    done();
  });

  it('it cancels on click', (done) => {
    const spy = expect.spyOn(component.props(), 'toggleConfirmDelete');

    expect(spy.calls.length).toEqual(0);
    cancelDeleteBtn.simulate('click');
    expect(spy.calls.length).toEqual(1);

    spy.restore();
    done();
  });
});
