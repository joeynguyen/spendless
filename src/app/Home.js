import React from 'react';
import Sidebar from './Sidebar.js';
import AccountDetail from '../account/AccountDetail.js';
import ManageAccountsContainer from '../manage-accounts/ManageAccountsContainer.js';
// import styles from './Home.module.css';

const Home = () => {
  return (
    <div>
      <Sidebar />
      <AccountDetail />
      <ManageAccountsContainer />
    </div>
  );
};

export default Home;
