import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { Collapse } from 'react-bootstrap';
import toastr from 'toastr';
import EditAccountForm from './EditAccountForm.js';
import DeleteAccountForm from './DeleteAccountForm.js';
import * as accountsActions from '../account/AccountsActions.js';

export class EditAccountFormContainer extends Component {
  static propTypes = {
    account: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    activeAccountId: PropTypes.string,
    toggleSettings: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    resetForm: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  state = {
    confirmDeleteVisible: false,
    confirmDeleteText: '',
  }

  handleConfirmDeleteText = (e) => {
    this.setState({ confirmDeleteText: e.target.value });
  }


  toggleConfirmDelete = () => {
    this.setState({ confirmDeleteVisible: !this.state.confirmDeleteVisible });
  }

  handleUpdateAccount = (e) => {
    e.preventDefault();

    const newAccountObj = Object.assign({}, this.props.account, {
      name: this.props.fields.accountName.value,
      type: this.props.fields.accountType.value,
      company: this.props.fields.accountCompany.value,
    });
    // Update account in DB
    this.props.actions.saveAccount(newAccountObj)
      .then(result => {
        toastr.success(result.name + ' account updated', null, {timeOut: 1500});
      })
      .catch(() => {
        toastr.error('Restart the application and retry', 'Error updating account', {timeOut: 1500});
      });
  }

  handleDeleteAccount = (e) => {
    e.preventDefault();
    // cache name we will still have it after deleting the account
    const accountName = this.props.account.name;
    // Remove account from DB
    this.props.actions.deleteAccount(this.props.account)
      .then(deletedAccount => {
        // if current route is on the deleted account, route back to root dir
        if (this.props.activeAccountId === deletedAccount.id) {
          this.context.router.push('/');
        }
        toastr.success(accountName + ' account deleted', null, {timeOut: 1500});
      })
      .catch(() => {
        toastr.error('Restart the application and retry', 'Error deleting account', {timeOut: 1500});
      });
  }

  render() {
    return (
      <div>
        <EditAccountForm
          fields={this.props.fields}
          pristine={this.props.pristine}
          toggleSettings={this.props.toggleSettings}
          confirmDeleteVisible={this.state.confirmDeleteVisible}
          toggleConfirmDelete={this.toggleConfirmDelete}
          handleUpdateAccount={this.handleUpdateAccount}
        />
        <Collapse in={this.state.confirmDeleteVisible}>
          <div>
            <DeleteAccountForm
              toggleConfirmDelete={this.toggleConfirmDelete}
              handleDeleteAccount={this.handleDeleteAccount}
              handleConfirmDeleteText={this.handleConfirmDeleteText}
              confirmDeleteText={this.state.confirmDeleteText}
            />
          </div>
        </Collapse>
      </div>
    );
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

export default reduxForm(
  {
    form: 'EditAccount',
    fields: ['accountName', 'accountType', 'accountCompany'],
  },
  mapStateToProps,
  mapDispatchToProps
)(EditAccountFormContainer);
