import React, { Component } from 'react';
// import { Link } from 'react-router';
import FileUpload from './FileUpload.js';
import TransactionsTable from './TransactionsTable.js';
import styles from './Home.module.css';

export default class Home extends Component {
    render() {
      return (
        <div>
          <div className={styles.container}>
            <h2 className={styles.header}>Giao</h2>
            <CsvParser />
            <TransactionsTable />
            {/* <Link to="/counter">to Counter</Link> */}
          </div>
        </div>
      );
    }
}
