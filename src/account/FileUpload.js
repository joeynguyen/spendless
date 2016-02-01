import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import parseCSV from '../utils/csvParser.js';

export default class FileUpload extends Component {
  static propTypes = {
    onUpdate: PropTypes.func.isRequired,
    accountId: PropTypes.string.isRequired
  }
  handleFile = () => {
    // using a ref String attribute is a legacy approach ??
    // https://facebook.github.io/react/docs/more-about-refs.html#the-ref-string-attribute
    // using findDOMNode is discouraged
    // https://facebook.github.io/react/docs/top-level-api.html#reactdom.finddomnode
    const selectedFile = ReactDOM.findDOMNode(this.refs.csv).files[0];
    const newTransactions = parseCSV(selectedFile, this.props.accountId);
    newTransactions.then(val => this.props.onUpdate(val));
  }
  render() {
    return (
      <form encType="multipart/form-data">
        {/*
        Added key property so the input resets (gets rid of uploaded csv file) on account change
        http://stackoverflow.com/questions/26358144/how-to-reset-a-reactjs-element
        "Adding a key to the element forces the element (and all its children) to be re-rendered when that key changes."
        */}
        <input key={this.props.accountId} type="file" accept=".csv" onChange={this.handleFile} ref="csv"/>
      </form>
    );
  }
}
