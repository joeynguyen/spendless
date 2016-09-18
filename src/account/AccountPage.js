import React, { PropTypes } from 'react';
import AccountDetailsContainer from './AccountDetailsContainer.js';
import TransactionsListContainer from './TransactionsListContainer.js';
import ManageTransactionContainer from './ManageTransactionContainer.js';
import UnsavedWarning from './UnsavedWarning.js';

const AccountPage = ({ manageTransactionVisible, unsavedWarningVisible, localHandleAlertStay, localHandleAlertLeave }) => {
  const manageTransactionContainer = manageTransactionVisible ? <ManageTransactionContainer /> : null;

  return (
    <div className="col-xs-9">
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
