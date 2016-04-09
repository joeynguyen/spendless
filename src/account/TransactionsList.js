import React, { PropTypes } from 'react';
import TransactionsItemContainer from './TransactionsItemContainer.js';
import EditTransactionContainer from './EditTransactionContainer.js';
import styles from './Transactions.module.css';

const TransactionsList = ({ editTransactionVisible, uploadedTransactions, accountTransactions }) => {
  let editTransactionContainer;
  if (editTransactionVisible) {
    editTransactionContainer = (<EditTransactionContainer />);
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
            uploadedTransactions.map(itemData =>
              <TransactionsItemContainer key={itemData._id} transaction={itemData} unsaved />
            )
          }
          {
            accountTransactions.map(itemData =>
              <TransactionsItemContainer key={itemData._id} transaction={itemData} unsaved={false} />
            )
          }
        </tbody>
      </table>
      { editTransactionContainer }
    </div>
  );
};
TransactionsList.propTypes = {
  editTransactionVisible: PropTypes.bool.isRequired,
  accountTransactions: PropTypes.arrayOf(React.PropTypes.object),
  uploadedTransactions: PropTypes.arrayOf(React.PropTypes.object),
};

export default TransactionsList;
