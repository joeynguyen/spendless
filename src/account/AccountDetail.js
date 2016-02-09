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

class Account extends Component {
  static propTypes = {
    activeAccount: PropTypes.object,
  }

  state = {
    transactions: []
  }

  componentDidMount() {
    this.importTransactions();
  }

  // componentWillReceiveProps here handles scenario of switching between account pages
  componentWillReceiveProps() {
    this.setState({
      transactions: []
    });
    this.importTransactions();
  }

  logState = () => {
    console.log(this.state);
  }

  // When CSV file is uploaded, append new transactions to current transactions state
  // TODO: Add different color for pending transactions not in database
  onUpdate = (val) => {
    this.setState({
      transactions: this.state.transactions.concat(val)
    });
  }

  // Save transactions uploaded from CSV to database
  handleSave = () => {
    console.log('Trying to submit...');
    console.log(this.state.transactions);
    this.state.transactions.forEach(function(transaction) {
      console.log(transaction);
      transDB.put(transaction).then(function(result) {
        console.log('Successfully posted transactions');
        console.log(result);
      }).catch(function(err) {
        console.log(err);
      });
    });
  }

  // Show the current list of transactions by reading them from the database
  importTransactions = () => {
    transDB.createIndex({
      index: {
        fields: ['transactionDate', 'accountId']
      }
    }).then((result) => {
      // console.log('Successfully created an index!', result);
      return transDB.find({
        // using $gt: null because "$exists doesn't do what you think it does"
        // http://stackoverflow.com/questions/34366615/creating-a-usable-index-in-pouchdb-with-pouchdb-find
        selector: { transactionDate: {'$gt': null}, accountId: this.props.activeAccount._id },
        fields: ['_id', '_rev', 'amount', 'category', 'description', 'transactionDate'],
        sort: [{transactionDate: 'desc'}]
      });
    }).then((result) => {
      const allTransactions = result.docs.map(function(doc) {
        return {
          '_id': doc._id,
          'amount': doc.amount,
          'category': doc.category,
          'description': doc.description,
          'transactionDate': doc.transactionDate,
        };
      });
      console.log('allTransactions: ', allTransactions);
      this.setState({
        transactions: allTransactions
      });
    }).catch(function(err) {
      console.log('Failed to create an index!', err);
    });
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
    console.log(this.props);
    if (this.props.activeAccount) {
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
          <TransactionsList transactions={this.state.transactions} />
          <button onClick={this.logState}>console.log(state)</button>
        </div>
      );
    }
    return <div>Loading...</div>;
  }
}

function mapStateToProps(state) {
  return {
    activeAccount: state.activeAccount
  };
}

export default connect(mapStateToProps)(Account);
