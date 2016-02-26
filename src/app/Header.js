import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';


const styles = {
  logo: {
    height: 80,
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
    marginTop: 15
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
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav bsStyle="pills" style={styles.navbar} pullRight>
          <IndexLinkContainer to="/">
            <NavItem>Overview</NavItem>
          </IndexLinkContainer>
          <LinkContainer to="/placeholder">
            <NavItem>Placeholder</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
