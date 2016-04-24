import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import TransactionsItemContainer from './TransactionsItemContainer.js';
import EditTransactionContainer from './EditTransactionContainer.js';
import AddTransactionContainer from './AddTransactionContainer.js';
import styles from './Transactions.module.css';

class TransactionsList extends Component {
  static propTypes = {
    addTransactionVisible: PropTypes.bool.isRequired,
    editTransactionVisible: PropTypes.bool.isRequired,
    accountTransactions: PropTypes.arrayOf(React.PropTypes.object),
    uploadedTransactions: PropTypes.arrayOf(React.PropTypes.object),
    fields: PropTypes.object.isRequired,
  }

  render() {
    let editTransactionContainer;
    let addTransactionContainer;
    if (this.props.editTransactionVisible) {
      editTransactionContainer = (<EditTransactionContainer />);
    }
    if (this.props.addTransactionVisible) {
      addTransactionContainer = (<AddTransactionContainer />);
    }
    return (
      <div>
        <table className={styles['transactions-table'] + ' transactions-table table table-hover'}>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.uploadedTransactions.map(itemData =>
                <TransactionsItemContainer key={itemData._id} transaction={itemData} unsaved />
              )
            }
            {
              this.props.accountTransactions.map(itemData =>
                <TransactionsItemContainer key={itemData._id} transaction={itemData} {...this.props.fields[itemData._id]} unsaved={false} />
              )
            }
          </tbody>
        </table>
        { addTransactionContainer }
        { editTransactionContainer }
      </div>
    );
  }
}

export default reduxForm(
  {
    form: 'ManageTransactionsList',
  },
)(TransactionsList);
