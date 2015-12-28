import React, { Component, PropTypes } from 'react';
import TransactionsItem from './TransactionsItem.js';

export default class TransactionsList extends Component {
  static propTypes = {
    transactions: PropTypes.arrayOf(React.PropTypes.object)
  }
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
        <tbody>
          {
            this.props.transactions.map(function(itemData) {
              return (
                <TransactionsItem key={itemData._id} item={itemData} />
              );
            })
          }
        </tbody>
      </table>
    );
  }
}
