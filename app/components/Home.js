import React, { Component } from 'react';
// import { Link } from 'react-router';
import FileUpload from './FileUpload.js';
import TransactionsList from './TransactionsList.js';
import styles from './Home.module.css';

export default class Home extends Component {
  state = {
    transactions: [
      {
        id: 1,
        transactionDate: '07/09/2015',
        description: 'Barnes and Nobles',
        category: 'Books',
        amount: '10'
      },
      {
        id: 2,
        transactionDate: '01/10/2015',
        description: 'AMC Theatres',
        category: 'Entertainment',
        amount: '25'
      }
    ]
  }
  logState = () => {
    console.log(this.state);
  }
  onUpdate = (val) => {
    this.setState({
      transactions: this.state.transactions.concat(val)
    });
  }
  render() {
    return (
      <div>
        <div className={styles.container}>
          <h2 className={styles.header}>Giao</h2>
          <FileUpload onUpdate={this.onUpdate} />
          <TransactionsList transactions={this.state.transactions} />
          {/* <Link to="/counter">to Counter</Link> */}
          <button onClick={this.logState}>console.log(state)</button>
        </div>
      </div>
    );
  }
}
