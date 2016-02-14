import React from 'react';
import Sidebar from './Sidebar.js';
import Overview from '../overview/Overview.js';
import ManageAccountsContainer from '../manage-accounts/ManageAccountsContainer.js';
// import styles from './Home.module.css';

const Home = () => {
  return (
    <div>
      <Sidebar />
      <Overview />
      <ManageAccountsContainer />
    </div>
  );
};

export default Home;
