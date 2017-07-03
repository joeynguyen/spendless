import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import ManageAccountsContainer from '../manage-accounts/ManageAccountsContainer.jsx';

class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }
  render() {
    return (
      <div className="row">
        <Header />
        <Sidebar />
        {this.props.children}
        <ManageAccountsContainer />
      </div>
    );
  }
}

export default AppContainer;
