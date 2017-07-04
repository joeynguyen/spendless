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
      <Layout style={{'height': '100%', 'width': '100%'}}>
        <Header style={{ background: '#fff', lineHeight: '70px', height: '70px' }}>
          <AppHeader />
        </Header>

        <Layout>
          <Sider style={{ background: '#333' }}>
            <AppSidebar />
          </Sider>
          <Content style={{ background: '#fff', padding: 16 }}>
            {this.props.children}
          </Content>
        </Layout>

        <ManageAccountsContainer />
      </Layout>
    );
  }
}

export default AppContainer;
