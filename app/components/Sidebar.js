import React, { Component } from 'react';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import styles from './Sidebar.module.css';

export default class Home extends Component {
  render() {
    return (
      <div id="sidebar" className={styles.sidebar + ' col-xs-3'}>
        <Panel collapsible defaultExpanded header="Panel heading">
          Some default panel content here.
          <ListGroup fill>
            <ListGroupItem>Item 1</ListGroupItem>
            <ListGroupItem>Item 2</ListGroupItem>
            <ListGroupItem>&hellip;</ListGroupItem>
          </ListGroup>
          Some more panel content here.
        </Panel>
      </div>
    );
  }
}
