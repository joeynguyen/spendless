import React, { Component } from 'react';
import FileUpload from '../components/FileUpload.js';
import TransactionsList from '../components/TransactionsList.js';
import styles from '../components/Account.module.css';
import { Link } from 'react-router';

// PouchDB is loaded externally through a script tag in the browser
const db = new PouchDB('transactions');
db.info().then(function(info) {
  console.log('db info: ', info);
});

export default class Account extends Component {
  state = {
    transactions: []
  }

  componentDidMount() {
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
  // TODO: Don't save transactions that are already saved
  handleSave = () => {
    console.log('Trying to submit...');
    console.log(this.state.transactions);
    this.state.transactions.forEach(function(transaction) {
      console.log(transaction);
      db.put(transaction).then(function(result) {
        console.log('Successfully posted transactions');
        console.log(result);
      }).catch(function(err) {
        console.log(err);
      });
    });
  }

  // Show the current list of transactions by reading them from the database
  importTransactions = () => {
    db.allDocs({
      include_docs: true,
      descending: true,
    }).then((result) => {
      console.log('result :', result);
      const allTransactions = result.rows.map(function(row) {
        return {
          '_id': row.doc._id,
          'amount': row.doc.amount,
          'category': row.doc.category,
          'description': row.doc.description,
          'transactionDate': row.doc.transactionDate,
        };
      });
      console.log('allTransactions: ', allTransactions);
      this.setState({
        transactions: this.state.transactions.concat(allTransactions)
      });
    }).catch(function(err) {
      console.log(err);
    });
  }
  render() {
    return (
      <div className="col-xs-9">
        <div className="header">
          <h3 className={styles.header}>Discover Card <br />
            <small>Discover IT</small></h3>
        </div>
        <FileUpload onUpdate={this.onUpdate} />
        <button onClick={this.handleSave} >Save</button>
        <p><Link to="/">Back to Home</Link></p>
        <TransactionsList transactions={this.state.transactions} />
        {/* <Link to="/counter">to Counter</Link> */}
        <button onClick={this.logState}>console.log(state)</button>
      </div>
    );
  }
}
