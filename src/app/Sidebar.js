import React from 'react';
import styles from './Sidebar.module.css';
import SidebarHeader from './SidebarHeader.js';
import AccountsContainer from '../account/AccountsContainer.js';

const Sidebar = () => {
  return (
    <div id="sidebar" className={styles.sidebar + ' col-xs-3 sidebar'}>
      <SidebarHeader />
      <AccountsContainer />
    </div>
  );
};

export default Sidebar;
