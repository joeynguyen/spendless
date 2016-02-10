import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FileUpload from './FileUpload.js';
import TransactionsList from './TransactionsList.js';
import styles from './Account.module.css';

// PouchDB is loaded externally through a script tag in the browser
// PouchDB.debug.enable('pouchdb:find')

const transDB = new PouchDB('transactions');

// transDB.info().then(function(info) {
//   console.log('transDB info: ', info);
// });

class AccountDetails extends Component {
  static propTypes = {
    activeAccount: PropTypes.object,
    accountTransactions: PropTypes.arrayOf(React.PropTypes.object),
  }

  state = {
  //   transactions: this.props.accountTransactions
  }

  logState = () => {
    console.log(this.state);
  }

  // When CSV file is uploaded, append new transactions to current transactions state
  // TODO: Add different color for pending transactions not in database
  onUpdate = (val) => {
    // this.setState({
    //   transactions: this.state.transactions.concat(val)
    // });
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
    if (!this.props.activeAccount) {
      return (
        <div className="col-xs-9">
          <div className="header">
            <h3>Accounts Summary</h3>
            <p>Select an account from the sidebar to see its details.</p>
          </div>
        </div>
      );
    }
    let icon = '';
    if (this.props.activeAccount.type === 'creditcard') {
      icon = this.findFaIcon(this.props.activeAccount.company);
    }
    return (
      <div className="col-xs-9">
        <div className="header">
          <h3 className={styles.header}>{icon} {this.props.activeAccount.name} <br />
            <small>{this.props.activeAccount.company}</small></h3>
        </div>
        <FileUpload onUpdate={this.onUpdate} accountId={this.props.activeAccount._id} />
        <button onClick={this.handleSave} >Save</button>
        <TransactionsList />
        <button onClick={this.logState}>console.log(state)</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeAccount: state.activeAccount,
    accountTransactions: state.accountTransactions
  };
}

export default connect(mapStateToProps)(AccountDetails);
