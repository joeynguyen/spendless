import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AddIcon, Button } from 'grommet';
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
        icon={<AddIcon />}
        label="Add Transaction"
        onClick={this.toggleManageTransaction}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(transactionsActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(AddTransactionButton);
