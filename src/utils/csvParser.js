import moment from 'moment';

import { convertNumStrToAbsoluteNum, trimMultipleSpaces } from './strings';

// convert each row of text from CSV into JS arrays for formatting use
function convertTransactionTextToArray(text) {
  // Some CSV files have hidden carriage returns in their fields so we have to remove them.
  // example: '"Cleared","01/13/2017","TARGET        00024943   HOUSTON      TX↵","23.09","","JAY EN"'
  // see VISA_561_010115_113015.CSV

  // Some fields have commas in them that break our .split(',')
  // example: 'Cleared,11/22/15,"ONLINE PAYMENT, THANK YOU               ",,14.66'
  // Solution: match all instances of commas not inside quotes and tokenize and split on them

  // https://stackoverflow.com/questions/6462578/alternative-to-regex-match-all-instances-not-inside-quotes
  const re3 = /"[^"]*"|(,)/g;
  const textFormatted = text
    .replace(/[\r\n]/, '')
    .replace(re3, (m, group1) => {
      if (!group1) {
        return m;
      }
      return '__DELIMITER__';
    });

  const textAsArray = textFormatted
    .replace(/"/g, '') // remove double quotes
    .trim()
    .split('__DELIMITER__');

  return textAsArray;
}

// convert each transaction array to objects for easier data manipulation
function convertTransactionArrayToObject(transaction, index, accountId, headerRowArray, dateColumnTitle) {
  const newTransObj = headerRowArray.reduce((obj, columnName, i) => {
    return {
      ...obj,
      [columnName]: transaction[i],
    };
  }, {});

  // Merge values from Credit/Debit columns into single Amount field. Make debit values negative
  if (newTransObj.Credit) {
    newTransObj.Credit = convertNumStrToAbsoluteNum(newTransObj.Credit);
    newTransObj.Amount = newTransObj.Credit;
  } else if (newTransObj.Debit) {
    newTransObj.Debit = convertNumStrToAbsoluteNum(newTransObj.Debit);
    newTransObj.Amount = newTransObj.Debit * -1;
  }

  // Some transactions have no value for amount. See "MEMBERSHIP FEE" in file VISA_561_010115_113015.CSV
  if (typeof newTransObj.Amount === 'undefined' || !newTransObj.Amount) {
    newTransObj.Amount = 0;
  }

  // for Descriptions that look like this in CSV - "NEPAL RESTAURANT         ESTES PARK   CO"
  if (newTransObj.Description && newTransObj.Description.match(/\s{2,}/)) {
    newTransObj.Description = trimMultipleSpaces(newTransObj.Description);
  }


  // date has to be in this format for input[type="date"] to read it
  // TODO: check if date value is in 'MM-DD-YYYY' format before formatting with momemt
  const dateFormatted = moment(newTransObj[dateColumnTitle], 'MM-DD-YYYY').format('YYYY-MM-DD');

  return {
    // added 'index' to prevent duplicate _id error but still
    // preserve valid date format in case we need to use it later
    _id: (new Date().getTime() + index).toString(), // PouchDB requires _id to be string type
    accountId,
    amount: newTransObj.Amount,
    category: newTransObj.Category || '',
    description: newTransObj.Description || '',
    date: dateFormatted,
    notes: newTransObj.Notes || '',
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

function findRowDelimiter(str) {
  let rowDelimiter;
  if (str.includes('\r\n')) {
    rowDelimiter = '\r\n';
  } else if (str.includes('\n')) {
    rowDelimiter = '\n';
  } else {
    rowDelimiter = '\r';
  }
  return rowDelimiter;
}

export default function parseCSV(selectedFile, accountId) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    let newTransactions = [];
    fileReader.readAsText(selectedFile);
    fileReader.onload = function onLoad() {
      const rowDelimiter = findRowDelimiter(this.result);

      const rows = this.result.trim().split(rowDelimiter);

      let headerRowIndex;
      const headerRow = rows.find((row, i) => {
        if (isHeaderRow(row)) {
          headerRowIndex = i;
          return true;
        }
        return false;
      });

      if (headerRow === undefined) {
        // TODO: Prompt user to add a header row to the CSV file
        reject('Unable to find a header row in the CSV file');
      } else {
        const rowsAfterHeaderRow = rows.slice(headerRowIndex + 1);

        // convert each row of text from CSV into JS arrays for formatting use
        const transactionRowsArray = rowsAfterHeaderRow.map(convertTransactionTextToArray);

        const headerRowArray = headerRow
          .replace(/"/g, '')
          .trim()
          .split(',');

        // find the name of the column that has the word "Date"
        // if there's more than one, use the first one (e.g. Discover CSV has "Trans. Date" and "Post Date")
        const dateColumnTitle = headerRowArray.find(column => column.includes('Date'));

        newTransactions = transactionRowsArray.map((transaction, i) =>
          convertTransactionArrayToObject(transaction, i, accountId, headerRowArray, dateColumnTitle));
      }

      resolve(newTransactions);
    };
  });
}
