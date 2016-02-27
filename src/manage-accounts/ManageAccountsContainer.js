import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Button } from 'react-bootstrap';
import { toggleManageAccounts } from '../manage-accounts/ManageAccountsActions.js';
import AddAccountContainer from '../manage-accounts/AddAccountContainer.js';

class ManageAccountsContainer extends Component {
  static propTypes = {
    manageAccountsVisible: PropTypes.bool.isRequired,
    doToggleManageAccounts: PropTypes.func.isRequired
  }
  render() {
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
    manageAccountsVisible: state.manageAccountsVisible
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ doToggleManageAccounts: toggleManageAccounts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccountsContainer);
