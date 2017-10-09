import React from 'react';
import SidebarHeaderContainer from './SidebarHeaderContainer.jsx';
import AccountsGroupContainer from '../account/AccountsGroupContainer.jsx';

const Sidebar = () => {
  return (
    <div>
      <SidebarHeaderContainer />
      <AccountsGroupContainer />
    </div>
  );
};

export default Sidebar;
