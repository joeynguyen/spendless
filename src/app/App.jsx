import PropTypes from 'prop-types';
import React from 'react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import ManageAccountsContainer from '../manage-accounts/ManageAccountsContainer.jsx';
import { App as GrommetApp, Box, Split } from 'grommet';
// import 'grommet/scss/aruba/index.scss';
// import 'grommet/scss/hpe/index.scss';
// import 'grommet/scss/hpinc/index.scss';
import 'grommet/scss/vanilla/index.scss';

const App = ({ children }) => {
  return (
    <GrommetApp centered={false}>
      <Header />
      <Split flex="right" priority="right" showOnResponsive="priority">
        <Sidebar />
        <Box pad={{horizontal: 'large', vertical: 'medium'}}>
          {children}
        </Box>
      </Split>
      <ManageAccountsContainer />
    </GrommetApp>
  );
};
App.propTypes = { children: PropTypes.element.isRequired };

export default App;
