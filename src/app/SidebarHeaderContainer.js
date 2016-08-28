import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as manageAccountsActions from '../manage-accounts/ManageAccountsActions.js';
import SidebarHeader from './SidebarHeader.js';

class SidebarHeaderContainer extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
  }
  render() {
    return (
      <SidebarHeader
        toggleManageAccounts={this.props.actions.toggleManageAccounts}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(manageAccountsActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(SidebarHeaderContainer);
