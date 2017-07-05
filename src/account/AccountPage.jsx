import PropTypes from 'prop-types';
import React from 'react';
import { Spin, Col, Row } from 'antd';

import AccountDetails from './AccountDetails.jsx';
import TransactionsListContainer from './TransactionsListContainer.jsx';
import ManageTransactionContainer from './ManageTransactionContainer.jsx';
import UnsavedWarning from './UnsavedWarning.jsx';

const AccountPage = ({
  accounts,
  activeAccountId,
  manageTransactionVisible,
  unsavedWarningVisible,
  localHandleAlertStay,
  localHandleAlertLeave
}) => {
  // show loading spinner until accounts are loaded
  if (accounts.length < 1 && activeAccountId) {
    return (
      <Row type="flex" justify="center" align="middle" style={{ height: '100%' }}>
        <Col span={2} style={{ textAlign: 'center' }}>
          <Spin size="large" />
        </Col>
      </Row>
    );
  }

  const manageTransactionContainer = manageTransactionVisible ? <ManageTransactionContainer /> : null;

  return (
    <div>
      <AccountDetails
        accounts={accounts}
        activeAccountId={activeAccountId}
      />
      <TransactionsListContainer />
      <UnsavedWarning
        show={unsavedWarningVisible}
        localHandleAlertStay={localHandleAlertStay}
        localHandleAlertLeave={localHandleAlertLeave}
      />
      { manageTransactionContainer }
    </div>
  );
};

AccountPage.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeAccountId: PropTypes.string.isRequired,
  manageTransactionVisible: PropTypes.bool.isRequired,
  unsavedWarningVisible: PropTypes.bool.isRequired,
  localHandleAlertStay: PropTypes.func.isRequired,
  localHandleAlertLeave: PropTypes.func.isRequired,
};

export default AccountPage;
