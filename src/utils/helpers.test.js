import { currencyUSDRegex } from './helpers.js';

describe('helpers', () =>  {
  describe('currencyUSDRegex', () => {
    it('verifies that the number is in valid USD format', () => {
      expect(currencyUSDRegex.test('0')).toBe(true);
      expect(currencyUSDRegex.test('0.00')).toBe(true);
      expect(currencyUSDRegex.test('0.06')).toBe(true);
      expect(currencyUSDRegex.test('5')).toBe(true);
      expect(currencyUSDRegex.test('80')).toBe(true);
      expect(currencyUSDRegex.test('80.00')).toBe(true);
      expect(currencyUSDRegex.test('5,000')).toBe(true);
      expect(currencyUSDRegex.test('5,000.00')).toBe(true);
      expect(currencyUSDRegex.test('100,000.00')).toBe(true);
    });

    it('fails for zero/single digit decimals', () => {
      expect(currencyUSDRegex.test('10.5')).toBe(false); // single decimal
      expect(currencyUSDRegex.test('10.')).toBe(false); // single decimal
    });

    it('fails for missing and misplaced commas', () => {
      expect(currencyUSDRegex.test('10,0000.00')).toBe(false); // comma in wrong place
      expect(currencyUSDRegex.test('1,000,00.00')).toBe(false); // comma in wrong place
      expect(currencyUSDRegex.test('5100,000.00')).toBe(false); // missing a comma in front
    });
  });
});
