import React from 'react';
import { Link } from 'react-router-dom';
import { Anchor, Box, Header as GrommetHeader, Menu, Title  } from 'grommet';

const styles = {
  logoAnchor: {
    textDecoration: 'none',
  },
  logoSpan: {
    fontFamily: ['Dawning of a New Day', 'cursive'],
    fontSize: 28,
    WebkitFontSmoothing: 'antialiased',
  }
};

const Header = () => {
  return (
    <GrommetHeader colorIndex="neutral-1" pad="small" justify="between">
      <Title>
        <Link to="/" style={styles.logoAnchor}>
          <img src="../assets/piggybank.png" width="50px"/>
          {' '}
          <span style={styles.logoSpan}>spendLess</span>
        </Link>
      </Title>
      <Box align="center" direction="row">
        <Menu direction="row" size="large" dropAlign={{right: 'right'}}>
          <Anchor path="/" className="active">Overview</Anchor>
          <Anchor path="/help">Help</Anchor>
        </Menu>
      </Box>
    </GrommetHeader>
  );
};

export default Header;
