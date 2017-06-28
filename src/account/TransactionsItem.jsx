import PropTypes from 'prop-types';
import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { CloseIcon, EditIcon, NoteIcon } from 'grommet';
import moment from 'moment';

const TransactionsItem = ({ handleDeleteTransactions, transaction, unsaved, handleEditClick, reduxFormCheckbox }) => {
  // use this code if this app ever supports international currency
  // const transactionAmount = Number(transaction.amount).toLocaleString('en-US', { style: 'currency', currency: 'USD'});
  const dateFormatted = moment(transaction.date, 'YYYY-MM-DD').format('MM/DD/YYYY');
  let rowStyle;
  let selectCheckbox = '';
  let note = '';
  let editButton = '';
  let deleteButton = '';

  if (unsaved) {
    rowStyle = {backgroundColor: 'yellow'};
  } else {
    // don't show for uploaded/unsaved transactions
    selectCheckbox = (
      <input
        type="checkbox"
        checked={reduxFormCheckbox.checked}
        name={reduxFormCheckbox.name}
        onBlur={reduxFormCheckbox.onBlur}
        onChange={reduxFormCheckbox.onChange}
        onFocus={reduxFormCheckbox.onFocus}
        value={reduxFormCheckbox.value}
        />
    );
    editButton = <EditIcon colorIndex="accent-1" size="xsmall" onClick={handleEditClick} />;
    deleteButton = <CloseIcon colorIndex="critical" size="xsmall" onClick={handleDeleteTransactions}/>;
  }

  if (transaction.notes !== '') {
    note = (
      <OverlayTrigger placement="left" overlay={<Tooltip id={transaction._id}>{transaction.notes}</Tooltip>}>
        <NoteIcon colorIndex="warning" size="xsmall"/>
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
      <td>{editButton}</td>
      <td>{deleteButton}</td>
    </tr>
  );
};
TransactionsItem.propTypes = {
  handleDeleteTransactions: PropTypes.func.isRequired,
  transaction: PropTypes.object.isRequired,
  unsaved: PropTypes.bool.isRequired,
  handleEditClick: PropTypes.func.isRequired,
};

export default TransactionsItem;
