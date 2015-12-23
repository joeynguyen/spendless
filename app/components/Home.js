import React, { Component } from 'react';
// import { Link } from 'react-router';
import CsvSubmit from './CsvSubmit.js';
import styles from './Home.module.css';

export default class Home extends Component {
    render() {
      return (
        <div>
          <div className={styles.container}>
            <h2 className={styles.header}>Giao</h2>
            <CsvSubmit />
            {/* <Link to="/counter">to Counter</Link> */}
          </div>
        </div>
      );
    }
}
