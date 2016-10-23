import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import AccountsListItem from './AccountsListItem';

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

    it('is wrapped in a Well component', () => {
      expect(wrapper.find('Well').length).toBe(1);
    });
    it('renders the account name', () => {
      expect(wrapper.find('.account-name').text()).toBe('Chase Freedom');
    });
    it('renders a cog icon element', () => {
      expect(wrapper.find('.fa-cog').length).toBe(1);
    });
    it('renders the company name with type as Credit Card by default', () => {
      expect(wrapper.find('.company-info').text()).toBe('Credit Card - MasterCard');
    });
  });
  describe('renders correct elements based on specific behaviors', () => {
    it('renders the company name with type as Bank if type is "bank"', () => {
      const wrapper = setup(mockAccount('bank'));
      expect(wrapper.find('.company-info').text()).toBe('Bank - MasterCard');
    });
  });
});

