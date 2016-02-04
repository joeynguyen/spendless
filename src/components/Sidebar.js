import React, { Component } from 'react';
import styles from './Sidebar.module.css';
import SidebarHeader from './SidebarHeader.js';
import ManageAccountsWindow from './ManageAccounts.js';
import AccountContainer from '../account/AccountContainer.js';

// PouchDB is loaded externally through a script tag in the browser
// const db = new PouchDB('accounts');

export default class Sidebar extends Component {
  state = {
    showModal: false,
  }
  close = () => {
    this.setState({ showModal: false });
  }
  open = () => {
    this.setState({ showModal: true });
  }
  render() {
    return (
      <div id="sidebar" className={styles.sidebar + ' col-xs-3 sidebar'}>
        <SidebarHeader open={this.open} />
        <AccountContainer />
        <ManageAccountsWindow showModal={this.state.showModal} close={this.close} />
      </div>
    );
  }
}

