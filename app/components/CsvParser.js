import React, { Component } from 'react';
import parse from 'csv-parse';
import fileReaderStream from 'filereader-stream';

export default class CsvParser extends Component {
  handleFile(e) {
    const selectedFile = e.target.files[0];
    const rs = fileReaderStream(selectedFile);
    const parser = parse({columns: true, trim: true}, function(err, data) {
      const transactionsArray = Object.keys(data).map(function(item) { return data[item]; });
      const filteredArray = transactionsArray.map(function(transaction) {
        return {
          'amount': transaction.Amount,
          'category': transaction.Category,
          'description': transaction.Description,
          'transactionDate': transaction['Trans. Date']
        };
      });
      console.log(transactionsArray);
      console.log(filteredArray);
    });
    rs.pipe(parser);
  }
  render() {
    return (
        <input type="file" onChange={this.handleFile} />
    );
  }
}
