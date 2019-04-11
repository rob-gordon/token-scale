var assert = require('assert');
const TokenChain = require('./TokenChain');
const TokenScale = require('./TokenScale');

console.log(TokenScale);

describe('TokenChain', () => {
  describe('default constructor()', () => {
    let T;
    beforeEach(() => {
      T = new TokenChain(new TokenScale(16), { name: 'fontSize' });
    });
    it('returns an instance of TokenChain', () => {
      assert(T instanceof TokenChain);
    });
    it('sets an ID', () => {
      assert('id' in T);
    });
    it('sets tokenScales', () => {
      assert('tokenScales' in T);
      assert(T.tokenScales[0].get() === 16);
    });
  });
});
