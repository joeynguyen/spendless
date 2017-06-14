import React from 'react';
import { Sidebar as GrommetSidebar  } from 'grommet';

import SidebarHeaderContainer from './SidebarHeaderContainer.jsx';
import AccountsGroupContainer from '../account/AccountsGroupContainer.jsx';

const Sidebar = () => {
  return (
    <GrommetSidebar
      size="small"
      colorIndex="light-2"
      pad={{horizontal: 'small', vertical: 'medium'}}
     >
      <SidebarHeaderContainer />
      <AccountsGroupContainer />
    </GrommetSidebar>
  );
};

export default Sidebar;
