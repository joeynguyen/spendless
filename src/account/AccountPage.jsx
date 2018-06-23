import PropTypes from 'prop-types';
import React from 'react';
import { Spin, Col, Row } from 'antd';

import AccountDetails from './AccountDetails.jsx';
import TransactionsListContainer from './TransactionsListContainer.jsx';
import ManageTransactionContainer from './ManageTransactionContainer.jsx';
import UnsavedWarning from './UnsavedWarning.jsx';
import UploadedTransactionsContainer from './UploadedTransactionsContainer.jsx';

const AccountPage = ({
  accounts,
  activeAccountId,
  localHandleAlertLeave,
  localHandleAlertStay,
  manageTransactionVisible,
  unsavedWarningVisible,
  uploadedTransactionsExist,
}) => {
  // show loading spinner until accounts are loaded
  if (accounts.length < 1 && activeAccountId) {
    return (
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ height: '100%' }}
      >
        <Col span={2} style={{ textAlign: 'center' }}>
          <Spin size="large" />
        </Col>
      </Row>
    );
  }

  const manageTransactionModal = manageTransactionVisible ? (
    <ManageTransactionContainer />
  ) : null;
  const uploadedTransactionsModal = uploadedTransactionsExist ? (
    <UploadedTransactionsContainer />
  ) : null;

  return (
    <div>
      <AccountDetails
        accounts={accounts}
        activeAccountId={activeAccountId}
        uploadedTransactionsExist={uploadedTransactionsExist}
      />
      <TransactionsListContainer activeAccountId={activeAccountId} />
      <UnsavedWarning
        show={unsavedWarningVisible}
        localHandleAlertLeave={localHandleAlertLeave}
        localHandleAlertStay={localHandleAlertStay}
      />
      {manageTransactionModal}
      {uploadedTransactionsModal}
    </div>
  );
};

AccountPage.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeAccountId: PropTypes.string.isRequired,
  localHandleAlertLeave: PropTypes.func.isRequired,
  localHandleAlertStay: PropTypes.func.isRequired,
  manageTransactionVisible: PropTypes.bool.isRequired,
  unsavedWarningVisible: PropTypes.bool.isRequired,
  uploadedTransactionsExist: PropTypes.bool.isRequired,
};

export default AccountPage;
