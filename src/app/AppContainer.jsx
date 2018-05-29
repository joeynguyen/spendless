import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Layout, LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import AppHeader from './Header.jsx';
import AppSidebar from './Sidebar.jsx';
import ManageAccountsContainer from '../manage-accounts/ManageAccountsContainer.jsx';

import './App.css';

const { Header, Sider, Content } = Layout;

class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };
  static contextTypes = {
    router: PropTypes.object,
  };
  render() {
    return (
      <LocaleProvider locale={enUS}>
        <Layout style={{ height: '100%', width: '100%' }}>
          <Header
            style={{ background: '#fff', lineHeight: '70px', height: '70px' }}
          >
            <AppHeader
              currentRoute={this.context.router.route.location.pathname}
            />
          </Header>

          <Layout>
            <Sider collapsible style={{ background: '#333' }}>
              <AppSidebar />
            </Sider>
            <Content style={{ padding: 16 }}>{this.props.children}</Content>
          </Layout>

          <ManageAccountsContainer />
        </Layout>
      </LocaleProvider>
    );
  }
}

export default AppContainer;
