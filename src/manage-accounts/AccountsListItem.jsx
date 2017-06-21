import PropTypes from 'prop-types';
import React, { Component } from 'react';
import EditAccountFormContainer from './EditAccountFormContainer.jsx';
import { Animate, Box, Button, SettingsOptionIcon } from 'grommet';

export default class AccountsListItem extends Component {
  static propTypes = {
    account: PropTypes.object.isRequired,
  }
  state = {
    settingsVisible: false,
  }
  toggleSettings = () => {
    this.setState({ settingsVisible: !this.state.settingsVisible });
  }
  render() {
    let editAccountForm = '';
    if (this.state.settingsVisible) {
      const formInitialValues = {
        initialValues: {
          accountName: this.props.account.name,
          accountType: this.props.account.type,
          accountCompany: this.props.account.company,
        }
      };
      // adding EditAccount form this way so that the component will mount and
      // unmount, resetting the form fields in doing so
      // also, this speeds up loading the modal because redux-form isn't initialized
      // for every account form on load. Only initializes when account is toggled
      editAccountForm = (
        <EditAccountFormContainer
          {...formInitialValues}
          account={this.props.account}
          formKey={this.props.account._id}
          toggleSettings={this.toggleSettings}
        />
      );
    }

    return (
      <Box
        colorIndex="accent-2-a"
        key={this.props.account._id}
        pad="small"
        className="account-list-item-container"
      >
        <Box alignSelf="end" pad="none">
          <Button icon={<SettingsOptionIcon />} onClick={this.toggleSettings} />
        </Box>
        <h4 className="account-name">{this.props.account.name}</h4>
        <h5 className="company-info">{this.props.account.type === 'bank' ? 'Bank' : 'Credit Card'} - {this.props.account.company}</h5>
        <Animate
          enter={{animation: 'slide-down', duration: 300, delay: 0}}
          visible={this.state.settingsVisible}
        >
          { editAccountForm }
        </Animate>
      </Box>
    );
  }
}
