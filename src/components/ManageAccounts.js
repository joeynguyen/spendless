import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { AddAccountContainer } from '../manage-accounts/AddAccountContainer.js';

export default class ManageAccountsWindow extends Component {
  static propTypes = {
    showModal: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
  }
  closeWindow = () => {
    this.setState({showAdd: false, showBank: false, showCredit: false});
    this.props.close();
  }
  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.closeWindow}>
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
          <Button onClick={this.closeWindow}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
