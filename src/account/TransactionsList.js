import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchAccountTransactions } from './TransactionsActions.js';
import TransactionsItem from './TransactionsItem.js';

class TransactionsList extends Component {
  static propTypes = {
    accountId: PropTypes.string.isRequired,
    accountTransactions: PropTypes.arrayOf(React.PropTypes.object),
    uploadedTransactions: PropTypes.arrayOf(React.PropTypes.object),
    doFetchAccountTransactions: PropTypes.func.isRequired,
  }
  componentDidMount() {
    this.props.doFetchAccountTransactions(this.props.accountId);
  }
  componentDidUpdate(prevProps) {
    console.log('prevProps.accountId', prevProps.accountId);
    console.log('this.props.accountId', this.props.accountId);
    if (this.props.accountId !== prevProps.accountId) {
      this.props.doFetchAccountTransactions(this.props.accountId);
    }
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ doFetchAccountTransactions: fetchAccountTransactions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsList);
