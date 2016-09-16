import React, { PropTypes } from 'react';
import AccountDetailsContainer from './AccountDetailsContainer.js';
import TransactionsListContainer from './TransactionsListContainer.js';
import ManageTransactionContainer from './ManageTransactionContainer.js';
import AddTransactionContainer from './AddTransactionContainer.js';
import UnsavedWarning from './UnsavedWarning.js';

const AccountPage = ({ addTransactionVisible, manageTransactionVisible, unsavedWarningVisible, localHandleAlertStay, localHandleAlertLeave }) => {
  const manageTransactionContainer = manageTransactionVisible ? <ManageTransactionContainer /> : null;
  const addTransactionContainer = addTransactionVisible ? <AddTransactionContainer /> : null;

  return (
    <div className="col-xs-9">
      <AccountDetailsContainer />
      <TransactionsListContainer />
      <UnsavedWarning
        show={unsavedWarningVisible}
        localHandleAlertStay={localHandleAlertStay}
        localHandleAlertLeave={localHandleAlertLeave}
      />
      { addTransactionContainer }
      { manageTransactionContainer }
    </div>
  );
};

AccountPage.propTypes = {
  addTransactionVisible: PropTypes.bool.isRequired,
  manageTransactionVisible: PropTypes.bool.isRequired,
  unsavedWarningVisible: PropTypes.bool.isRequired,
  localHandleAlertStay: PropTypes.func.isRequired,
  localHandleAlertLeave: PropTypes.func.isRequired,
};

export default AccountPage;
