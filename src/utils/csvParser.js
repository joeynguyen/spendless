export default function parseCSV(selectedFile, accountId) {
  return new Promise(function(resolve) {
    const fileReader = new FileReader();
    let newTransactions;
    fileReader.readAsText(selectedFile);
    fileReader.onload = function onLoad() {
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

        // TODO: Handle transaction descriptions that have commas, tokenize quotes or replace commas inside quotes with dashes?
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

        newTransactions = transactionRowsArray
          .map(function(transaction, i) {
            const newTransObj = {};
            headerRowArray.forEach(function(item, j) {
              newTransObj[headerRowArray[j]] = transaction[j];
            });
            return {
              // included 'i' index to prevent duplicate _id error
              // TODO: Change hard-coded values in key:value pair
              '_id': new Date().toISOString() + i,
              'accountId': accountId,
              'amount': Number(newTransObj.Amount).toFixed(2),
              'category': newTransObj.Category,
              'description': newTransObj.Description,
              'date': newTransObj['Trans. Date']
            };
          });
        console.log('newTransactions: ', newTransactions);
      }
      resolve(newTransactions);
    };
  });
}
