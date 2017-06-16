import PropTypes from 'prop-types';
import React, { Component } from 'react';
import EditAccountFormContainer from './EditAccountFormContainer.jsx';
import { Animate, Box } from 'grommet';

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
        margin={{vertical: 'medium'}}
        pad="small"
      >
        <div className={(this.state.settingsVisible ? 'expanded' : '') + ' toggle-account-setting-icon'}>
          <i className="fa fa-lg fa-lg fa-fw fa-cog pull-right" onClick={this.toggleSettings} ></i>
        </div>
        <h4 className="account-name">{this.props.account.name}</h4>
        <p className="company-info">{this.props.account.type === 'bank' ? 'Bank' : 'Credit Card'} - {this.props.account.company}</p>
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
