import React, { PropTypes } from 'react';
import TransactionsItem from './TransactionsItem.js';

const TransactionsList = ({ transactions }) => {
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
          transactions.map(itemData =>
            <TransactionsItem key={itemData._id} item={itemData} />
          )
        }
      </tbody>
    </table>
  );
};
TransactionsList.propTypes = { transactions: PropTypes.arrayOf(React.PropTypes.object).isRequired };

export default TransactionsList;
