import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class FileUpload extends Component {
  handleFile = () => {
    const that = this;
    const fileReader = new FileReader();
    const selectedFile = ReactDOM.findDOMNode(this.refs.csv).files[0];
    fileReader.readAsText(selectedFile);
    fileReader.onload = function parseCSV() {
      // Naive approach for testing if the first row of the CSV contains a header
      // Most CSV files from financial institutions that include headers
      // have columns with the words 'Date' and 'Description' for transactions
      const testForHeader = /Date.*Description|Date.*Description/;
      const rowDelimiter = (this.result.indexOf('\n') === -1 ? '\r' : '\r\n');
      const rows = this.result
        .trim()
        .split(rowDelimiter);

      const headerRow = rows.find(row => testForHeader.test(row));

      if (headerRow === undefined) {
        // TODO: Prompt user to add a header row to the CSV file
        console.log('Unable to find a header row in the CSV file');
      } else {
        const headerRowArray = headerRow
          .replace(/"/g, '')
          .trim()
          .split(',');
        console.log('headerRowArray: ', headerRowArray);

        // TODO: Handle transaction descriptions that have commas
        // See file VISA_561_010115_113015.CSV
        // TODO: Handle other possible bad data inside rows? Empty rows?
        const transactionRowsArray = rows
          .filter(row => !testForHeader.test(row))
          .map(row => row
            .replace(/"/g, '')
            .trim()
            .split(',')
          );
        console.log('transactionRowsArray: ', transactionRowsArray);

        const transactionsArray = transactionRowsArray
          .map(function(transaction) {
            const newTransObj = {};
            headerRowArray.forEach(function(item, i) {
              newTransObj[headerRowArray[i]] = transaction[i];
            });
            return newTransObj;
          })
          .map(function(transaction, i) {
            return {
              // included 'i' iterator to prevent duplicate _id error
              '_id': new Date().toISOString() + i,
              'amount': transaction.Amount,
              'category': transaction.Category,
              'description': transaction.Description,
              'transactionDate': transaction['Trans. Date']
            };
          });
        console.log('transactionsArray: ', transactionsArray);
        that.props.onUpdate(transactionsArray);
      }
    };
  }
  render() {
    return (
      <form encType="multipart/form-data">
        <input type="file" accept=".csv" onChange={this.handleFile} ref="csv"/>
      </form>
    );
  }
}
