import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import parseCSV from '../utils/csvParser.js';
import { addUploadedTransactions } from './TransactionsActions.js';

class FileUpload extends Component {
  static propTypes = {
    activeAccount: PropTypes.object,
    doAddUploadedTransactions: PropTypes.func.isRequired,
  }
  handleFile = () => {
    // using a ref String attribute is a legacy approach ??
    // https://facebook.github.io/react/docs/more-about-refs.html#the-ref-string-attribute
    // using findDOMNode is discouraged
    // https://facebook.github.io/react/docs/top-level-api.html#reactdom.finddomnode
    const selectedFile = ReactDOM.findDOMNode(this.refs.csv).files[0];
    const newTransactions = parseCSV(selectedFile, this.props.activeAccount._id);
    newTransactions.then(val => this.props.doAddUploadedTransactions(val));
  }
  render() {
    return (
      <form encType="multipart/form-data">
        {/*
        Added key property so the input resets (gets rid of uploaded csv file) on account change
        http://stackoverflow.com/questions/26358144/how-to-reset-a-reactjs-element
        "Adding a key to the element forces the element (and all its children) to be re-rendered when that key changes."
        */}
        <input key={this.props.activeAccount._id} type="file" accept=".csv" onChange={this.handleFile} ref="csv"/>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeAccount: state.activeAccount
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ doAddUploadedTransactions: addUploadedTransactions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload);
