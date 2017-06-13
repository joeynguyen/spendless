import PropTypes from 'prop-types';
import React from 'react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import ManageAccountsContainer from '../manage-accounts/ManageAccountsContainer.jsx';
// import 'grommet/scss/aruba/index.scss';
// import 'grommet/scss/hpe/index.scss';
// import 'grommet/scss/hpinc/index.scss';
import 'grommet/scss/vanilla/index.scss';

const App = ({ children }) => {
  return (
    <div className="row">
      <Header />
      <Sidebar />
      {children}
      <ManageAccountsContainer />
    </div>
  );
};
App.propTypes = { children: PropTypes.element.isRequired };

export default App;
