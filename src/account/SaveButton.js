import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
import { saveUploadedTransactions } from '../account/TransactionsActions.js';

class SaveButton extends Component {
  static propTypes = {
    uploadedTransactions: PropTypes.arrayOf(React.PropTypes.object),
    doSaveUploadedTransactions: PropTypes.func.isRequired,
  }
  render() {
    return (
      <Button
        onClick={() => this.props.doSaveUploadedTransactions(this.props.uploadedTransactions)}
        bsStyle="primary"
        bsSize="small"
      >
        Save
      </Button>
    );
  }
}

function mapStateToProps(state) {
  return {
    uploadedTransactions: state.uploadedTransactions,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ doSaveUploadedTransactions: saveUploadedTransactions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveButton);
