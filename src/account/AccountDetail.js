import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router';
import FileUpload from './FileUpload.js';
import TransactionsList from './TransactionsList.js';
import SaveButton from './SaveButton.js';
import styles from './Account.module.css';

export default class AccountDetails extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
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
        <SaveButton />
        <TransactionsList accountId={this.props.params.id} />
      </div>
    );
  }
}
