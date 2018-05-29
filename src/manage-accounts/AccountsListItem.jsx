import PropTypes from 'prop-types';
import React, { Component } from 'react';
import EditAccountFormContainer from './EditAccountFormContainer.jsx';
import { Collapse } from 'react-collapse';
import { Icon } from 'antd';

export default class AccountsListItem extends Component {
  static propTypes = {
    account: PropTypes.object.isRequired,
  };
  state = {
    settingsVisible: false,
  };
  toggleSettings = () => {
    this.setState({ settingsVisible: !this.state.settingsVisible });
  };
  render() {
    let editAccountForm = '';
    if (this.state.settingsVisible) {
      const formInitialValues = {
        initialValues: {
          accountName: this.props.account.name,
          accountType: this.props.account.type,
          accountCompany: this.props.account.company,
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
          {this.props.account.type === 'bank' ? 'Bank' : 'Credit Card'} -{' '}
          {this.props.account.company}
        </p>
        <Collapse isOpened={this.state.settingsVisible}>
          <div>{editAccountForm}</div>
        </Collapse>
      </div>
    );
  }
}
