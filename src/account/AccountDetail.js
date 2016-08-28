import React, { PropTypes } from 'react';
import FileUpload from './FileUpload.js';
import SaveButtonContainer from './SaveButtonContainer.js';
import DeleteTransactionsButton from './DeleteTransactionsButton.js';
import AddTransactionButton from './AddTransactionButton.js';
import styles from './Account.module.css';

const AccountDetails = ({ accounts, activeAccountId }) => {
  // show loading spinner until accounts are loaded
  if (accounts.length < 1) {
    return <div><p className="text-center"><i className="fa fa-cog fa-spin fa-3x"></i></p></div>;
  }

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

  const activeAccount = accounts.find(account => account._id === activeAccountId);
  const icon = ( activeAccount && activeAccount.type === 'creditcard' ) ? findFaIcon(activeAccount.company) : null;

  return (
    <div className="col-xs-12">
      <div className="header">
        <h3 className={styles.header}>{icon} {activeAccount.name} <br />
          <small>{activeAccount.company}</small></h3>
      </div>
      <FileUpload accountId={activeAccountId} />
      <SaveButtonContainer />
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
