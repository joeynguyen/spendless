import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
import * as transactionsActions from './TransactionsActions.js';

class AddTransactionButton extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
  }

  toggleManageTransaction = () => {
    this.props.actions.toggleManageTransaction();
  }

  render() {
    return (
      <Button
        onClick={this.toggleManageTransaction}
        bsStyle="default"
        bsSize="small"
      >
        <i className="fa fa-plus"></i> Add Transaction
      </Button>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(transactionsActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(AddTransactionButton);
