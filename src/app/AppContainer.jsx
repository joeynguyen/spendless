import PropTypes from 'prop-types';
import React, { Component } from 'react';
import App from './App.jsx';

class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }
  render() {
    return (
      <App children={this.props.children} />
    );
  }
}

export default AppContainer;
