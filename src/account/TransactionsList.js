import React, { PropTypes } from 'react';
import TransactionsItemContainer from './TransactionsItemContainer.js';
import styles from './Transactions.module.css';

const TransactionsList = ({ accountTransactions, fields, uploadedTransactions }) => {
  const fieldPropPlaceholder = { defaultChecked: '', defaultValue: '', checked: false };

  return (
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
            <TransactionsItemContainer key={itemData._id} transaction={itemData} field={fieldPropPlaceholder} unsaved />
          )
        }
        {
          accountTransactions.map(itemData =>
            <TransactionsItemContainer key={itemData._id} transaction={itemData} field={fields[itemData._id]} unsaved={false} />
          )
        }
      </tbody>
    </table>
  );
};

TransactionsList.propTypes = {
  uploadedTransactions: PropTypes.arrayOf(React.PropTypes.object),
  accountTransactions: PropTypes.arrayOf(React.PropTypes.object),
  fields: PropTypes.object.isRequired,
};

export default TransactionsList;
