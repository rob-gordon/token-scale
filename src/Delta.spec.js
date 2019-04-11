var assert = require('assert');
const Delta = require('./Delta');
const Token = require('./Token');

console.log(Token);

describe('Delta', () => {
  describe('default constructor()', () => {
    let T;
    beforeEach(() => {
      T = new Delta(new Token(16), { name: 'fontSize' });
    });
    it('returns an instance of Delta', () => {
      assert(T instanceof Delta);
    });
    it('sets an ID', () => {
      assert('id' in T);
    });
    it('sets tokens', () => {
      assert('tokens' in T);
      assert(T.tokens[0].get() === 16);
    });
  });
});
