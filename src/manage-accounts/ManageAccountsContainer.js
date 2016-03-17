import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Button } from 'react-bootstrap';
import { toggleManageAccounts } from '../manage-accounts/ManageAccountsActions.js';
import AddAccountContainer from '../manage-accounts/AddAccountContainer.js';
import AccountsList from './AccountsList.js';

class ManageAccountsContainer extends Component {
  static propTypes = {
    manageAccountsVisible: PropTypes.bool.isRequired,
    doToggleManageAccounts: PropTypes.func.isRequired,
    accounts: PropTypes.array.isRequired,
  }
  render() {
    console.log(this.props);
    const ccAccounts = this.props.accounts.filter(account => account.type === 'creditcard');
    const bankAccounts = this.props.accounts.filter(account => account.type === 'bank');
    return (
      <Modal show={this.props.manageAccountsVisible} onHide={() => this.props.doToggleManageAccounts()}>
        <Modal.Header closeButton>
          <Modal.Title>Manage Accounts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-xs-8">
              <AddAccountContainer />
              <hr />
              {/* Use state to display 'No accounts' */}
              {/* TODO: Show all accounts in this window */}
              <AccountsList accounts={this.props.accounts} />
            </div>

            <div className="col-xs-4">
              <ul>
                {/* TODO: Dynamically show number of accounts */}
                <li>{bankAccounts.length} Bank accounts</li>
                <li>{ccAccounts.length} Credit card accounts</li>
              </ul>
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.props.doToggleManageAccounts()}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    manageAccountsVisible: state.manageAccountsVisible,
    accounts: state.accounts,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ doToggleManageAccounts: toggleManageAccounts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccountsContainer);
