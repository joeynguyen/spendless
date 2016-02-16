import React, { PropTypes } from 'react';
import { IndexLink } from 'react-router';
import FileUpload from './FileUpload.js';
import TransactionsList from './TransactionsList.js';
import SaveButton from './SaveButton.js';
import styles from './Account.module.css';

// PouchDB is loaded externally through a script tag in the browser
// PouchDB.debug.enable('pouchdb:find')

// const transDB = new PouchDB('transactions');

// transDB.info().then(function(info) {
//   console.log('transDB info: ', info);
// });
const AccountDetails = ({ params, location }) => {
  const { accountName, accountCompany, accountType } = location.query;
  function findFaIcon(cc) {
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
  }
  let icon = '';
  if (accountType === 'creditcard') {
    icon = findFaIcon(accountCompany);
  }
  return (
    <div className="col-xs-9">
      <p><IndexLink to="/">Back to Home</IndexLink></p>
      <div className="header">
        <h3 className={styles.header}>{icon} {accountName} <br />
          <small>{accountCompany}</small></h3>
      </div>
      <FileUpload accountId={params.id} />
      <SaveButton />
      <TransactionsList accountId={params.id} />
    </div>
  );
};

AccountDetails.propTypes  = {
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default AccountDetails;
