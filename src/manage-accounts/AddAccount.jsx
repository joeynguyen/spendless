import React, { Component } from 'react';
import { Collapse } from 'react-collapse';
import { Button } from 'antd';
import AddAccountFormContainer from './AddAccountFormContainer.jsx';

export default class AddAccount extends Component {
  state = {
    addAccountVisible: false,
  }
  toggleAddAccount = () => {
    this.setState({ addAccountVisible: !this.state.addAccountVisible });
  }
  render() {
    let addButton = { style: 'primary', icon: 'plus', text: ' Add Account' };
    if (this.state.addAccountVisible) {
      addButton = { style: 'danger', icon: '', text: 'Cancel' };
    }
    return (
      <div style={{marginBottom: '15px'}}>
        <Button
          type={addButton.style}
          icon={addButton.icon}
          size="large"
          onClick={this.toggleAddAccount}
        >{addButton.text}</Button>
        <Collapse isOpened={this.state.addAccountVisible}>
          <AddAccountFormContainer
            toggleAddAccount={this.toggleAddAccount}
            visible={this.state.addAccountVisible} />
        </Collapse>
      </div>
    );
  }
}
