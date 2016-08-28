import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { Collapse } from 'react-bootstrap';
import toastr from 'toastr';
import EditAccountForm from './EditAccountForm.js';
import DeleteAccountFormContainer from './DeleteAccountFormContainer.js';
import * as accountsActions from '../account/AccountsActions.js';

class EditAccountFormContainer extends Component {
  static propTypes = {
    account: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    toggleSettings: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    resetForm: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
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
            <DeleteAccountFormContainer
              account={this.props.account}
              toggleConfirmDelete={this.toggleConfirmDelete}
            />
          </div>
        </Collapse>
      </div>
    );
  }
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
  null,
  mapDispatchToProps
)(EditAccountFormContainer);
