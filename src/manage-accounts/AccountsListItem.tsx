import React, { Component } from 'react';
import EditAccountFormContainer from './EditAccountFormContainer.jsx';
import { Collapse } from 'react-collapse';
import { Icon } from 'antd';

type Props = {
  account: Account
}

type State = {
  settingsVisible: boolean,
}

export interface Account {
  _id: string;
  _rev: string;
  company: string;
  name: string;
  type: string;
}

export default class AccountsListItem extends Component<Props, State> {
  state = {
    settingsVisible: false,
  };
  toggleSettings = () => {
    this.setState({ settingsVisible: !this.state.settingsVisible });
  };
  render() {
    let editAccountForm : string | JSX.Element = '';
    if (this.state.settingsVisible) {
      const formInitialValues = {
        initialValues: {
          accountCompany: this.props.account.company,
          accountName: this.props.account.name,
          accountType: this.props.account.type,
        },
      };
      // adding EditAccount form this way so that the component will mount and
      // unmount, resetting the form fields in doing so
      // also, this speeds up loading the modal because forms aren't initialized
      // for every account form on load. Only initializes when account is toggled
      editAccountForm = (
        <EditAccountFormContainer
          {...formInitialValues}
          account={this.props.account}
          toggleSettings={this.toggleSettings}
        />
      );
    }

    const accountTypeText =
      this.props.account.type === 'bank' ? 'Bank' : 'Credit Card';
    return (
      <div className="well" key={this.props.account._id}>
        <div
          className={
            (this.state.settingsVisible ? 'expanded' : '') +
            ' toggle-account-setting-icon float-right'
          }
        >
          <Icon type="setting" onClick={this.toggleSettings} />
        </div>
        <h4 className="account-name">{this.props.account.name}</h4>
        <p className="company-info">
          {`${accountTypeText} - ${this.props.account.company}`}
        </p>
        <Collapse isOpened={this.state.settingsVisible}>
          {editAccountForm}
        </Collapse>
      </div>
    );
  }
}
