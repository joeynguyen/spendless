import React, { PropTypes } from 'react';

const TransactionsItem = ({ transaction, unsaved, doToggleEditTransaction, doSelectActiveTransaction }) => {
  const handleEditClick = function() {
    doToggleEditTransaction();
    doSelectActiveTransaction(transaction);
  };
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
      <td><i className="fa fa-fw fa-lg fa-pencil" onClick={handleEditClick}></i></td>
    </tr>
  );
};
TransactionsItem.propTypes = {
  transaction: PropTypes.object.isRequired,
  unsaved: PropTypes.bool.isRequired,
  doToggleEditTransaction: PropTypes.func.isRequired,
  doSelectActiveTransaction: PropTypes.func.isRequired,
};

export default TransactionsItem;
