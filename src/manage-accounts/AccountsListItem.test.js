import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import AccountsListItem from './AccountsListItem';
import EditAccountFormContainer from './EditAccountFormContainer';


const mockAccount = (type = 'creditcard') => {
  return {
    _id: '2016-02-24T07:01:24.948Z',
    _rev: '13-2bfa9371e269957dcbf2946c1cdd6cd5',
    company: 'MasterCard',
    name: 'Chase Freedom',
    type: type
  };
};

function setup(account) {
  return shallow(<AccountsListItem account={account} />);
}

describe('AccountsListItem', () => {
  describe('renders correct elements by default', () => {
    const wrapper = setup(mockAccount());

    it('renders the account name', () => {
      expect(wrapper.find('.account-name').text()).toBe('Chase Freedom');
    });
    it('renders a cog icon element', () => {
      expect(wrapper.find('.fa-cog').length).toBe(1);
    });
    it('renders the company info with type as Credit Card by default', () => {
      expect(wrapper.find('.company-info').text()).toBe('Credit Card - MasterCard');
    });
  });

  describe('renders correct elements based on specific behaviors', () => {
    it('renders the company info with Bank if type is "bank"', () => {
      const wrapper = setup(mockAccount('bank'));
      expect(wrapper.find('.company-info').text()).toBe('Bank - MasterCard');
    });
  });

  describe('it has correct component state based on behavior', () => {
    const wrapper = setup(mockAccount());
    it('has settingsVisible as false by default', () => {
      expect(wrapper.state().settingsVisible).toBe(false);
    });
    it('doesn\'t show EditAccountFormContainer by default', () => {
      expect(wrapper.find(EditAccountFormContainer).length).toBe(0);
    });
    it('when cog is clicked, settingsVisible state is true and EditAccountFormContainer is rendered', () => {
      const cogIcon = wrapper.find('.fa-cog');
      cogIcon.simulate('click');
      expect(wrapper.state().settingsVisible).toBe(true);
      expect(wrapper.find(EditAccountFormContainer).length).toBe(1);
    });
  });
});

