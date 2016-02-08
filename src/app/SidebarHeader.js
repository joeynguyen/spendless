import React, { Component, PropTypes } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import IconButton from 'material-ui/lib/icon-button';
import EditIcon from 'material-ui/lib/svg-icons/image/edit.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleManageAccounts } from '../manage-accounts/ManageAccountsActions.js';
import styles from './Sidebar.module.css';

const materialStyles = {
  iconButton: {
    padding: 0,
    width: 36,
    height: 36
  },
  tooltip: {
    left: 2
  }
};

class SidebarHeader extends Component {
  static propTypes = {
    doToggleManageAccounts: PropTypes.func.isRequired
  }
  render() {
    return (
      <h3 className={styles['sidebar-header'] + ' clearfix'}>
        <span className={styles['header-text'] + ' pull-left'}>Accounts</span>
        <span className="pull-right">
          <IconButton
            onClick={() => this.props.doToggleManageAccounts(true)}
            style={materialStyles.iconButton}
            tooltip="Edit"
            tooltipPosition="top-center"
            tooltipStyles={materialStyles.tooltip}
          >
            <EditIcon />
          </IconButton>
        </span>
      </h3>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ doToggleManageAccounts: toggleManageAccounts }, dispatch);
}

export default connect(null, mapDispatchToProps)(SidebarHeader);
