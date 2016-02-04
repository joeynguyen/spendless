import React, { Component, PropTypes } from 'react';
import Sidebar from '../components/Sidebar';
import ManageAccountsWindow from '../components/ManageAccounts.js';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }
  state = {
    showModal: false,
  }
  close = () => {
    this.setState({ showModal: false });
  }
  open = () => {
    this.setState({ showModal: true });
  }
  render() {
    return (
      <div className="row">
        <Sidebar open={this.open} />
        {this.props.children}
        <ManageAccountsWindow showModal={this.state.showModal} close={this.close} />
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
      </div>
    );
  }
}
