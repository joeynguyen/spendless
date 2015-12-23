import React, { Component } from 'react';
import CsvParser from './CsvParser.js';

export default class csvParse extends Component {
  // prevent form from submitting; we are going to capture the file contents
  handleSubmit(e) {
    e.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} encType="multipart/form-data">
        <CsvParser />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
