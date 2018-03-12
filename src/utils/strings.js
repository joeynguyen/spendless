function removeCommas(str) {
  return str.replace(',', '');
}

// ignores parentheses, currency symbols, etc.
function getOnlyNumberPortion(str) {
  // get either an int or a float with 1 or 2 decimal places
  const match = /(\d*\.\d{1,2}){1}|\d+/g.exec(str);
  if (match !== null) {
    return match[0];
  }
  return str;
}

// Get absolute number so that the result we get back can
// be multiplied by a negative, ensuring a negative value.
// This negative value will be used for Debit transactions
export function convertNumStrToAbsoluteNum(str) {
  let newNum = removeCommas(str);
  newNum = getOnlyNumberPortion(newNum);
  return Number(newNum);
}

export function convertNumStrToValidNum(str) {
  let newNum = convertNumStrToAbsoluteNum(str);

  if (
    str.startsWith('-') ||
    (str.startsWith('(') && str.endsWith(')'))
  ) {
    // Convert to negative number strings with preceding
    // minus symbol or surrounding parentheses, e.g. '-18', '(50.33)'
    newNum *= -1;
  }

  return newNum;
}

export function trimMultipleSpaces(str) {
  return str.replace(/\s{2,}/g, ' ').trim();
  // "ONLINE PAYMENT,     THANK YOU               " --> "ONLINE PAYMENT, THANK YOU"
}
