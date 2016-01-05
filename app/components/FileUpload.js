import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import parseCSV from '../utils/csvParser.js';

export default class FileUpload extends Component {
  static propTypes = {
    onUpdate: PropTypes.func.isRequired
  }
  handleFile = () => {
    // using a ref String attribute is a legacy approach ??
    // https://facebook.github.io/react/docs/more-about-refs.html#the-ref-string-attribute
    // using findDOMNode is discouraged
    // https://facebook.github.io/react/docs/top-level-api.html#reactdom.finddomnode
    const selectedFile = ReactDOM.findDOMNode(this.refs.csv).files[0];
    const newTransactions = parseCSV(selectedFile);
    newTransactions.then(val => this.props.onUpdate(val));
  }
  render() {
    return (
      <form encType="multipart/form-data">
        <input type="file" accept=".csv" onChange={this.handleFile} ref="csv"/>
      </form>
    );
  }
}
