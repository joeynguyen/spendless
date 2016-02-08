import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import { toggleManageAccounts } from '../manage-accounts/ManageAccountsActions.js';
import AddAccountContainer from '../manage-accounts/AddAccountContainer.js';

class ManageAccountsContainer extends Component {
  static propTypes = {
    showManageAccounts: PropTypes.bool.isRequired,
    doToggleManageAccounts: PropTypes.func.isRequired
  }
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onClick={() => this.props.doToggleManageAccounts(false)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onClick={() => this.props.doToggleManageAccounts(false)}
      />,
    ];
    return (
      <Dialog
        title="Manage Accounts"
        actions={actions}
        modal="true"
        autoScrollBodyContent="true"
        open={this.props.showManageAccounts}
      >
        {/* TODO: Replace Bootstrap classes */}
        <div className="row">
          <div className="col-xs-8">
            <AddAccountContainer />
            <hr />
            {/* Use state to display 'No accounts' */}
            {/* TODO: Show all accounts in this window */}
            <p>No accounts found.</p>
          </div>

          <div className="col-xs-4">
            <ul>
              {/* TODO: Dynamically show number of accounts */}
              <li>1 Checking accounts</li>
              <li>2 Credit card accounts</li>
            </ul>
          </div>
        </div>
      </Dialog>
    );
  }
}

function mapStateToProps(state) {
  return {
    showManageAccounts: state.showManageAccounts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ doToggleManageAccounts: toggleManageAccounts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccountsContainer);
