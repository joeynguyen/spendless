import React, { Component } from 'react';
import TransactionsList from './TransactionsList.js';

export default class TransactionsTable extends Component {
  render() {
    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <TransactionsList />
      </table>
    );
  }
}
