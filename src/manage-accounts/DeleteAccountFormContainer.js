import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Button, ButtonInput } from 'react-bootstrap';
import toastr from 'toastr';
import { deleteAccount } from '../account/AccountsActions.js';

class DeleteAccountFormContainer extends Component {
  static propTypes = {
    account: PropTypes.object.isRequired,
    activeAccountId: PropTypes.string.isRequired,
    toggleConfirmDelete: PropTypes.func.isRequired,
    doDeleteAccount: PropTypes.func.isRequired,
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  state = {
    confirmDeleteText: '',
  }

  handleConfirmDeleteText = (e) => {
    this.setState({ confirmDeleteText: e.target.value });
  }

  handleDeleteAccount = (e) => {
    e.preventDefault();
    // cache name we will still have it after deleting the account
    const accountName = this.props.account.name;
    // Remove account from DB
    this.props.doDeleteAccount(this.props.account)
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
    const cancelButton = (
      <Button
        onClick={this.props.toggleConfirmDelete}
      >Cancel</Button>
    );
    return (
      <form onSubmit={this.handleDeleteAccount}>
        <hr />
        <p>Type DELETE into this box to confirm</p>
        <div className="row">
          <div className="col-xs-6">
            <Input
              type="text"
              value={this.state.confirmDeleteText}
              onChange={this.handleConfirmDeleteText}
              placeholder="DELETE" />
          </div>
          <div className="col-xs-6">
            <ButtonInput
              disabled={this.state.confirmDeleteText !== 'DELETE'}
              bsStyle="primary"
              groupClassName="horizontal-button-group"
              buttonAfter={cancelButton}
              type="submit"
              value="Confirm" />
          </div>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeAccountId: state.activeAccountId,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    doDeleteAccount: deleteAccount,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccountFormContainer);
