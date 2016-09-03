import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';
import AddAccountFormContainer from './AddAccountFormContainer.js';

export default class AddAccountContainer extends Component {
  state = {
    addAccountVisible: false,
  }
  toggleAddAccount = () => {
    this.setState({ addAccountVisible: !this.state.addAccountVisible });
  }
  render() {
    let addButton = { style: 'primary', class: 'fa fa-plus', text: ' Add Account' };
    if (this.state.addAccountVisible) {
      addButton = { style: 'danger', class: '', text: 'Cancel' };
    }
    return (
      <div>
        <Button onClick={this.toggleAddAccount} bsStyle={addButton.style} bsSize="large" block>
          <i className={addButton.class}></i>
          {addButton.text}
        </Button>
        <Panel collapsible expanded={this.state.addAccountVisible}>
          <AddAccountFormContainer visible={this.state.addAccountVisible} />
        </Panel>
      </div>
    );
  }
}

