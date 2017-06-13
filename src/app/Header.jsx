import React from 'react';
import { Link } from 'react-router-dom';
import { Anchor, Box, Header as GrommetHeader, Menu  } from 'grommet';

const styles = {
  logoSpan: {
    fontFamily: ['Dawning of a New Day', 'cursive'],
    fontSize: 28,
    WebkitFontSmoothing: 'antialiased',
  }
};

const Header = () => {
  return (
    <Box pad="small" colorIndex="neutral-1">
      <GrommetHeader>
        <Link to="/">
          <img src="../assets/piggybank.png" width="50px"/>
          {' '}
          <span style={styles.logoSpan}>spendLess</span>
        </Link>
        <Box flex justify="center" direction="row" responsive={false}>
          <Menu responsive inline direction="row" size="large">
            <Anchor path="/" className="active">Overview</Anchor>
            <Anchor path="/help">Help</Anchor>
          </Menu>
        </Box>
      </GrommetHeader>
    </Box>
  );
};

export default Header;
