import React, { Component } from 'react';
// import { Link } from 'react-router';
import FileUpload from './FileUpload.js';
import TransactionsList from './TransactionsList.js';
import styles from './Home.module.css';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className={styles.container}>
          <h2 className={styles.header}>Giao</h2>
          <FileUpload />
          <TransactionsList />
          {/* <Link to="/counter">to Counter</Link> */}
        </div>
      </div>
    );
  }
}
