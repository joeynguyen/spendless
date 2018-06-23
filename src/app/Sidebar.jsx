import React from 'react';
import SidebarHeaderContainer from './SidebarHeaderContainer.jsx';
import AccountsGroupContainer from '../account/AccountsGroupContainer.jsx';

const Sidebar = () => {
  return (
    <React.Fragment>
      <SidebarHeaderContainer />
      <AccountsGroupContainer />
    </React.Fragment>
  );
};

export default Sidebar;
