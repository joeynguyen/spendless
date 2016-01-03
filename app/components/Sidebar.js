import React, { Component } from 'react';
import styles from './Sidebar.module.css';
import SidebarHeader from './SidebarHeader.js';
import AccountGroup from './AccountGroup.js';
import ManageAccountsWindow from './ManageAccounts.js';

export default class Home extends Component {
  state = {
    showModal: false
  }
  close = () => {
    this.setState({ showModal: false });
  }
  open = () => {
    this.setState({ showModal: true });
  }
  render() {
    return (
      <div id="sidebar" className={styles.sidebar + ' col-xs-3'}>
        <SidebarHeader open={this.open} />
        <AccountGroup title="Banks" icon="bank" />
        <AccountGroup title="Credit Cards" icon="credit-card" />
        <ManageAccountsWindow showModal={this.state.showModal} close={this.close} />
      </div>
    );
  }
}
