import React, { PropTypes } from 'react';
import FileUpload from './FileUpload.js';
import TransactionsListContainer from './TransactionsListContainer.js';
import SaveButton from './SaveButton.js';
import DeleteTransactionsButton from './DeleteTransactionsButton.js';
import AddTransactionButton from './AddTransactionButton.js';
import UnsavedWarning from './UnsavedWarning.js';
import styles from './Account.module.css';

const AccountDetails = ({ accounts, params, unsavedWarningVisible, handleAlertStay, handleAlertLeave }) => {
  if (accounts.length < 1) {
    return <div><p className="text-center"><i className="fa fa-cog fa-spin fa-3x"></i></p></div>;
  }
  const activeAccount = accounts.find(account => account._id === params.id);
  if (!activeAccount) {
    return (
      <div className="col-xs-9">
        <div className="header">
          <h3 className={styles.header}>Error: Account Doesn't Exist</h3>
        </div>
        <p>Uh oh. Looks like the account you're looking for doesn't exist. It may have been deleted. Please click on one of the ones in the left sidebar to get details on a different account.</p>
      </div>
    );
  }
  let icon;
  const findFaIcon = function(cc) {
    let iconSuffix;
    switch (cc) {
      case 'American Express':
        iconSuffix = 'cc-amex';
        break;
      case 'Other':
        iconSuffix = 'credit-card-alt';
        break;
      default:
        iconSuffix = 'cc-' + cc.toLowerCase().replace(/ /, '-');
    }
    return <i className={'fa fa-lg fa-fw fa-' + iconSuffix}></i>;
  };

  if (activeAccount.type === 'creditcard') {
    icon = findFaIcon(activeAccount.company);
  }

  return (
    <div className="col-xs-9">
      <div className="header">
        <h3 className={styles.header}>{icon} {activeAccount.name} <br />
          <small>{activeAccount.company}</small></h3>
      </div>
      <FileUpload accountId={params.id} />
      <SaveButton />
      {' '}
      <DeleteTransactionsButton />
      <br />
      <AddTransactionButton />
      <TransactionsListContainer accountId={params.id} />
      <UnsavedWarning show={unsavedWarningVisible} localHandleAlertStay={handleAlertStay} localHandleAlertLeave={handleAlertLeave} />
    </div>
  );
};
AccountDetails.propTypes = {
  accounts: PropTypes.arrayOf(React.PropTypes.object),
  params: PropTypes.object.isRequired,
  unsavedWarningVisible: PropTypes.bool.isRequired,
  handleAlertStay: PropTypes.func.isRequired,
  handleAlertLeave: PropTypes.func.isRequired,
};

export default AccountDetails;
