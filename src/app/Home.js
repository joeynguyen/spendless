import React, { PropTypes } from 'react';
import Sidebar from './Sidebar.js';
import ManageAccountsContainer from '../manage-accounts/ManageAccountsContainer.js';

const Home = ({ children }) => {
  return (
    <div className="row">
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
Home.propTypes = { children: PropTypes.element.isRequired };

export default Home;
