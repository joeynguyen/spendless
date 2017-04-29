import React from 'react';

export const getCreditIcon = (cc) => {
  let iconSuffix;
  switch (cc) {
    case 'American Express':
      iconSuffix = 'cc-amex';
      break;
    case 'Other':
      iconSuffix = 'credit-card-alt';
      break;
    default:
      iconSuffix = `cc-${cc.toLowerCase().replace(/ /, '-')}`;
  }
  return iconSuffix;
};
