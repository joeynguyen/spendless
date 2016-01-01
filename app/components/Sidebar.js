import React, { Component } from 'react';
import styles from './Sidebar.module.css';

export default class Home extends Component {
  render() {
    return (
      <div id="sidebar" className={styles.sidebar + ' small-3 columns sidebar'}>
      </div>
    );
  }
}
