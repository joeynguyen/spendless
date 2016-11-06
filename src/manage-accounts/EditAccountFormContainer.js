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
    fields: PropTypes.object.isRequired,
    pristine: PropTypes.bool.isRequired,
    resetForm: PropTypes.func.isRequired,
    toggleSettings: PropTypes.func.isRequired,
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  state = {
    confirmDeleteVisible: false,
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
    // store the name using a variable so we will still have it after deleting the account
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
          confirmDeleteVisible={this.state.confirmDeleteVisible}
          fields={this.props.fields}
          handleUpdateAccount={this.handleUpdateAccount}
          pristine={this.props.pristine}
          toggleConfirmDelete={this.toggleConfirmDelete}
          toggleSettings={this.props.toggleSettings}
        />
        <Collapse in={this.state.confirmDeleteVisible}>
          <div> {/* this div is necessary for smooth collapse animation */}
            <DeleteAccountForm
              handleDeleteAccount={this.handleDeleteAccount}
              toggleConfirmDelete={this.toggleConfirmDelete}
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
