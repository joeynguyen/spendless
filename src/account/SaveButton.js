import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
import { saveUploadedTransactions, resetUploadedTransactions } from '../account/TransactionsActions.js';

// PouchDB is loaded externally through a script tag in the browser
const transDB = new PouchDB('transactions');

// transDB.info().then(function(info) {
//   console.log('transDB info: ', info);
// });

class SaveButton extends Component {
  static propTypes = {
    uploadedTransactions: PropTypes.arrayOf(React.PropTypes.object),
    doSaveUploadedTransactions: PropTypes.func.isRequired,
    doResetUploadedTransactions: PropTypes.func.isRequired,
  }
  // Save transactions uploaded from CSV to database
  handleSave = () => {
    const self = this;
    console.log('Trying to submit...');
    console.log(this.props.uploadedTransactions);
    this.props.uploadedTransactions.forEach(function(transaction) {
      console.log(transaction);
      transDB.put(transaction).then(function(result) {
        console.log('Successfully posted transactions');
        console.log(result);
        self.props.doSaveUploadedTransactions(transaction);
      }).catch(function(err) {
        console.log(err);
      });
    });
    this.props.doResetUploadedTransactions();
  }
  render() {
    return (
      <Button
        onClick={this.handleSave}
        bsStyle="primary"
        bsSize="small"
        disabled={(this.props.uploadedTransactions.length === 0)}
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
  return bindActionCreators({
    doSaveUploadedTransactions: saveUploadedTransactions,
    doResetUploadedTransactions: resetUploadedTransactions
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveButton);
