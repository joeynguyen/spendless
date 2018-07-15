import React from 'react';
import PropTypes from 'prop-types';
import { Col, DatePicker, Menu, Row } from 'antd';
import { Link } from 'react-router-dom';

import { MONTH_PICKER_FORMAT, MONTH_STORED_FORMAT } from '../constants.js';

const { MonthPicker } = DatePicker;
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

const Header = ({ activeMonth, currentRoute, selectActiveMonth }) => {
  function onMonthChange(date) {
    selectActiveMonth(date.format(MONTH_STORED_FORMAT));
  }

  return (
    <Row>
      <Col span={8}>
        <Link to="/" style={styles.logo}>
          <img
            alt="Piggy Bank Logo"
            src="./assets/piggybank.png"
            width="50px"
            style={styles.logoImg}
          />{' '}
          <span style={styles.logoSpan}>spendLess</span>
        </Link>
      </Col>
      <Col span={8} offset={4}>
        <Menu
          selectedKeys={[routeKeyMap[currentRoute]]}
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
      <Col span={4}>
        <MonthPicker
          value={activeMonth}
          format={MONTH_PICKER_FORMAT}
          onChange={onMonthChange}
          size="large"
        />
      </Col>
    </Row>
  );
};
Header.propTypes = {
  // MonthPicker `value` prop expects a moment object
  activeMonth: PropTypes.object.isRequired,
  currentRoute: PropTypes.string.isRequired,
  selectActiveMonth: PropTypes.func.isRequired,
};

export default Header;
