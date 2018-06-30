import { getCreditIcon } from './icons';

describe('getCreditIcon', () => {
  const creditCards = [
    { issuer: 'American Express', iconSuffix: 'cc-amex' },
    { issuer: 'Other', iconSuffix: 'credit-card-alt' },
    { issuer: 'Diners Club', iconSuffix: 'cc-diners-club' },
    { issuer: 'Discover', iconSuffix: 'cc-discover' },
    { issuer: 'JCB', iconSuffix: 'cc-jcb' },
    { issuer: 'MasterCard', iconSuffix: 'cc-mastercard' },
    { issuer: 'Visa', iconSuffix: 'cc-visa' },
  ];
  it('renders the correct icon for each credit card', () => {
    creditCards.forEach(card => {
      expect(getCreditIcon(card.issuer)).toBe(card.iconSuffix);
    });
  });
});
