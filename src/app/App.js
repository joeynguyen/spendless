import React, { PropTypes } from 'react';
import Header from './Header.js';
import Sidebar from './Sidebar.js';
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
