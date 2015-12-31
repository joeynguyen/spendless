import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import parseCSV from '../utils/csvParser.js';

export default class FileUpload extends Component {
  static propTypes = {
    onUpdate: PropTypes.func.isRequired
  }
  handleFile = () => {
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
