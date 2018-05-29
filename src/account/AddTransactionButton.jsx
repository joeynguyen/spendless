import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'antd';
import * as transactionsActions from './TransactionsActions.js';

class AddTransactionButton extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
  };

  toggleManageTransaction = () => {
    this.props.actions.toggleManageTransaction();
  };

  render() {
    return (
      <Button icon="plus" size="large" onClick={this.toggleManageTransaction}>
        Add Transaction
      </Button>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(transactionsActions, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(AddTransactionButton);
