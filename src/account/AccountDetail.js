import React, { PropTypes } from 'react';
import FileUpload from './FileUpload.js';
import SaveButtonContainer from './SaveButtonContainer.js';
import DeleteTransactionsButton from './DeleteTransactionsButton.js';
import AddTransactionButton from './AddTransactionButton.js';
import { getCreditIcon } from '../utils/icons.js';
import styles from './Account.module.css';

const AccountDetails = ({ accounts, activeAccountId }) => {
  // show loading spinner until accounts are loaded
  if (accounts.length < 1) {
    return <div><p className="text-center"><i className="fa fa-cog fa-spin fa-3x"></i></p></div>;
  }

  const activeAccount = accounts.find(account => account._id === activeAccountId);
  let icon = null;
  if (activeAccount && activeAccount.type === 'creditcard') {
    const iconSuffix = getCreditIcon(activeAccount.company);
    icon = <i className={`fa fa-lg fa-fw fa-${iconSuffix}`}></i>;
  }

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
