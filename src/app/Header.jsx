import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Menu } from 'antd';
import { Link } from 'react-router-dom';

const styles = {
  logo: {
    float: 'left',
    height: 60,
  },
  logoImg: {
    display: 'inline-block',
  },
  logoSpan: {
    WebkitFontSmoothing: 'antialiased',
    display: 'inline-block',
    // fontFamily: 'Pinyon Script',
    fontFamily: ['Dawning of a New Day', 'cursive'],
    fontSize: 28,
  },
  navbar: {
    marginTop: 10,
  },
};

const routeKeyMap = {
  '/': 'overview',
  '/help': 'help',
};

const Header = props => {
  return (
    <Row>
      <Col span={8}>
        <Link to="/" style={styles.logo}>
          <img
            alt="Piggy Bank Logo"
            src="../assets/piggybank.png"
            width="50px"
            style={styles.logoImg}
          />{' '}
          <span style={styles.logoSpan}>spendLess</span>
        </Link>
      </Col>
      <Col span={8} offset={8}>
        <Menu
          selectedKeys={[routeKeyMap[props.currentRoute]]}
          mode="horizontal"
          style={{ borderBottom: 'none' }}
        >
          <Menu.Item key="overview">
            <Link to="/">Overview</Link>
          </Menu.Item>
          <Menu.Item key="help">
            <Link to="/help">Help</Link>
          </Menu.Item>
        </Menu>
      </Col>
    </Row>
  );
};
Header.propTypes = {
  currentRoute: PropTypes.string.isRequired,
};

export default Header;
