const defaultArgs = {
  origin: 0,
  precision: false
};

class TokenScale {
  constructor(selector, args = {}) {
    if (
      !selector ||
      !(selector instanceof Function || Array.isArray(selector))
    ) {
      throw new Error('Selector is not valid');
    }

    let input = { ...defaultArgs, ...args };

    this.selector = selector;
    this.mode = Array.isArray(selector) ? 'array' : 'function';
    this.origin = input.origin;
    this.precision = input.precision;
  }

  withPrecision(x) {
    return parseFloat(this.precision ? x.toFixed(this.precision) : x);
  }

  get(at = 0) {
    if (this.mode === 'array') {
      const result = this.selector[at + this.origin];
      if (typeof result === 'object' && 'value' in result) {
        return this.withPrecision(result.value);
      } else {
        return this.withPrecision(result);
      }
    }
    if (this.mode === 'function') {
      return this.withPrecision(this.selector(at + this.origin));
    }
    return false;
  }
}

module.exports = TokenScale;
