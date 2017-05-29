import PropTypes from 'prop-types';
import React from 'react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import ManageAccountsContainer from '../manage-accounts/ManageAccountsContainer.jsx';

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
