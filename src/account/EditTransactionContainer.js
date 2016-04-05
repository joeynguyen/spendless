import React, { Component, PropTypes } from 'react';
// import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EditTransaction from './EditTransaction.js';
import { toggleEditTransaction } from './TransactionsActions.js';

class EditTransactionContainer extends Component {
  static propTypes = {
    activeTransaction: PropTypes.object,
    editTransactionVisible: PropTypes.bool.isRequired,
    doToggleEditTransaction: PropTypes.func.isRequired,
  }
  render() {
    return (
      <EditTransaction {...this.props} />
    );
  }
}


function mapStateToProps(state) {
  return {
    editTransactionVisible: state.editTransactionVisible,
    activeTransaction: state.activeTransaction,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    doToggleEditTransaction: toggleEditTransaction,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTransactionContainer);
// export default reduxForm(
//   {
//     form: 'EditTransaction',
//     fields: ['date', 'description', 'category', 'amount'],
//   },
// )(EditTransactionContainer);
