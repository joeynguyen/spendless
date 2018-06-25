import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import ManageAccounts from './ManageAccounts.jsx';

const myProps = {
  accounts: [
    {
      _id: '2016-04-24T20:47:37.374Z',
      _rev: '2-8c6e36eddfb9990c199546ad267cfd61',
      company: 'Santander Banks',
      name: 'Santander Checkings',
      type: 'bank',
    },
    {
      _id: '2016-02-24T07:01:24.948Z',
      _rev: '13-2bfa9371e269957dcbf2946c1cdd6cd5',
      company: 'MasterCard',
      name: 'Chase Freedom',
      type: 'creditcard',
    },
    {
      _id: '2016-03-24T08:10:58.232Z',
      _rev: '14-57184e4f5b50323eeeb6a919faf1af48',
      company: 'Bank of America',
      name: 'BofA Checkings',
      type: 'bank',
    },
  ],
  actions: {},
  manageAccountsVisible: true,
};

function setup(props) {
  return shallow(<ManageAccounts {...props} />);
}

describe('ManageAccounts', () => {
  const component = setup(myProps);

  it('has an AddAccount component', done => {
    expect(component.find('AddAccount').length).toBe(1);
    done();
  });

  it('has a AccountsList component', done => {
    expect(component.find('AccountsList').length).toBe(1);
    done();
  });

  it('AccountsList has an accounts prop with list of accounts passed to it', done => {
    expect(component.find('AccountsList').props().accounts).toExist();
    expect(component.find('AccountsList').props().accounts).toBe(
      myProps.accounts
    );
    done();
  });

  it('has a close modal button', done => {
    expect(component.find('Button[name="close-manage-accounts"]').length).toBe(
      1
    );
    done();
  });
});
