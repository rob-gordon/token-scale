const TokenScale = require('./TokenScale');
var assert = require('assert');

describe('TokenScale', () => {
  describe('constructor()', () => {
    let T;
    beforeEach(() => {
      T = new TokenScale([0, 1, 2]);
    });
    it('should return an instance of TokenScale', () => {
      assert(T instanceof TokenScale);
    });
    it('should set a default origin', () => {
      assert(T.origin === 0);
    });
    it('should set the mode', () => {
      assert(T.mode === 'array');
    });
  });

  describe('constructor() args', () => {
    it('should be able to set an array of values', () => {});
    it('should be able to set the origin', () => {
      const T = new TokenScale([0, 1, 2], { origin: 10 });
      assert(T.origin === 10);
    });

    it('should be able to set the precision', () => {
      const T = new TokenScale([0.005, 0.111, 0.2222], { precision: 2 });
      assert(T.precision === 2);
    });

    it('should require a function or an array', () => {
      assert.throws(() => {
        const T = new TokenScale();
      }, new Error('Selector is not valid'));
    });
  });

  describe('get()', () => {
    it('should use origin with no input', () => {
      const A = new TokenScale([1, 2, 3]);
      const F = new TokenScale(n => n + 1);
      assert(A.get() === 1);
      assert(F.get() === 1);
    });

    it('should use the origin in return', () => {
      const A = new TokenScale([1, 2, 3], { origin: 1 });
      const F = new TokenScale(n => n + 1, { origin: 1 });
      assert(A.get() === 2);
      assert(F.get() === 2);
    });

    it('should return with the correct precision', () => {
      const A = new TokenScale([1.111, 2.222, 3.333], { precision: 2 });
      const F = new TokenScale(n => n + 1.1111111, { precision: 2 });
      assert(A.get() === 1.11);
      assert(F.get() === 1.11);
    });

    it('should return false if no mode set', () => {
      const A = new TokenScale([0, 1, 2, 3]);
      A.mode = null;
      assert(A.get() === false);
    });
  });
});
