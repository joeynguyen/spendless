import React, { Component } from 'react';
import { Button, Collapse } from 'antd';
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
    const toggleFormButton = (
      <Button
        type={addButton.style}
        icon={addButton.icon}
        size="large"
        onClick={this.toggleAddAccount}
      >{addButton.text}</Button>
    );
    const accountForm = this.state.addAccountVisible ? <AddAccountFormContainer visible={this.state.addAccountVisible} /> : null;
    return (
      <Collapse bordered={false} className="add-account-form">
        <Collapse.Panel header={toggleFormButton} key="1">
          {accountForm}
        </Collapse.Panel>
      </Collapse>
    );
  }
}
