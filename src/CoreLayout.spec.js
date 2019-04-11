var assert = require('assert');
const CoreLayout = require('./CoreLayout');
const Delta = require('./Delta');
const Token = require('./Token');

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
    it('sets deltas', () => {
      assert('deltas' in C);
      assert(Array.isArray(C.deltas));
    });
  });

  describe('set() & get()', () => {
    let C;
    beforeEach(() => {
      const fontSize = new Token(createPowerFunction(16, 1.25));
      const fontSizeChain = new Delta([fontSize], { name: 'fontSize' });
      fontSizeChain.tokens[2] = new Token(createPowerFunction(18, 1.25));
      C = new CoreLayout({
        breakpoints: [500, 1000, 1500]
      });
      C.set(fontSizeChain);
    });

    it('adds Delta to this.deltas', () => {
      assert(C.deltas.length === 1);
    });

    it('returns a Delta by name', () => {
      assert(C.get('fontSize').tokens[0].get() === 16);
    });

    it('has a helpful debug function', () => {
      assert('debug' in C);
    });
  });
});
