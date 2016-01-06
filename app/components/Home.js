import React, { Component } from 'react';
// import styles from './Home.module.css';
import { Link } from 'react-router';

// PouchDB is loaded externally through a script tag in the browser

export default class Home extends Component {
  render() {
    return (
      <div className="col-xs-9">
        <div className="header">
          <h3>Home page</h3>
          <Link to="account/ladskjfsjk">Account Page</Link>
        </div>
      </div>
    );
  }
}
