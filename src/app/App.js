import React, { PropTypes } from 'react';
import Header from './Header.js';
import Sidebar from './Sidebar.js';
import ManageAccountsContainer from '../manage-accounts/ManageAccountsContainer.js';

const App = ({ children }) => {
  return (
    <div className="row">
      <Header />
      <Sidebar />
      {children}
      {
      /*
        (() => {
          if (process.env.NODE_ENV !== 'production') {
            const DevTools = require('./DevTools');
            return <DevTools />;
          }
        })()
      */
      }
      <ManageAccountsContainer />
    </div>
  );
};
App.propTypes = { children: PropTypes.element.isRequired };

export default App;
