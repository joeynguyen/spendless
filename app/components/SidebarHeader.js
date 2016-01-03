import React, { Component, PropTypes } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import styles from './Sidebar.module.css';

export default class SidebarHeader extends Component {
  static propTypes = {
    open: PropTypes.func.isRequired
  }
  openWindow = () => {
    this.props.open();
  }
  render() {
    const editTooltip = (<Tooltip id="edit-tooltip">Edit</Tooltip>);
    return (
      <h3 className={styles['sidebar-header'] + ' clearfix'}>
        <span className="pull-left">Accounts</span>
        <span className="pull-right">
          <OverlayTrigger placement="top" overlay={editTooltip}>
            <i id="accounts-edit" onClick={this.openWindow} className={styles['accounts-edit'] + ' fa fa-fw fa-edit'}></i>
          </OverlayTrigger>
        </span>
      </h3>
    );
  }
}
