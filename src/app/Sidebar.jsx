import React from 'react';
import { Sidebar as GrommetSidebar  } from 'grommet';

import styles from './Sidebar.module.css';
import SidebarHeaderContainer from './SidebarHeaderContainer.jsx';
import AccountsGroupContainer from '../account/AccountsGroupContainer.jsx';

const Sidebar = () => {
  return (
    <GrommetSidebar size="small" colorIndex="light-2" pad="small">
      <div className={styles.sidebar}>
        <SidebarHeaderContainer />
        <AccountsGroupContainer />
      </div>
    </GrommetSidebar>
  );
};

export default Sidebar;
