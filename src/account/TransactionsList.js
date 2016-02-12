import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TransactionsItem from './TransactionsItem.js';

class TransactionsList extends Component {
  static propTypes = {
    accountTransactions: PropTypes.arrayOf(React.PropTypes.object),
    uploadedTransactions: PropTypes.arrayOf(React.PropTypes.object),
  }
  logProps = () => {
    console.log(this.props);
  }
  render() {
    console.log('accountTransactions', this.props.accountTransactions);
    return (
      <div>
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
              <TransactionsItem key={itemData._id} item={itemData} unsaved={false} />
            )
          }
        </tbody>
      </table>
      <button onClick={this.logProps}>console.log(props)</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    accountTransactions: state.accountTransactions,
    uploadedTransactions: state.uploadedTransactions,
  };
}

export default connect(mapStateToProps)(TransactionsList);
