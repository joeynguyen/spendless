import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import DeleteAccountForm from './DeleteAccountForm.jsx';

function setup() {
  const props = {
    handleDeleteAccount: () => {},
    toggleConfirmDelete: () => {}
  };

  // spies only seem to work for mount, not shallow render
  return shallow(<DeleteAccountForm  {...props} />);
}

describe('DeleteAccountForm', () => {
  const component = setup();
  const inputEl = component.find('Input');

  it('renders an input field', () => {
    expect(inputEl.length).toBe(1);
  });

  it('renders a cancel button', () => {
    expect(component.find('Button.cancel-delete').length).toBe(1);
  });

  it('renders a confirm button', () => {
    expect(component.find('Button.confirm-delete').length).toBe(1);
  });

  it('confirm button should be disabled by default', () => {
    expect(component.find('Button.confirm-delete').prop('disabled')).toBe(true);
  });

  it('confirm button should remain disabled if input box has text not equal to "DELETE"', (done) => {
    expect(component.find('Button.confirm-delete').prop('disabled')).toBe(true);
    inputEl.simulate('change', {target: {value: 'My new value'}});

    expect(component.find('Button.confirm-delete').prop('disabled')).toBe(true);
    done();
  });

  it('confirm button should be enabled if input box has text: "DELETE"', (done) => {
    expect(component.find('Button.confirm-delete').prop('disabled')).toBe(true);
    inputEl.simulate('change', {target: {value: 'DELETE'}});

    expect(component.find('Button.confirm-delete').prop('disabled')).toBe(false);
    done();
  });
});
