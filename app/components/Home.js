import React, { Component } from 'react';
// import { Link } from 'react-router';
import FileUpload from './FileUpload.js';
import TransactionsList from './TransactionsList.js';
import styles from './Home.module.css';

// PouchDB is loaded externally through a script tag in the browser
const db = new PouchDB('transactions');
db.info().then(function(info) {
  console.log('db info: ', info);
});

export default class Home extends Component {
  state = {
    transactions: []
  }
  componentDidMount() {
    this.importTransactions();
  }
  logState = () => {
    console.log(this.state);
  }
  onUpdate = (val) => {
    this.setState({
      transactions: this.state.transactions.concat(val)
    });
  }
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
  importTransactions = () => {
    const that = this;
    db.allDocs({
      include_docs: true,
      descending: true,
    }).then(function(result) {
      console.log('result :', result);
      const filteredArray = result.rows.map(function(row) {
        return {
          '_id': row.doc._id,
          'amount': row.doc.amount,
          'category': row.doc.category,
          'description': row.doc.description,
          'transactionDate': row.doc.transactionDate,
        };
      });
      console.log('filteredArray: ', filteredArray);
      that.setState({
        transactions: that.state.transactions.concat(filteredArray)
      });
    }).catch(function(err) {
      console.log(err);
    });
  }
  render() {
    return (
      <div>
        <div className={styles.container}>
          <h2 className={styles.header}>Giao</h2>
          <FileUpload onUpdate={this.onUpdate} />
          <button onClick={this.handleSave} >Save</button>
          <TransactionsList transactions={this.state.transactions} />
          {/* <Link to="/counter">to Counter</Link> */}
          <button onClick={this.logState}>console.log(state)</button>
        </div>
      </div>
    );
  }
}
