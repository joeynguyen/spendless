import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';

const styles = {
  logo: {
    height: 70,
    paddingTop: 10,
    paddingBottom: 10,
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
    <Navbar fluid>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/" style={styles.logo}>
            <img src="../assets/piggybank.png" width="50px" style={styles.logoImg}/>
            {' '}
            <span style={styles.logoSpan}>spendLess</span>
          </Link>
          <Link to="/help" style={styles.logo}>
            <span>help page</span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav bsStyle="pills" style={styles.navbar} pullRight>
          <Link to="/">
            <NavItem>Overview</NavItem>
          </Link>
          <Link to="/help">
            <NavItem>Help</NavItem>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
