import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import { selectActiveMonth } from './AppActions.js';
import { MONTH_STORED_FORMAT } from '../constants.js';
import Header from './Header';

class HeaderContainer extends Component {
  static propTypes = {
    activeMonth: PropTypes.object.isRequired,
    selectActiveMonth: PropTypes.func.isRequired,
  };
  static contextTypes = {
    router: PropTypes.object,
  };
  render() {
    return (
      <Header
        activeMonth={this.props.activeMonth}
        selectActiveMonth={this.props.selectActiveMonth}
        currentRoute={this.context.router.route.location.pathname}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    activeMonth: state.activeMonth
      ? moment(state.activeMonth, MONTH_STORED_FORMAT)
      : moment().startOf('month'),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectActiveMonth: selectActiveMonth,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderContainer);
