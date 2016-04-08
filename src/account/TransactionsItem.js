import React, { PropTypes } from 'react';

const TransactionsItem = ({ transaction, unsaved, doToggleEditTransaction, doSelectActiveTransaction }) => {
  const handleEditClick = function() {
    doToggleEditTransaction();
    doSelectActiveTransaction(transaction);
  };
  // use this code if this app ever supports international currency
  // const transactionAmount = Number(transaction.amount).toLocaleString('en-US', { style: 'currency', currency: 'USD'});
  let rowStyle = {};
  if (unsaved) {
    rowStyle = {backgroundColor: 'yellow'};
  }
  let note;
  if (transaction.notes !== '') {
    note = (<i className="fa fa-fw fa-lg fa-sticky-note-o" ></i>);
  }
  return (
    <tr style={rowStyle}>
      <td>{transaction.date}</td>
      <td>{transaction.description}</td>
      <td>{transaction.category}</td>
      <td>${transaction.amount}</td>
      <td>{note}</td>
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
