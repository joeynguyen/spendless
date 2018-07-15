import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Layout, LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import HeaderContainer from './HeaderContainer.jsx';
import Sidebar from './Sidebar.jsx';
import ManageAccountsContainer from '../manage-accounts/ManageAccountsContainer.jsx';

import './App.css';

const headerStyle = {
  background: '#fff',
  height: '70px',
  lineHeight: '70px',
};

class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };
  render() {
    return (
      <LocaleProvider locale={enUS}>
        <Layout style={{ height: '100%', width: '100%' }}>
          <Layout.Header style={headerStyle}>
            <HeaderContainer />
          </Layout.Header>

          <Layout>
            <Layout.Sider collapsible style={{ background: '#333' }}>
              <Sidebar />
            </Layout.Sider>
            <Layout.Content style={{ padding: 16 }}>
              {this.props.children}
            </Layout.Content>
          </Layout>

          <ManageAccountsContainer />
        </Layout>
      </LocaleProvider>
    );
  }
}

export default AppContainer;
