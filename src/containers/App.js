import React, { PropTypes } from 'react';
import Sidebar from '../components/Sidebar';
import ManageAccountsWindow from '../components/ManageAccounts.js';

const App = ({ children }) => {
  return (
    <div className="row">
      <Sidebar />
      {children}
      <ManageAccountsWindow />
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
