import React, { Component, PropTypes } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleManageAccounts } from '../manage-accounts/ManageAccountsActions.js';
import styles from './Sidebar.module.css';

class SidebarHeader extends Component {
  static propTypes = {
    doToggleManageAccounts: PropTypes.func.isRequired
  }
  render() {
    const editTooltip = (<Tooltip id="edit-tooltip">Edit</Tooltip>);
    return (
      <h3 className={styles['sidebar-header'] + ' clearfix'}>
        <span className="pull-left">Accounts</span>
        <span className="pull-right">
          <OverlayTrigger placement="top" overlay={editTooltip}>
            <i
              id="accounts-edit"
              onClick={() => this.props.doToggleManageAccounts()}
              className={styles['accounts-edit'] + ' fa fa-fw fa-edit'}>
            </i>
          </OverlayTrigger>
        </span>
      </h3>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ doToggleManageAccounts: toggleManageAccounts }, dispatch);
}

export default connect(null, mapDispatchToProps)(SidebarHeader);
