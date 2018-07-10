import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AddAccount from './AddAccount.jsx';

describe('AddAccount', () => {
  describe('by default', () => {
    const component = shallow(<AddAccount />);

    it('Add Account button is shown and form section is hidden', () => {
      expect(component.state().addAccountVisible).toBe(false);

      expect(toJson(component)).toMatchSnapshot();
    });
  });

  describe('when Button is clicked', () => {
    const component = shallow(<AddAccount />);

    component.find('Button').simulate('click');

    it('form section is shown and button changes to Cancel', () => {
      expect(component.state().addAccountVisible).toBe(true);
      expect(component.find('Collapse').props().isOpened).toBe(true);
      expect(toJson(component)).toMatchSnapshot();
    });
  });
});
