import PropTypes from 'prop-types';
import React from 'react';
import { Row, Col, Menu, Icon, Spin } from 'antd';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

function renderSubMenu(activeAccountId) {
  return (accountType, i) => {
    return (
      <SubMenu
        key={`sub${i}`}
        title={
          <span>
            <Icon type={accountType.icon} />
            <span>{accountType.title}</span>
          </span>
        }
      >
        {accountType.accounts.map(account => {
          // remove link tag for active account so that user can't change routes
          // to the same route which resets uploadedTransactions state
          const isCurrentAccount = account._id === activeAccountId;
          const accountLabel = isCurrentAccount ? (
            account.name
          ) : (
            <Link to={`/account/${account._id}`}>{account.name}</Link>
          );
          return <Menu.Item key={account._id}>{accountLabel}</Menu.Item>;
        })}
      </SubMenu>
    );
  };
}

const AccountsGroup = ({ accounts, activeAccountId }) => {
  if (!accounts) {
    return (
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ height: '90%' }}
      >
        <Col span={12} style={{ textAlign: 'center' }}>
          <Spin size="large" />
        </Col>
      </Row>
    );
  }
  const ccAccounts = accounts.filter(account => account.type === 'creditcard');
  const bankAccounts = accounts.filter(account => account.type === 'bank');
  const accountTypes = [
    {
      title: 'Banks',
      icon: 'bank',
      accounts: bankAccounts,
      subMenuKey: 'sub0',
    },
    {
      title: 'Credit Cards',
      icon: 'credit-card',
      accounts: ccAccounts,
      subMenuKey: 'sub1',
    },
  ];
  const allSubMenus = accountTypes.reduce((a, b) => a.concat(b.subMenuKey), []);
  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[activeAccountId]}
      defaultOpenKeys={allSubMenus}
    >
      {accountTypes.map(renderSubMenu(activeAccountId))}
    </Menu>
  );
};
AccountsGroup.propTypes = {
  accounts: PropTypes.array.isRequired,
  activeAccountId: PropTypes.string,
};

export default AccountsGroup;
