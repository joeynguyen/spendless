import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';

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
  }

  saveToDB = (accountObj) => {
    this.props.actions.saveAccount(accountObj)
      .then(result => {
        toastr.success(result.name + ' account updated', null, {timeOut: 1500});
      })
      .catch(() => {
        toastr.error('Restart the application and retry', 'Error updating account', {timeOut: 1500});
      });
  }

  removeFromDB = () => {
    // Remove account from DB
    this.props.actions.deleteAccount(this.props.account)
      .then(deletedAccount => {
        // if current route is on the deleted account, route back to root dir
        if (this.props.activeAccountId === deletedAccount.id) {
          this.context.router.history.push('/');
        }
        toastr.success(this.props.account.name + ' account deleted', null, {timeOut: 1500});
      })
      .catch(() => {
        toastr.error('Restart the application and retry', 'Error deleting account', {timeOut: 1500});
      });
  }

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
    actions: bindActionCreators(accountsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAccountFormContainer);
