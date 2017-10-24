import moment from 'moment';

function convertTransactionArrayToObject(transaction, index, accountId, headerRowArray, dateColumnTitle) {
  const newTransObj = headerRowArray.reduce((obj, columnName, i) => {
    return {
      ...obj,
      [columnName]: transaction[i],
    };
  }, {});
  console.log('transaction', transaction);
  console.log('newTransObj', newTransObj);
  // date has to be in this format for input[type="date"] to read it
  // TODO: check if date value is 'MM-DD-YYYY' format before formatting with momemt
  const dateFormatted = moment(newTransObj[dateColumnTitle], 'MM-DD-YYYY').format('YYYY-MM-DD');
  return {
    // added 'index' to prevent duplicate _id error but still
    // preserve valid date format in case we need to use it later
    _id: (new Date().getTime() + index).toString(), // PouchDB requires _id to be string type
    accountId,
    amount: Number(newTransObj.Amount).toFixed(2), // 2 decimal places for US Currency
    category: newTransObj.Category || '',
    description: newTransObj.Description,
    date: dateFormatted,
    notes: '',
  };
}

// Naive approach for testing if a row in the CSV is a header row
// Most CSV files from financial institutions that include headers
// have header columns with the titles: "Date", "Description", and either "Amount" or "Credit" and "Debit" for transactions
function isHeaderRow(rowStr) {
  return (
    rowStr.includes('Date')
    && rowStr.includes('Description')
    && (rowStr.includes('Amount') || rowStr.includes('Credit') && rowStr.includes('Debit'))
  );
}

export default function parseCSV(selectedFile, accountId) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    let newTransactions = [];
    fileReader.readAsText(selectedFile);
    fileReader.onload = function onLoad() {
      const rowDelimiter = (this.result.indexOf('\n') === -1 ? '\r' : '\r\n');
      const rows = this.result.trim().split(rowDelimiter);
      console.log('rows', rows);

      let headerRowIndex;
      const headerRow = rows.find((row, i) => {
        console.log('row', row);
        if (isHeaderRow(row)) {
          headerRowIndex = i;
          return true;
        }
        return false;
      });
      console.log('headerRowIndex', headerRowIndex);

      if (headerRow === undefined) {
        // TODO: Prompt user to add a header row to the CSV file
        reject('Unable to find a header row in the CSV file');
      } else {
        const rowsAfterHeaderRow = rows.slice(headerRowIndex + 1);
        console.log('rowsAfterHeaderRow', rowsAfterHeaderRow);
        const headerRowArray = headerRow
          .replace(/"/g, '')
          .trim()
          .split(',');
        console.log('headerRowArray', headerRowArray);

        // TODO: Handle transaction descriptions that have commas, tokenize quotes or replace commas inside quotes with dashes?
        // See file VISA_561_010115_113015.CSV
        // TODO: Handle other possible bad data inside rows? Empty rows?
        const transactionRowsArray = rowsAfterHeaderRow
          .map(row => row
            .replace(/"/g, '')
            .trim()
            .split(',')
          );
        console.log('transactionRowsArray', transactionRowsArray);

        // find the name of the column that has the word "Date"
        // if there's more than one, use the first one (e.g. Discover CSV has "Trans. Date" and "Post Date")
        const dateColumnTitle = headerRowArray.find(column => column.includes('Date'));

        newTransactions = transactionRowsArray.map((transaction, i) =>
          convertTransactionArrayToObject(transaction, i, accountId, headerRowArray, dateColumnTitle));
        console.log('newTransactions', newTransactions);
      }
      resolve(newTransactions);
    };
  });
}
