import React, { PropTypes } from 'react';
import Sidebar from '../Sidebar.js';
import ManageAccountsContainer from '../manage-accounts/ManageAccountsContainer.js';

const App = ({ children }) => {
  return (
    <div className="row">
      <Sidebar />
      {children}
      <ManageAccountsContainer />
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
    </div>
  );
};
App.propTypes = { children: PropTypes.element.isRequired };

export default App;
