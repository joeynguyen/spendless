import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AccountsListItem from './AccountsListItem.jsx';

const mockAccount = (type = 'creditcard') => {
  return {
    _id: '2016-02-24T07:01:24.948Z',
    _rev: '13-2bfa9371e269957dcbf2946c1cdd6cd5',
    company: 'MasterCard',
    name: 'Chase Freedom',
    type: type,
  };
};

function setup(account) {
  return shallow(<AccountsListItem account={account} />);
}

describe('AccountsListItem', () => {
  describe('renders correct elements: ', () => {
    it('default', () => {
      const wrapper = setup(mockAccount());
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('company info with Bank if type is "bank"', () => {
      const wrapper = setup(mockAccount('bank'));
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('has correct component state based on behavior -', () => {
    const wrapper = setup(mockAccount());

    it('default: settingsVisible is false and no EditAccountFormContainer', () => {
      expect(wrapper.state().settingsVisible).toBe(false);
      expect(wrapper.find('Connect(EditAccountFormContainer)').length).toBe(0);
    });

    it('when cog is clicked: settingsVisible is true and EditAccountFormContainer is rendered', () => {
      const cogIcon = wrapper.find('Icon');
      cogIcon.simulate('click');
      expect(wrapper.state().settingsVisible).toBe(true);
      expect(wrapper.find('Connect(EditAccountFormContainer)').length).toBe(1);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
