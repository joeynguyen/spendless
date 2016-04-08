import React, { PropTypes } from 'react';

const TransactionsItem = ({ transaction, unsaved, doToggleEditTransaction, doSelectActiveTransaction }) => {
  const handleEditClick = function() {
    doToggleEditTransaction();
    doSelectActiveTransaction(transaction);
  };
  const transactionAmount = Number(transaction.amount).toLocaleString('en-US', { style: 'currency', currency: 'USD'});
  let rowStyle = {};
  if (unsaved) {
    rowStyle = {backgroundColor: 'yellow'};
  }
  return (
    <tr style={rowStyle}>
      <td>{transaction.date}</td>
      <td>{transaction.description}</td>
      <td>{transaction.category}</td>
      <td>{transactionAmount}</td>
      <td><i className="fa fa-fw fa-lg fa-pencil" onClick={handleEditClick}></i></td>
      <td><i className="fa fa-fw fa-lg fa-remove" ></i></td>
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
