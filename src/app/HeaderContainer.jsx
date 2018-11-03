import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import { selectActiveMonth } from './AppActions.js';
import {
  getAccountTransactions,
  resetAccountTransactions,
} from '../account/TransactionsActions.js';
import { MONTH_STORED_FORMAT } from '../constants.js';
import Header from './Header';

class HeaderContainer extends Component {
  static propTypes = {
    activeAccountId: PropTypes.string,
    activeMonth: PropTypes.string,
    selectActiveMonth: PropTypes.func.isRequired,
  };

  static contextTypes = {
    router: PropTypes.object,
  };

  constructor() {
    super();

    this.currentMonthAsMoment = moment().startOf('month');
  }

  componentDidMount() {
    if (!this.props.activeMonth) {
      // on initial app load, the activeMonth will not yet have
      // been selected, so we set it in redux to the current month
      // convert to MONTH_STORED_FORMAT ex: '2018-07'
      // so that we can have a readable string to save to database
      const currentMonth = this.currentMonthAsMoment.format(
        MONTH_STORED_FORMAT
      );
      this.props.selectActiveMonth(currentMonth);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeMonth !== prevProps.activeMonth) {
      this.props.resetAccountTransactions();
      this.props.getAccountTransactions(
        this.props.activeAccountId,
        this.props.activeMonth
      );
    }
  }

  render() {
    const activeMonthAsMoment = this.props.activeMonth
      ? moment(this.props.activeMonth)
      : this.currentMonthAsMoment;

    return (
      <Header
        activeMonthObj={activeMonthAsMoment}
        selectActiveMonth={this.props.selectActiveMonth}
        currentRoute={this.context.router.route.location.pathname}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    activeAccountId: state.activeAccountId,
    activeMonth: state.activeMonth,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getAccountTransactions: getAccountTransactions,
      resetAccountTransactions: resetAccountTransactions,
      selectActiveMonth: selectActiveMonth,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderContainer);
