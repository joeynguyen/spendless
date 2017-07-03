import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Layout } from 'antd';
import AppHeader  from './Header.jsx';
import AppSidebar from './Sidebar.jsx';
import ManageAccountsContainer from '../manage-accounts/ManageAccountsContainer.jsx';

const { Header, Sider, Content } = Layout;

class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }
  render() {
    return (
      <Layout>
        <Header>
          <AppHeader />
        </Header>

        <Layout>
          <Sider>
            <AppSidebar />
          </Sider>
          <Content>
            {this.props.children}
          </Content>
        </Layout>

        <ManageAccountsContainer />
      </Layout>
    );
  }
}

export default AppContainer;
