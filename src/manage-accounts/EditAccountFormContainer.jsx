import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { message } from 'antd';

import EditBankAccount from './EditBankAccount.jsx';
import EditCreditCardAccount from './EditCreditCardAccount.jsx';
import * as accountsActions from '../account/AccountsActions.js';

export class EditAccountFormContainer extends Component {
  static propTypes = {
    account: PropTypes.object.isRequired,
    actions: PropTypes.object,
    activeAccountId: PropTypes.string,
    initialValues: PropTypes.object.isRequired,
    toggleSettings: PropTypes.func.isRequired,
  };

  saveToDB = accountObj => {
    this.props.actions
      .saveAccount(accountObj)
      .then(result => {
        message.success(`${result.name} account updated`);
      })
      .catch(() => {
        message.error('Restart the application and retry');
      });
  };

  removeFromDB = () => {
    // Remove account from DB
    this.props.actions
      .deleteAccount(this.props.account)
      .then(deletedAccount => {
        // if current route is on the deleted account, route back to root dir
        if (this.props.activeAccountId === deletedAccount.id) {
          this.context.router.history.push('/');
        }
        message.success(`${this.props.account.name} account deleted`);
      })
      .catch(() => {
        message.error('Restart the application and retry');
      });
  };

  render() {
    let accountTypeForm;
    if (this.props.account.type === 'bank') {
      accountTypeForm = (
        <EditBankAccount
          account={this.props.account}
          activeAccountId={this.props.activeAccountId}
          removeFromDB={this.removeFromDB}
          saveToDB={this.saveToDB}
          initialValues={this.props.initialValues}
          toggleSettings={this.props.toggleSettings}
        />
      );
    } else {
      accountTypeForm = (
        <EditCreditCardAccount
          account={this.props.account}
          activeAccountId={this.props.activeAccountId}
          removeFromDB={this.removeFromDB}
          saveToDB={this.saveToDB}
          initialValues={this.props.initialValues}
          toggleSettings={this.props.toggleSettings}
        />
      );
    }
    return accountTypeForm;
  }
}

function mapStateToProps(state) {
  return {
    activeAccountId: state.activeAccountId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(accountsActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  EditAccountFormContainer
);
