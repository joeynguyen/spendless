import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as manageAccountsActions from '../manage-accounts/ManageAccountsActions.js';
import { Button } from 'antd';

class SidebarHeaderContainer extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
  };
  render() {
    return (
      <Button
        style={{ borderRadius: 0, width: '100%' }}
        type="primary"
        icon="edit"
        size="large"
        onClick={this.props.actions.toggleManageAccounts}
      >
        Edit Accounts
      </Button>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(manageAccountsActions, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(SidebarHeaderContainer);
