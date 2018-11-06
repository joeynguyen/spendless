import PropTypes from 'prop-types';
import React, {lazy, Suspense} from 'react';
import { Spin, Col, Row } from 'antd';

import AccountDetails from './AccountDetails.jsx';
import TransactionsListContainer from './TransactionsListContainer.jsx';
import UnsavedWarning from './UnsavedWarning.jsx';

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

  let uploadedTransactionsModal;
  if (uploadedTransactionsExist) {
    const UploadedTransactionsContainer = lazy(() => import('./UploadedTransactionsContainer'));
    uploadedTransactionsModal = (
      <Suspense fallback={''}>
        <UploadedTransactionsContainer />
      </Suspense>
    )
  }

  let manageTransactionModal;
  if (manageTransactionVisible) {
    const ManageTransactionContainer = lazy(() => import('./ManageTransactionContainer'));
    manageTransactionModal = (
      <Suspense fallback={''}>
        <ManageTransactionContainer />
      </Suspense>
    )
  }

  return (
    <>
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
    </>
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
