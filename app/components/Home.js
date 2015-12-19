import React, { Component } from 'react';
// import { Link } from 'react-router';
import styles from './Home.module.css';

export default class Home extends Component {
    render() {
      return (
        <div>
          <div className={styles.container}>
            <h2 className={styles.header}>Giao</h2>
            {/* <Link to="/counter">to Counter</Link> */}
          </div>
        </div>
      );
    }
}
