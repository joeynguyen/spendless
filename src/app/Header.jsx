import React from 'react';
import { Link } from 'react-router-dom';
import { Anchor, Box, Header, Menu  } from 'grommet';

const styles = {
  logo: {
    height: 70,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  logoImg: {
    display: 'inline-block'
  },
  logoSpan: {
    display: 'inline-block',
    fontFamily: ['Dawning of a New Day', 'cursive'],
    fontSize: 28,
    WebkitFontSmoothing: 'antialiased',
  }
};

const AppHeader = () => {
  return (
    <Box pad="small" colorIndex="neutral-1">
      <Header>
        <Link to="/" style={styles.logo}>
          <img src="../assets/piggybank.png" width="50px" style={styles.logoImg}/>
          {' '}
          <span style={styles.logoSpan}>spendLess</span>
        </Link>
        <Box flex justify="center" direction="row" responsive={false}>
          <Menu responsive inline direction="row" size="large">
            <Anchor path="/" className="active">Overview</Anchor>
            <Anchor path="/help">Help</Anchor>
          </Menu>
        </Box>
      </Header>
    </Box>
  );
};

export default AppHeader;
