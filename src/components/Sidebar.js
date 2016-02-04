import React, { PropTypes } from 'react';
import styles from './Sidebar.module.css';
import SidebarHeader from './SidebarHeader.js';
import AccountsContainer from '../account/AccountsContainer.js';

const Sidebar = ({ open }) => {
  return (
    <div id="sidebar" className={styles.sidebar + ' col-xs-3 sidebar'}>
      <SidebarHeader open={open} />
      <AccountsContainer />
    </div>
  );
};
Sidebar.propTypes = { open: PropTypes.func.isRequired };

export default Sidebar;
