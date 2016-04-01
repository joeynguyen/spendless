import React, { PropTypes } from 'react';


const TransactionsItem = ({ transaction, unsaved }) => {
  let rowStyle = {};
  if (unsaved) {
    rowStyle = {backgroundColor: 'yellow'};
  }
  return (
    <tr style={rowStyle}>
      <td>{transaction.transactionDate}</td>
      <td>{transaction.description}</td>
      <td>{transaction.category}</td>
      <td>{Number(transaction.amount).toLocaleString('en-US', { style: 'currency', currency: 'USD'})}</td>
    </tr>
  );
};
TransactionsItem.propTypes = {
  transaction: PropTypes.object.isRequired,
  unsaved: PropTypes.bool.isRequired,
};

export default TransactionsItem;
