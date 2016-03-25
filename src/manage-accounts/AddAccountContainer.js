import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';
import AddAccountForm from './AddAccountForm';

export default class AddAccountContainer extends Component {
  state = {
    addAccountVisible: false,
  }
  addButtonClick = () => {
    this.setState({ addAccountVisible: !this.state.addAccountVisible });
  }
  render() {
    let accountForm;
    let addButton = { style: 'primary', class: 'fa fa-plus', text: ' Add Account' };
    if (this.state.addAccountVisible) {
      addButton = { style: 'danger', class: '', text: 'Cancel' };
      // adding AddAccountForm this way so that the component will mount and
      // unmount, resetting the form fields in doing so
      accountForm = <AddAccountForm />;
    }
    return (
      <div>
        <Button onClick={this.addButtonClick} bsStyle={addButton.style} bsSize="large" block>
          <i className={addButton.class}></i>
          {addButton.text}
        </Button>
        <Panel collapsible expanded={this.state.addAccountVisible}>
          { accountForm }
        </Panel>
      </div>
    );
  }
}

