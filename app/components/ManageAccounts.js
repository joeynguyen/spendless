import React, { Component, PropTypes } from 'react';
import { Modal, Button, ButtonInput, Collapse, Panel, Input } from 'react-bootstrap';

// PouchDB is loaded externally through a script tag in the browser
const db = new PouchDB('accounts');

export default class ManageAccountsWindow extends Component {
  static propTypes = {
    showModal: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
  }
  state = {
    showAdd: false,
    showBank: false,
    showCredit: false
  }
  toggleAddAccount = () => {
    this.setState({showAdd: !this.state.showAdd});
  }
  closeWindow = () => {
    this.setState({showAdd: false, showBank: false, showCredit: false});
    this.props.close();
  }
  handleType = (event) => {
    if (event.target.value === 'creditcard') {
      this.setState({showCredit: true, showBank: false});
    } else if (event.target.value === 'bank') {
      this.setState({showBank: true, showCredit: false});
    } else {
      this.setState({showCredit: false, showBank: false});
    }
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
                {/* Add form validation. Don't allow 'select' value to be chosen */}
                <form>
                  <Input type="text" label="Name" placeholder="Enter a name for the account" />
                  <Input type="select" label="Type" placeholder="Type" onChange={this.handleType} >
                    <option value="select">select</option>
                    <option value="bank">Bank</option>
                    <option value="creditcard">Credit Card</option>
                  </Input>

                  <Collapse in={this.state.showBank}>
                    <div>
                      <Input type="text" label="Name of Institution" placeholder="Enter the name of the financial institution" />
                    </div>
                  </Collapse>
                  <Collapse in={this.state.showCredit}>
                    <div>
                      <Input type="select" label="Credit Card Company" placeholder="Credit Card Company">
                        <option value="select">select</option>
                        <option value="visa">Visa</option>
                        <option value="mc">Mastercard</option>
                        <option value="amex">American Express</option>
                        <option value="discover">Discover</option>
                        <option value="diners">Diners Club</option>
                      </Input>
                    </div>
                  </Collapse>

                  <ButtonInput bsStyle="primary" type="submit" value="Add" />
                </form>
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
