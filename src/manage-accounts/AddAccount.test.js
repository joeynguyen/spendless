import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import AddAccount from './AddAccount';
import AddAccountFormContainer from './AddAccountFormContainer.js';

function setup() {
  return shallow(<AddAccount />);
}

describe('AddAccount', () => {
  describe('by default', () => {
    const component = setup();

    it('has a Button', (done) => {
      expect(component.find('Button').length).toBe(1);
      done();
    });

    it('has a Panel', (done) => {
      expect(component.find('Panel').length).toBe(1);
      done();
    });

    it('has an AddAccountFormContainer', (done) => {
      expect(component.find(AddAccountFormContainer).length).toBe(1);
      done();
    });

    it('addAccountVisible state is false by default', (done) => {
      expect(component.state().addAccountVisible).toBe(false);
      done();
    });
  });

  describe('when Button is clicked', () => {
    const component = setup();

    expect(component.state().addAccountVisible).toBe(false);
    expect(component.find('Panel').props().expanded).toBe(false);
    component.find('Button').simulate('click');

    it('addAccountVisible state to be true when Button is clicked', (done) => {
      expect(component.state().addAccountVisible).toBe(true);
      done();
    });

    it('form section is hidden by default but shows when Button is clicked', (done) => {
      expect(component.find('Panel').props().expanded).toBe(true);
      done();
    });
  });
});
