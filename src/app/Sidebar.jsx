import React from 'react';
import styles from './Sidebar.module.css';
import SidebarHeaderContainer from './SidebarHeaderContainer.jsx';
import AccountsGroupContainer from '../account/AccountsGroupContainer.jsx';

const Sidebar = () => {
  return (
    <div className={styles.sidebar + ' sidebar'}>
      <SidebarHeaderContainer />
      <AccountsGroupContainer />
    </div>
  );
};

export default Sidebar;
