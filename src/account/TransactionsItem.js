import React, { PropTypes } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import moment from 'moment';

const TransactionsItem = ({ handleDeleteTransactions, transaction, unsaved, doToggleEditTransaction, doSelectActiveTransaction, ...reduxFormCheckbox }) => {
  const handleEditClick = function() {
    doToggleEditTransaction();
    doSelectActiveTransaction(transaction);
  };
  const dateFormatted = moment(transaction.date, 'YYYY-MM-DD').format('MM/DD/YYYY');
  // use this code if this app ever supports international currency
  // const transactionAmount = Number(transaction.amount).toLocaleString('en-US', { style: 'currency', currency: 'USD'});
  let rowStyle;
  let selectCheckbox;
  let editButton;
  let deleteButton;
  if (unsaved) {
    rowStyle = {backgroundColor: 'yellow'};
  } else {
    // don't show for uploaded/unsaved transactions
    selectCheckbox = <input type="checkbox" {...reduxFormCheckbox} />;
    editButton = <td><i className="fa fa-fw fa-lg fa-pencil" onClick={handleEditClick}></i></td>;
    deleteButton = <td><i className="fa fa-fw fa-lg fa-remove" onClick={handleDeleteTransactions}></i></td>;
  }
  let note;
  if (transaction.notes !== '') {
    note = (
      <OverlayTrigger placement="left" overlay={<Tooltip id={transaction._id}>{transaction.notes}</Tooltip>}>
        <i className="fa fa-fw fa-lg fa-sticky-note-o" ></i>
      </OverlayTrigger>
    );
  }
  return (
    <tr style={rowStyle}>
      <td>{selectCheckbox}</td>
      <td>{dateFormatted}</td>
      <td>{transaction.description}</td>
      <td>{transaction.category}</td>
      <td>${transaction.amount}</td>
      <td>{note}</td>
      { editButton }
      { deleteButton }
    </tr>
  );
};
TransactionsItem.propTypes = {
  handleDeleteTransactions: PropTypes.func.isRequired,
  transaction: PropTypes.object.isRequired,
  unsaved: PropTypes.bool.isRequired,
  doToggleEditTransaction: PropTypes.func.isRequired,
  doSelectActiveTransaction: PropTypes.func.isRequired,
};

export default TransactionsItem;
