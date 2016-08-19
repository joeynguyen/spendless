import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleAddTransaction } from './TransactionsActions.js';
import { Button } from 'react-bootstrap';

class AddTransactionButton extends Component {
  static propTypes = {
    doToggleAddTransaction: PropTypes.func.isRequired,
  }
  handleAddButtonClick = () => {
    this.props.doToggleAddTransaction();
  }
  render() {
    return (
      <Button
        onClick={this.handleAddButtonClick}
        bsStyle="default"
        bsSize="small"
        /* disabled={(this.props.uploadedTransactions.length === 0)} */
      >
        <i className="fa fa-plus"></i> Add Transaction
      </Button>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    doToggleAddTransaction: toggleAddTransaction,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(AddTransactionButton);
