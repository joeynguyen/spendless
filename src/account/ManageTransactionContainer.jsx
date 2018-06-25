import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { message } from 'antd';
import { Form } from 'antd';
import ManageTransaction from './ManageTransaction.jsx';
import * as transactionsActions from './TransactionsActions.js';

class ManageTransactionContainer extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    activeAccountId: PropTypes.string.isRequired,
    activeTransaction: PropTypes.object,
    form: PropTypes.object.isRequired,
    initialValues: PropTypes.object.isRequired,
    manageTransactionVisible: PropTypes.bool.isRequired,
  };

  toggleManageTransaction = () => {
    this.props.actions.toggleManageTransaction();
  };

  handleSaveTransaction = e => {
    e.preventDefault();
    let newTransactionObj;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // values.date is returned as a moment object so we have to convert it here
        const dateStringified = values.date.format('YYYY-MM-DD');
        if (this.props.activeTransaction !== null) {
          // update transaction
          newTransactionObj = Object.assign({}, this.props.activeTransaction, {
            amount: Number(values.amount).toFixed(2),
            category: values.category,
            date: dateStringified,
            description: values.description,
            notes: values.notes,
          });
        } else {
          // add new transaction
          newTransactionObj = {
            _id: new Date().getTime().toString(),
            accountId: this.props.activeAccountId,
            amount: Number(values.amount).toFixed(2),
            category: values.category,
            date: dateStringified,
            description: values.description,
            notes: values.notes,
          };
        }

        // Save account in DB
        this.props.actions
          .saveAccountTransactions(newTransactionObj)
          .then(() => {
            message.success('Transaction saved');
            // reset current transaction being edited to null
            this.toggleManageTransaction();
          })
          .catch(() => {
            message.error('Restart the application and retry');
          });
      }
    });
  };

  render() {
    const manageType = this.props.activeTransaction !== null ? 'edit' : 'add';
    return (
      <ManageTransaction
        form={this.props.form}
        manageType={manageType}
        manageTransactionVisible={this.props.manageTransactionVisible}
        toggleManageTransaction={this.toggleManageTransaction}
        doSubmit={this.handleSaveTransaction}
      />
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
      amount: amount,
      category: category,
      date: moment(date, dateFormat),
      description: description,
      notes: notes,
    };
  }
  return {
    activeAccountId: state.activeAccountId,
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
)(
  Form.create({
    mapPropsToFields(props) {
      return {
        amount: Form.createFormField({
          ...props.amount,
          value: props.initialValues.amount,
        }),
        category: Form.createFormField({
          ...props.category,
          value: props.initialValues.category,
        }),
        date: Form.createFormField({
          ...props.date,
          value: props.initialValues.date,
        }),
        description: Form.createFormField({
          ...props.description,
          value: props.initialValues.description,
        }),
        notes: Form.createFormField({
          ...props.notes,
          value: props.initialValues.notes,
        }),
      };
    },
  })(ManageTransactionContainer)
);
