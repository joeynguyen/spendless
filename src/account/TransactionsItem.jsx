import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Animate, CloseIcon, EditIcon, NoteIcon, Tip } from 'grommet';
import moment from 'moment';

class TransactionsItem extends Component {
  state = {
    noteTipVisible: false,
  }
  render() {
    const { handleDeleteTransactions, transaction, unsaved, handleEditClick, reduxFormCheckbox } = this.props;
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
        <div>
          <NoteIcon
            onMouseOver={() => this.setState({noteTipVisible: true})}
            onMouseLeave={() => this.setState({noteTipVisible: false})}
            id={`transaction-note-icon-${transaction._id}`}
            colorIndex="warning"
            size="xsmall"
          />
          <Animate
            enter={{animation: 'fade', duration: 100, delay: 0}}
            visible={this.state.noteTipVisible}
          >
            <Tip
              id={transaction._id}
              target={`transaction-note-icon-${transaction._id}`}
              onClose={() => {}}
            >
              {transaction.notes}
            </Tip>
          </Animate>
        </div>
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
  }
}
TransactionsItem.propTypes = {
  handleDeleteTransactions: PropTypes.func.isRequired,
  reduxFormCheckbox: PropTypes.object.isRequired,
  transaction: PropTypes.object.isRequired,
  unsaved: PropTypes.bool.isRequired,
  handleEditClick: PropTypes.func.isRequired,
};

export default TransactionsItem;
