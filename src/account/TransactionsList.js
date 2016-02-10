import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TransactionsItem from './TransactionsItem.js';

class TransactionsList extends Component {
  static propTypes = {
    accountTransactions: PropTypes.arrayOf(React.PropTypes.object),
  }
  render() {
    console.log('accountTransactions', this.props.accountTransactions);
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
            this.props.accountTransactions.map(itemData =>
              <TransactionsItem key={itemData._id} item={itemData} />
            )
          }
        </tbody>
      </table>
    );
  }
}

function mapStateToProps(state) {
  return {
    accountTransactions: state.accountTransactions
  };
}

export default connect(mapStateToProps)(TransactionsList);
