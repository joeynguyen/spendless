import React, { PropTypes } from 'react';
import FileUpload from './FileUpload.js';
import SaveButton from './SaveButton.js';
import DeleteTransactionsButton from './DeleteTransactionsButton.js';
import AddTransactionButton from './AddTransactionButton.js';
import styles from './Account.module.css';

const AccountDetails = ({ accounts, activeAccountId }) => {
  // show loading spinner until accounts are loaded
  if (accounts.length < 1) {
    return <div><p className="text-center"><i className="fa fa-cog fa-spin fa-3x"></i></p></div>;
  }

  // handle instance where you delete the account that you're currently on
  const activeAccount = accounts.find(account => account._id === activeAccountId);
  if (!activeAccount) {
    return (
      <div>
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

  // show the appropriate credit card icon if the account type is credit card
  if (activeAccount.type === 'creditcard') {
    icon = findFaIcon(activeAccount.company);
  }

  return (
    <div className="col-xs-9">
      <div className="header">
        <h3 className={styles.header}>{icon} {activeAccount.name} <br />
          <small>{activeAccount.company}</small></h3>
      </div>
      <FileUpload accountId={activeAccountId} />
      <SaveButton />
      {' '}
      <DeleteTransactionsButton />
      <br />
      <AddTransactionButton />
    </div>
  );
};
AccountDetails.propTypes = {
  accounts: PropTypes.arrayOf(React.PropTypes.object),
  activeAccountId: PropTypes.string.isRequired,
};

export default AccountDetails;
