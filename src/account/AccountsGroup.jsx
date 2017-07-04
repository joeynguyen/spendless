import PropTypes from 'prop-types';
import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

const AccountsGroup = ({ accounts, activeAccountId }) => {
  if (!accounts) {
    return <div>Loading...</div>;
  }
  const ccAccounts = accounts.filter(account => account.type === 'creditcard');
  const bankAccounts = accounts.filter(account => account.type === 'bank');
  // TODO:
  // disable clicking on currently displayed account in sidebar so that user
  // can't change routes to the same route which resets uploadedTransactions state
  return (
    <Menu mode="inline" defaultOpenKeys={['sub1', 'sub2']}>
      <SubMenu key="sub1" title={<span><Icon type="bank" /><span>Banks</span></span>}>
          {
            bankAccounts.map((account) => (
              <Menu.Item key={account._id}>
                <Link to={`/account/${account._id}`}>{account.name}</Link>
              </Menu.Item>
            ))
          }
      </SubMenu>
      <SubMenu key="sub2" title={<span><Icon type="credit-card" /><span>Credit Cards</span></span>}>
          {
            ccAccounts.map((account) => (
              <Menu.Item key={account._id}>
                <Link to={`/account/${account._id}`}>{account.name}</Link>
              </Menu.Item>
            ))
          }
      </SubMenu>
    </Menu>
  );
};
AccountsGroup.propTypes = {
  accounts: PropTypes.array.isRequired,
  activeAccountId: PropTypes.string,
};

export default AccountsGroup;
