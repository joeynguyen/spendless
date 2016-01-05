import React, { Component, PropTypes } from 'react';
import { Modal, Button, Panel } from 'react-bootstrap';

// PouchDB is loaded externally through a script tag in the browser
const db = new PouchDB('accounts');

export default class ManageAccountsWindow extends Component {
  static propTypes = {
    showModal: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
  }
  state = {
    showAdd: false
  }
  toggleAddAccount = () => {
    this.setState({showAdd: !this.state.showAdd});
  }
  closeWindow = () => {
    this.setState({showAdd: false});
    this.props.close();
  }
  render() {
    let addButton = {};
    if (this.state.showAdd) {
      addButton = { style: 'danger', class: '', text: 'Cancel' };
    } else {
      addButton = { style: 'primary', class: 'fa fa-plus', text: ' Add Account' };
    }
    return (
      <Modal show={this.props.showModal} onHide={this.closeWindow}>
        <Modal.Header closeButton>
          <Modal.Title>Manage Accounts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-xs-8">
              <Button onClick={this.toggleAddAccount} bsStyle={addButton.style} bsSize="large" block><i className={addButton.class}></i>{addButton.text}</Button>
              <Panel collapsible expanded={this.state.showAdd}>
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
                Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
              </Panel>
              <hr />
              {/* Use state to display 'No accounts' */}
              <p>No accounts found.</p>
            </div>

            <div className="col-xs-4">
              <ul>
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
