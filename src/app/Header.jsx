import React from 'react';
import { Col, Row, Menu } from 'antd';
import { Link } from 'react-router-dom';

const styles = {
  logo: {
    height: 60,
    float: 'left',
  },
  logoImg: {
    display: 'inline-block'
  },
  logoSpan: {
    display: 'inline-block',
    // fontFamily: 'Pinyon Script',
    fontFamily: ['Dawning of a New Day', 'cursive'],
    fontSize: 28,
    WebkitFontSmoothing: 'antialiased',
  },
  navbar: {
    marginTop: 10
  }
};

const Header = () => {
  return (
    <Row>
      <Col span={8}>
        <Link to="/" style={styles.logo}>
          <img src="../assets/piggybank.png" width="50px" style={styles.logoImg}/>
          {' '}
          <span style={styles.logoSpan}>spendLess</span>
        </Link>
      </Col>
      <Col span={8} offset={8}>
        <Menu mode="horizontal" theme="dark">
          <Menu.Item><Link to="/">Overview</Link></Menu.Item>
          <Menu.Item><Link to="/help">Help</Link></Menu.Item>
        </Menu>
      </Col>
    </Row>
  );
};

export default Header;
