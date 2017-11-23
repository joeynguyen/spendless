export function removeCommas(str) {
  return str.replace(',', '');
}

// Get absolute number so that the result we get back can
// be multiplied by a negative, ensuring a negative value.
// This negative value will be used for Debit transactions
export function convertNumStrToAbsoluteNum(str) {
  return Math.abs(Number(removeCommas(str)));
}

export function trimMultipleSpaces(str) {
  return str.replace(/\s{2,}/g, ' ').trim();
  // "ONLINE PAYMENT,     THANK YOU               " --> "ONLINE PAYMENT, THANK YOU"
}
