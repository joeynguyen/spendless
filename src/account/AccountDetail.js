import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router';
import FileUpload from './FileUpload.js';
import TransactionsList from './TransactionsList.js';
import styles from './Account.module.css';

// PouchDB is loaded externally through a script tag in the browser
// PouchDB.debug.enable('pouchdb:find')

// const transDB = new PouchDB('transactions');

// transDB.info().then(function(info) {
//   console.log('transDB info: ', info);
// });

export default class AccountDetails extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  }

  // Save transactions uploaded from CSV to database
  handleSave = () => {
    // console.log('Trying to submit...');
    // console.log(this.state.transactions);
    // this.state.transactions.forEach(function(transaction) {
    //   console.log(transaction);
    //   transDB.put(transaction).then(function(result) {
    //     console.log('Successfully posted transactions');
    //     console.log(result);
    //   }).catch(function(err) {
    //     console.log(err);
    //   });
    // });
  }

  findFaIcon(cc) {
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

  render() {
    const { accountName, accountCompany, accountType } = this.props.location.query;
    if (accountName === null) {
      return <div>Loading...</div>;
    }
    let icon = '';
    if (accountType === 'creditcard') {
      icon = this.findFaIcon(accountCompany);
    }
    return (
      <div className="col-xs-9">
        <p><IndexLink to="/">Back to Home</IndexLink></p>
        <div className="header">
          <h3 className={styles.header}>{icon} {accountName} <br />
            <small>{accountCompany}</small></h3>
        </div>
        <FileUpload accountId={this.props.params.id} />
        <button onClick={this.handleSave} >Save</button>
        <TransactionsList accountId={this.props.params.id} />
      </div>
    );
  }
}
