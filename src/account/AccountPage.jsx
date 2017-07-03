import PropTypes from 'prop-types';
import React from 'react';
import AccountDetailsContainer from './AccountDetailsContainer.jsx';
import TransactionsListContainer from './TransactionsListContainer.jsx';
import ManageTransactionContainer from './ManageTransactionContainer.jsx';
import UnsavedWarning from './UnsavedWarning.jsx';

const AccountPage = ({ manageTransactionVisible, unsavedWarningVisible, localHandleAlertStay, localHandleAlertLeave }) => {
  const manageTransactionContainer = manageTransactionVisible ? <ManageTransactionContainer /> : null;

  return (
    <div>
      <AccountDetailsContainer />
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
  manageTransactionVisible: PropTypes.bool.isRequired,
  unsavedWarningVisible: PropTypes.bool.isRequired,
  localHandleAlertStay: PropTypes.func.isRequired,
  localHandleAlertLeave: PropTypes.func.isRequired,
};

export default AccountPage;
