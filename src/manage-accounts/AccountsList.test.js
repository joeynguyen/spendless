import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import AccountsList from './AccountsList';
import AccountsListItem from './AccountsListItem.js';

function setup() {
  const props = {
    accounts: [
      {
        _id: '2016-04-24T20:47:37.374Z',
        _rev: '2-8c6e36eddfb9990c199546ad267cfd61',
        company: 'Santander Banks',
        name: 'Santander Checkings',
        type: 'bank'
      },
      {
        _id: '2016-02-24T07:01:24.948Z',
        _rev: '13-2bfa9371e269957dcbf2946c1cdd6cd5',
        company: 'MasterCard',
        name: 'Chase Freedom',
        type: 'creditcard'
      },
      {
        _id: '2016-03-24T08:10:58.232Z',
        _rev: '14-57184e4f5b50323eeeb6a919faf1af48',
        company: 'Bank of America',
        name: 'BofA Checkings',
        type: 'bank'
      }
    ]
  };

  return shallow(<AccountsList accounts={props.accounts} />);
}

describe('AccountsList', () => {
  it('renders an AccountsListItem for each account', () => {
    const wrapper = setup();
    expect(wrapper.find(AccountsListItem).length).toBe(3);
  });
});

