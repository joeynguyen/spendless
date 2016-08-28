import React from 'react';
import styles from './Sidebar.module.css';
import SidebarHeaderContainer from './SidebarHeaderContainer.js';
import AccountsContainer from '../account/AccountsContainer.js';

const Sidebar = () => {
  return (
    <div className={styles.sidebar + ' col-xs-3 sidebar'}>
      <SidebarHeaderContainer />
      <AccountsContainer />
    </div>
  );
};

export default Sidebar;
