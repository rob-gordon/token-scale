const Token = require('./Token');
var assert = require('assert');

describe('Token', () => {
  describe('default constructor()', () => {
    let T;
    beforeEach(() => {
      T = new Token([0, 1, 2]);
    });
    it('returns an instance of Token', () => {
      assert(T instanceof Token);
    });
    it('sets a default origin', () => {
      assert(T.origin === 0);
    });
    it('sets the mode', () => {
      assert(T.mode === 'array');
    });
  });

  describe('constructor()', () => {
    it('sets an array of values', () => {
      const arr = [0, 1, 2, 3];
      const T = new Token(arr.slice(0));
      var is_same =
        arr.length == T.selector.length &&
        arr.every(function(element, index) {
          return element === T.selector[index];
        });
      assert(is_same);
    });
    it('sets an array of named values', () => {
      const arr = [
        { name: 'good', value: 0 },
        { name: 'better', value: 1 },
        { name: 'best', value: 2 }
      ];
      const T = new Token(arr.slice(0));
      var is_same =
        arr.length == T.selector.length &&
        arr.every(function(element, index) {
          return element === T.selector[index];
        });
      assert(is_same);
    });
    it('sets an individual number as an array', () => {
      const T = new Token(16);
      assert(T.get() === 16);
    });
    it('sets the origin', () => {
      const T = new Token([0, 1, 2], { origin: 10 });
      assert(T.origin === 10);
    });

    it('sets the precision', () => {
      const T = new Token([0.005, 0.111, 0.2222], { precision: 2 });
      assert(T.precision === 2);
    });

    it('requires a function or an array', () => {
      assert.throws(() => {
        const T = new Token();
      }, new Error('Selector is not valid'));
    });
  });

  describe('get()', () => {
    it('uses origin with no input', () => {
      const A = new Token([1, 2, 3]);
      const F = new Token(n => n + 1);
      assert(A.get() === 1);
      assert(F.get() === 1);
    });

    it('uses the origin in return', () => {
      const A = new Token([1, 2, 3], { origin: 1 });
      const F = new Token(n => n + 1, { origin: 1 });
      assert(A.get() === 2);
      assert(F.get() === 2);
    });

    it('returns with the correct precision', () => {
      const A = new Token([1.111, 2.222, 3.333], { precision: 2 });
      const F = new Token(n => n + 1.1111111, { precision: 2 });
      assert(A.get() === 1.11);
      assert(F.get() === 1.11);
    });

    it('returns false if no mode set', () => {
      const A = new Token([0, 1, 2, 3]);
      A.mode = null;
      assert(A.get() === false);
    });

    it('returns value if named array', () => {
      const A = new Token([{ name: 'Hello', value: 100 }]);
      assert(A.get(0) === 100);
    });
  });
});
