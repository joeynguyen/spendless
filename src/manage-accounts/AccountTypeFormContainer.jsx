import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as accountsActions from '../account/AccountsActions.js';
import AccountTypeForm from './AccountTypeForm';

export class AccountTypeFormContainer extends Component {
  static defaultProps = {
    accountType: 'bank',
  };

  static propTypes = {
    accountType: PropTypes.string,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <AccountTypeForm
        saveAccount={this.props.actions.saveAccount}
        accountType={this.props.accountType}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(accountsActions, dispatch),
  };
}

export default connect(
  null,
  mapDispatchToProps
)(AccountTypeFormContainer);
