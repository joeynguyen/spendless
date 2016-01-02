import React, { Component } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import styles from './Sidebar.module.css';
import AccountGroup from './AccountGroup.js';

export default class Home extends Component {
  render() {
    const editTooltip = (<Tooltip>Edit</Tooltip>);
    return (
      <div id="sidebar" className={styles.sidebar + ' col-xs-3'}>
        <h3 className={styles['sidebar-header'] + ' clearfix'}>
          <span className="pull-left">Accounts</span>
          <span className="pull-right">
            <OverlayTrigger placement="top" overlay={editTooltip}>
              <i id="accounts-edit" className={styles['accounts-edit'] + ' fa fa-fw fa-edit'}></i>
            </OverlayTrigger>
          </span>
        </h3>
        <AccountGroup title="Banks" icon="bank" />
        <AccountGroup title="Credit Cards" icon="credit-card" />
      </div>
    );
  }
}
