var assert = require('assert');
const CoreLayout = require('./CoreLayout');
const TokenChain = require('./TokenChain');
const TokenScale = require('./TokenScale');

function createPowerFunction(base = 1, growth = 1.2, decimalPlaces = 2) {
  return size =>
    parseFloat((base * Math.pow(growth, size)).toFixed(decimalPlaces));
}

describe('CoreLayout', () => {
  describe('default constructor()', () => {
    let C;
    beforeEach(() => {
      C = new CoreLayout();
    });
    it('returns an instance of CoreLayout', () => {
      assert(C instanceof CoreLayout);
    });
    it('sets breakpoints', () => {
      assert('breakpoints' in C);
      assert(C.breakpoints[0] === 1000);
    });
    it('sets tokenChains', () => {
      assert('tokenChains' in C);
      assert(Array.isArray(C.tokenChains));
    });
  });

  describe('set() & get()', () => {
    let C;
    beforeEach(() => {
      const fontSize = new TokenScale(createPowerFunction(16, 1.25));
      const fontSizeChain = new TokenChain([fontSize], { name: 'fontSize' });
      fontSizeChain.tokenScales[2] = new TokenScale(
        createPowerFunction(18, 1.25)
      );
      C = new CoreLayout({
        breakpoints: [500, 1000, 1500]
      });
      C.set(fontSizeChain);
    });

    it('adds TokenChain to this.tokenChains', () => {
      assert(C.tokenChains.length === 1);
    });

    it('returns a TokenChain by name', () => {
      assert(C.get('fontSize').tokenScales[0].get() === 16);
    });

    it('has a helpful debug function', () => {
      assert('debug' in C);
    });
  });
});
