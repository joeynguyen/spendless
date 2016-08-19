import React, { Component, PropTypes } from 'react';
import App from './App.js';

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
