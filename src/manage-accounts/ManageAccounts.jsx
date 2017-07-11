import PropTypes from 'prop-types';
import React from 'react';
import { Col, Row, Button, Modal } from 'antd';
import AddAccount from './AddAccount.jsx';
import AccountsList from './AccountsList.jsx';

const ManageAccounts = ({ accounts, actions, manageAccountsVisible }) => {
  const ccAccounts = accounts.filter(account => account.type === 'creditcard');
  const bankAccounts = accounts.filter(account => account.type === 'bank');
  const modalFooter = [(
    <Button
      key={0}
      size="large"
      onClick={actions.toggleManageAccounts}
    >Close</Button>
  )];
  return (
    <Modal
      closable
      maskClosable={false}
      visible={manageAccountsVisible}
      onCancel={actions.toggleManageAccounts}
      title="Manage Accounts"
      footer={modalFooter}
    >
      <Row>
        <Col span={16}>
          <AddAccount />
          <AccountsList accounts={accounts} />
        </Col>

        <Col span={8} style={{padding: '0 12px' }}>
          <ul>
            <li>{bankAccounts.length} Bank accounts</li>
            <li>{ccAccounts.length} Credit card accounts</li>
          </ul>
        </Col>
      </Row>
    </Modal>
  );
};
ManageAccounts.propTypes = {
  accounts: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  manageAccountsVisible: PropTypes.bool.isRequired,
};

export default ManageAccounts;
