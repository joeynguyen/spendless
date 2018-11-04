import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Drawer } from 'antd';
import moment from 'moment';
import ManageTransaction from './ManageTransaction.jsx';
import * as transactionsActions from './TransactionsActions.js';

class ManageTransactionContainer extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    activeAccountId: PropTypes.string.isRequired,
    activeMonth: PropTypes.string.isRequired,
    activeTransaction: PropTypes.object,
    initialValues: PropTypes.object.isRequired,
    manageTransactionVisible: PropTypes.bool.isRequired,
  };

  render() {
    const {
      saveAccountTransactions,
      toggleManageTransaction,
    } = this.props.actions;
    const manageType = this.props.activeTransaction !== null ? 'edit' : 'add';
    const componentTitle =
      manageType === 'edit' ? 'Edit Transaction' : 'Add Transaction';
    const modalFooter = [
      <Button
        key="confirm"
        type="primary"
        htmlType="submit"
        form="manage-transaction"
      >
        Save
      </Button>,
      <Button
        key="cancel"
        id="cancel-manage-transaction"
        size="large"
        onClick={toggleManageTransaction}
      >
        Cancel
      </Button>,
    ];

    return (
      <Drawer
        id="ManageTransaction"
        maskClosable={false}
        visible={this.props.manageTransactionVisible}
        onClose={toggleManageTransaction}
        title={componentTitle}
        footer={modalFooter}
        width={720}
        placement="right"
      >
        <ManageTransaction
          activeAccountId={this.props.activeAccountId}
          activeMonth={this.props.activeMonth}
          activeTransaction={this.props.activeTransaction}
          initialValues={this.props.initialValues}
          saveAccountTransactions={saveAccountTransactions}
          toggleManageTransaction={toggleManageTransaction}
        />
      </Drawer>
    );
  }
}

function mapStateToProps(state) {
  let initialValues = {
    amount: undefined,
    category: undefined,
    date: undefined,
    description: undefined,
    notes: '',
  };

  if (state.activeTransaction !== null) {
    const {
      amount,
      category,
      date,
      description,
      notes,
    } = state.activeTransaction;
    const dateFormat = 'YYYY-MM-DD';
    initialValues = {
      amount,
      category,
      date: moment(date, dateFormat),
      description,
      notes,
    };
  }
  return {
    activeAccountId: state.activeAccountId,
    activeMonth: state.activeMonth,
    activeTransaction: state.activeTransaction,
    initialValues,
    manageTransactionVisible: state.manageTransactionVisible,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(transactionsActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageTransactionContainer);
