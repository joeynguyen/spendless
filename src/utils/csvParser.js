import moment from 'moment';

function trimMultipleSpaces(str) {
  return str.replace(/\s{2,}/g, ' ').trim();
  // "ONLINE PAYMENT,     THANK YOU               " --> "ONLINE PAYMENT, THANK YOU"
}

function removeCommas(str) {
  return str.replace(',', '');
}

// get absolute number so that multiplying the result by a negative always ensures a negative value
function convertNumStrToAbsoluteNum(str) {
  return Math.abs(Number(removeCommas(str)));
}

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
  if (typeof newTransObj.Amount === 'undefined') {
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
    amount: Number(newTransObj.Amount).toFixed(2), // 2 decimal places for US Currency
    category: newTransObj.Category || '',
    description: newTransObj.Description || '',
    date: dateFormatted,
    notes: newTransObj.Notes || '',
  };
}

// convert each row of text from CSV into JS arrays for formatting use
function convertTransactionTextToArray(text) {
  // Some CSV files wrap each item in a row in quotes, others don't. See VISA_561_010115_113015.CSV
  // example: '"Cleared","01/13/2017","TARGET        00024943   HOUSTON      TX↵","23.09","","JAY EN"'
  const re = /","/g;
  // Some Descriptions have commas in them that break our .split(',')
  // example: 'Cleared,11/22/15,"ONLINE PAYMENT, THANK YOU               ",,14.66'
  const re2 = /".+,.+"/;
  // Some CSV files have hidden carriage returns in their transactions data so we have to remove them.
  // example: '"Cleared","01/13/2017","TARGET        00024943   HOUSTON      TX↵","23.09","","JAY EN"'
  // see VISA_561_010115_113015.CSV
  const textFormatted = text.replace(/[\r\n]/, '');

  let textAsArray;

  if (textFormatted.match(re)) {
    textAsArray = textFormatted
      // differientiate commas that are used for item separation to handle transaction fields that have commas
      // See file Costco Visa Statement Feb 2017
      .replace(re, '"__DELIMITER__"')
      .replace(/"/g, '') // remove double quotes
      .trim()
      .split('__DELIMITER__');
  } else if (textFormatted.match(re2)) {
    const match = textFormatted.match(re2)[0]; // ex: "ONLINE PAYMENT, THANK YOU"
    const matchTokenized = match.replace(/,/g, '__COMMA__'); // "ONLINE PAYMENT__COMMA__ THANK YOU"
    const textTokenized = textFormatted.replace(match, matchTokenized);
    textAsArray = textTokenized
      .replace(/"/g, '') // remove double quotes - ONLINE PAYMENT__COMMA__ THANK YOU
      .trim()
      .replace(/,/g, '__DELIMITER__') // change remaining commas to something else
      .replace(/__COMMA__/g, ',') // untokenize commas
      .split('__DELIMITER__');
  } else {
    textAsArray = textFormatted
      .replace(/"/g, '') // remove double quotes
      .trim()
      .split(',');
  }

  return textAsArray;
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
        const headerRowArray = headerRow
          .replace(/"/g, '')
          .trim()
          .split(',');

        // convert each row of text from CSV into JS arrays for formatting use
        const transactionRowsArray = rowsAfterHeaderRow.map(convertTransactionTextToArray);

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
