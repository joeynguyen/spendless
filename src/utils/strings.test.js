import { convertToUSD, removeCommas } from './strings.js';

describe('strings', () =>  {
  describe('removeCommas', () => {
    it('removes all commas in a string', () => {
      expect(removeCommas('Hello')).toBe('Hello');
      expect(removeCommas('Hello, world!')).toBe('Hello world!');
      expect(removeCommas(',Hello, world,!')).toBe('Hello world!');
      expect(removeCommas('5,000.01')).toBe('5000.01');
      expect(removeCommas('500,000.01')).toBe('500000.01');
      expect(removeCommas('5,500,000.01')).toBe('5500000.01');
    });
  });

  describe('convertToUSD', () => {
    it('converts number "string" type to USD currency "number" type', () => {
      expect(convertToUSD('10')).toBe(10.00);
      expect(convertToUSD('10.01')).toBe(10.01);
      expect(convertToUSD('1,000.01')).toBe(1000.01);
      expect(convertToUSD('100,000.01')).toBe(100000.01);
      expect(convertToUSD('1,100,000.01')).toBe(1100000.01);
    });
  });
});
